import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import Setting from "../Setting/Setting";
import { Link, useParams } from "react-router-dom";
import icon from "../../assets/left2.png";
const SingleUser = () => {
  const { user } = useContext(AuthContext);
  const [photo, setPhoto] = useState("");
  const [follow, setFollow] = useState(false);
  const [balance, setBalance] = useState(0);
  const [followData, setFollowData] = useState([]);
  const { email } = useParams();

  // Define the query key
  const queryKey = ["video", email];

  // Use the useQuery hook to fetch data
  const { data: videos = [], refetch } = useQuery(
    queryKey,
    async () => {
      const url = `https://game-app-server-three.vercel.app/myVideos?email=${email}`;
      const res = await fetch(url);
      const data = await res.json();
      const totalBalance = data.reduce((sum, video) => sum + video.earn, 0);
      setBalance(totalBalance);
      const user = data.find((u) => u.email === email);
      setPhoto(user);
      return data;
    },
    {
      enabled: !!user?.email, // Only fetch data when user.email is available
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://game-app-server-three.vercel.app/myFollow?email=${email}`
        );
        const data = await response.json();
        setFollowData(data);
        refetch();
      } catch (error) {
        console.error("Error fetching follow data:", error);
      }
    };

    fetchData();
  }, [email, follow]);

  const handleFollow = async () => {
    const id = photo?._id;
    setFollow(true);

    const info = {
      email: user?.email,
      id: id,
    };

    try {
      // Make a POST request
      const postResponse = await fetch(
        "https://game-app-server-three.vercel.app/addFollow",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );

      // Check the response and decide whether to proceed with the PUT request
      if (postResponse.ok) {
        // Make a PUT request
        const putResponse = await fetch(
          "https://game-app-server-three.vercel.app/addFollow",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
          }
        );

        // Update the UI or handle the response from the PUT request
        refetch();

        const putData = await putResponse.json();
        console.log("PUT request response:", putData);
      } else {
        console.error(
          "Error in the POST request:",
          postResponse.status,
          postResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error sending follow data to the server:", error);
    }
  };

  const handleUnfollow = async () => {
    setFollow(false);
    const id = photo?._id;

    const info = {
      email: user?.email,
      id: id,
    };

    try {
      const backendResponse = await fetch(
        "https://game-app-server-three.vercel.app/addUnFollow",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers as needed
          },
          body: JSON.stringify(info), // Corrected the syntax here
        }
      );
      refetch();
      // Handle the backend response if necessary
      const backendData = await backendResponse.json();
      // Do something with the backendData if needed
    } catch (error) {
      console.error("Error sending video URL to backend:", error);
    }
  };

  useEffect(() => {
    const checkFollow = photo.followers;
    const userEmail = user?.email; // Replace with your actual email

    if (checkFollow && checkFollow.includes(userEmail)) {
      setFollow(true);
    } else {
      // Email doesn't exist in the followers array, set something else
      setFollow(false);
    }
  }, [photo?.followers]);

  return (
    <div>
      <Link to="/appHome">
        <img className="h-10 pl-6 mt-10" src={icon} alt="" />
      </Link>
      <div className="bg-lime-950 m-4 rounded py-5">
        <div>
          <img
            className="h-20 rounded-full mx-auto"
            src={photo?.photo}
            alt=""
          />
          <p className="text-white text-center">{email}</p>
        </div>
        <div className="text-white border rounded-md my-2 py-4 flex justify-around text-center">
          <div>
            <p>{followData?.length}</p>
            <p>Following</p>
          </div>
          <div>
            <p>{photo?.followers?.length}</p>
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
          {follow ? (
            <button
              onClick={handleUnfollow}
              className="bg-rose-700 text-white px-5 py-2 rounded-md"
            >
              Following
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className="bg-rose-700 text-white px-5 py-2 rounded-md"
            >
              Follow
            </button>
          )}
        </div>
      </div>

      <div className="bg-white mt-4 mx-3 p-3">
        <div className="grid grid-cols-3 gap-4 mt-4">
          {videos.map((video, idx) => (
            <ReactPlayer
              key={idx}
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

export default SingleUser;
