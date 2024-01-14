import React, { useState } from "react";
import { FaComment, FaEye, FaHeart, FaShare } from "react-icons/fa";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import StoreVideo from "../StoreVideo/StoreVideo";
import Videos from "../Test/Videos";

const AppHome = () => {
  const [heartCount, setHeartCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [eyeCount, setEyeCount] = useState(0);

  const handleIconClick = (icon) => {
    switch (icon) {
      case "heart":
        setHeartCount((prevCount) => (prevCount === 0 ? 1 : 0));
        break;
      case "comment":
        setCommentCount((prevCount) => (prevCount === 0 ? 1 : 0));
        break;
      case "share":
        setShareCount((prevCount) => (prevCount === 0 ? 1 : 0));
        break;
      case "eye":
        setEyeCount((prevCount) => (prevCount === 0 ? 1 : 0));
        break;
      default:
        break;
    }
  };

  return <Videos></Videos>;
};

export default AppHome;
