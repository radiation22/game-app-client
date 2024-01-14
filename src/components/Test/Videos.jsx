import React from "react";
import VideoSlider from "./VideoSlider";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Videos = () => {
  // const [videos, setVideos] = useState([]);

  // Define the query key
  const queryKey = ["videos"];

  // Use the useQuery hook to fetch data
  const { data: videos = [], refetch } = useQuery(queryKey, async () => {
    const url = `https://game-server-xi.vercel.app/videos`;
    const res = await fetch(url);
    const data = await res.json();
    // setVideos(data);
    return data;
  });

  return <VideoSlider refetch={refetch} videos={videos} />;
};

export default Videos;
