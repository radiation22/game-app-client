import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import Setting from "../Setting/Setting";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [follow, setFollow] = useState(0);
  const [followData, setFollowData] = useState([]);
  // Define the query key
  const queryKey = ["video", user?.email];

  // Use the useQuery hook to fetch data
  const { data: videos = [], refetch } = useQuery(
    queryKey,
    async () => {
      const url = `https://game-app-server-three.vercel.app/myVideos?email=${user?.email}`;
      const res = await fetch(url);
      const data = await res.json();

      const followCount = data.find((u) => u.email === user?.email);

      setFollow(followCount);

      const totalBalance = data.reduce((sum, video) => sum + video.earn, 0);

      setBalance(totalBalance);

      return data;
    },
    {
      enabled: !!user?.email,
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://game-app-server-three.vercel.app/myFollow?email=${user?.email}`
        );
        const data = await response.json();
        setFollowData(data);
        refetch();
      } catch (error) {
        console.error("Error fetching follow data:", error);
      }
    };

    fetchData();
  }, [user?.email, follow]);

  return (
    <div>
      <div className="bg-lime-950 m-4 rounded py-5">
        <div>
          <img
            className="h-20 w-20 rounded-full mx-auto"
            src={user?.photoURL}
            alt=""
          />
          <p className="text-white text-center">{user?.email}</p>
        </div>
        <div className="text-white border rounded-md my-2 py-4 flex justify-around text-center">
          <div>
            <p>{followData?.length}</p>
            <p>Following</p>
          </div>
          <div>
            {follow ? <p>{follow?.followers?.length}</p> : <p>0</p>}
            <p>Followers</p>
          </div>
          <div>
            <p>{balance} tk</p>
            <p>Earning</p>
          </div>
          <div>
            <p>Level</p>
            <p>1</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <button className="bg-rose-700 text-white px-5 py-2 rounded-md">
            Follow
          </button>
          <Link to="/buy">
            {" "}
            <button className="bg-rose-700 text-white px-5 py-2 rounded-md">
              Buy
            </button>
          </Link>
          <p className="text-white">Bal: {balance}tk</p>
        </div>
      </div>

      <div>
        <Setting></Setting>
      </div>
      <div className="bg-white mt-4 mx-3 p-3">
        <p className="text-purple-700 font-bold">My Videos</p>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {videos.map((video) => (
            <ReactPlayer
              key={video._id}
              url={video?.url}
              controls
              width="100%"
              height=""
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
