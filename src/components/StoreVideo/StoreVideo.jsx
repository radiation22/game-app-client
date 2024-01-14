import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import avt from "../../assets/avt1.png";
import styles from "./store.module.css";

// import required modules
import { Pagination } from "swiper/modules";
import ReactPlayer from "react-player";
import { FaComment, FaEye, FaHeart, FaShare } from "react-icons/fa";

export default function StoreVideo() {
  const [heartCount, setHeartCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [eyeCount, setEyeCount] = useState(0);

  //   Fy1hDtkCgGyLWvqV

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
  return (
    <>
      <Swiper direction={"vertical"} className="h-[600px]">
        <SwiperSlide className={styles.swiperSlide}>
          <div className="relative w-full">
            <ReactPlayer
              // className="h-screen"
              url="https://www.youtube.com/shorts/ASdTURy0d4Q?feature=share"
              playing={true} // Auto-play the video
              // controls={false} // Hide video controls
              width="100%"
              muted={true} // Mute the video
            />
          </div>
          <div>
            <div className="absolute z-40 right-[10px] top-[150px]">
              <FaHeart
                className="text-4xl text-rose-600 cursor-pointer"
                onClick={() => handleIconClick("heart")}
              ></FaHeart>
              <p className="text-white text-center">{heartCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[250px]">
              <FaComment
                className="text-4xl text-fuchsia-600 cursor-pointer"
                onClick={() => handleIconClick("comment")}
              ></FaComment>
              <p className="text-white text-center">{commentCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[350px]">
              <FaShare
                className="text-4xl text-cyan-400 cursor-pointer"
                onClick={() => handleIconClick("share")}
              ></FaShare>
              <p className="text-white text-center">{shareCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[450px]">
              <FaEye
                className="text-4xl text-amber-400 cursor-pointer"
                onClick={() => handleIconClick("eye")}
              ></FaEye>
              <p className="text-white text-center">{eyeCount}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div className="relative w-full">
            <ReactPlayer
              // className="h-screen"
              url="https://www.youtube.com/shorts/ASdTURy0d4Q?feature=share"
              playing={true} // Auto-play the video
              // controls={false} // Hide video controls
              width="100%"
              muted={true} // Mute the video
            />
          </div>
          <div>
            <div className="absolute z-40 right-[10px] top-[150px]">
              <FaHeart
                className="text-4xl text-rose-600 cursor-pointer"
                onClick={() => handleIconClick("heart")}
              ></FaHeart>
              <p className="text-white text-center">{heartCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[250px]">
              <FaComment
                className="text-4xl text-fuchsia-600 cursor-pointer"
                onClick={() => handleIconClick("comment")}
              ></FaComment>
              <p className="text-white text-center">{commentCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[350px]">
              <FaShare
                className="text-4xl text-cyan-400 cursor-pointer"
                onClick={() => handleIconClick("share")}
              ></FaShare>
              <p className="text-white text-center">{shareCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[450px]">
              <FaEye
                className="text-4xl text-amber-400 cursor-pointer"
                onClick={() => handleIconClick("eye")}
              ></FaEye>
              <p className="text-white text-center">{eyeCount}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div className="relative w-full">
            <ReactPlayer
              // className="h-screen"
              url="https://www.youtube.com/shorts/ASdTURy0d4Q?feature=share"
              playing={true} // Auto-play the video
              // controls={false} // Hide video controls
              width="100%"
              muted={true} // Mute the video
            />
          </div>
          <div>
            <div className="absolute z-40 right-[10px] top-[150px]">
              <FaHeart
                className="text-4xl text-rose-600 cursor-pointer"
                onClick={() => handleIconClick("heart")}
              ></FaHeart>
              <p className="text-white text-center">{heartCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[250px]">
              <FaComment
                className="text-4xl text-fuchsia-600 cursor-pointer"
                onClick={() => handleIconClick("comment")}
              ></FaComment>
              <p className="text-white text-center">{commentCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[350px]">
              <FaShare
                className="text-4xl text-cyan-400 cursor-pointer"
                onClick={() => handleIconClick("share")}
              ></FaShare>
              <p className="text-white text-center">{shareCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[450px]">
              <FaEye
                className="text-4xl text-amber-400 cursor-pointer"
                onClick={() => handleIconClick("eye")}
              ></FaEye>
              <p className="text-white text-center">{eyeCount}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div className="relative w-full">
            <ReactPlayer
              // className="h-screen"
              url="https://www.youtube.com/shorts/ASdTURy0d4Q?feature=share"
              playing={true} // Auto-play the video
              // controls={false} // Hide video controls
              width="100%"
              muted={true} // Mute the video
            />
          </div>
          <div>
            <div className="absolute z-40 right-[10px] top-[150px]">
              <FaHeart
                className="text-4xl text-rose-600 cursor-pointer"
                onClick={() => handleIconClick("heart")}
              ></FaHeart>
              <p className="text-white text-center">{heartCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[250px]">
              <FaComment
                className="text-4xl text-fuchsia-600 cursor-pointer"
                onClick={() => handleIconClick("comment")}
              ></FaComment>
              <p className="text-white text-center">{commentCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[350px]">
              <FaShare
                className="text-4xl text-cyan-400 cursor-pointer"
                onClick={() => handleIconClick("share")}
              ></FaShare>
              <p className="text-white text-center">{shareCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[450px]">
              <FaEye
                className="text-4xl text-amber-400 cursor-pointer"
                onClick={() => handleIconClick("eye")}
              ></FaEye>
              <p className="text-white text-center">{eyeCount}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div className="relative w-full">
            <ReactPlayer
              // className="h-screen"
              url="https://www.youtube.com/shorts/ASdTURy0d4Q?feature=share"
              playing={true} // Auto-play the video
              // controls={false} // Hide video controls
              width="100%"
              muted={true} // Mute the video
            />
          </div>
          <div>
            <div className="absolute z-40 right-[10px] top-[150px]">
              <FaHeart
                className="text-4xl text-rose-600 cursor-pointer"
                onClick={() => handleIconClick("heart")}
              ></FaHeart>
              <p className="text-white text-center">{heartCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[250px]">
              <FaComment
                className="text-4xl text-fuchsia-600 cursor-pointer"
                onClick={() => handleIconClick("comment")}
              ></FaComment>
              <p className="text-white text-center">{commentCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[350px]">
              <FaShare
                className="text-4xl text-cyan-400 cursor-pointer"
                onClick={() => handleIconClick("share")}
              ></FaShare>
              <p className="text-white text-center">{shareCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[450px]">
              <FaEye
                className="text-4xl text-amber-400 cursor-pointer"
                onClick={() => handleIconClick("eye")}
              ></FaEye>
              <p className="text-white text-center">{eyeCount}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div className="relative w-full">
            <ReactPlayer
              // className="h-screen"
              url="https://www.youtube.com/shorts/ASdTURy0d4Q?feature=share"
              playing={true} // Auto-play the video
              // controls={false} // Hide video controls
              width="100%"
              muted={true} // Mute the video
            />
          </div>
          <div>
            <div className="absolute z-40 right-[10px] top-[150px]">
              <FaHeart
                className="text-4xl text-rose-600 cursor-pointer"
                onClick={() => handleIconClick("heart")}
              ></FaHeart>
              <p className="text-white text-center">{heartCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[250px]">
              <FaComment
                className="text-4xl text-fuchsia-600 cursor-pointer"
                onClick={() => handleIconClick("comment")}
              ></FaComment>
              <p className="text-white text-center">{commentCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[350px]">
              <FaShare
                className="text-4xl text-cyan-400 cursor-pointer"
                onClick={() => handleIconClick("share")}
              ></FaShare>
              <p className="text-white text-center">{shareCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[450px]">
              <FaEye
                className="text-4xl text-amber-400 cursor-pointer"
                onClick={() => handleIconClick("eye")}
              ></FaEye>
              <p className="text-white text-center">{eyeCount}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div className="relative w-full">
            <ReactPlayer
              // className="h-screen"
              url="https://www.youtube.com/shorts/ASdTURy0d4Q?feature=share"
              playing={true} // Auto-play the video
              // controls={false} // Hide video controls
              width="100%"
              muted={true} // Mute the video
            />
          </div>
          <div>
            <div className="absolute z-40 right-[10px] top-[150px]">
              <FaHeart
                className="text-4xl text-rose-600 cursor-pointer"
                onClick={() => handleIconClick("heart")}
              ></FaHeart>
              <p className="text-white text-center">{heartCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[250px]">
              <FaComment
                className="text-4xl text-fuchsia-600 cursor-pointer"
                onClick={() => handleIconClick("comment")}
              ></FaComment>
              <p className="text-white text-center">{commentCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[350px]">
              <FaShare
                className="text-4xl text-cyan-400 cursor-pointer"
                onClick={() => handleIconClick("share")}
              ></FaShare>
              <p className="text-white text-center">{shareCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[450px]">
              <FaEye
                className="text-4xl text-amber-400 cursor-pointer"
                onClick={() => handleIconClick("eye")}
              ></FaEye>
              <p className="text-white text-center">{eyeCount}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div className="relative w-full">
            <ReactPlayer
              // className="h-screen"
              url="https://www.youtube.com/shorts/ASdTURy0d4Q?feature=share"
              playing={true} // Auto-play the video
              // controls={false} // Hide video controls
              width="100%"
              muted={true} // Mute the video
            />
          </div>
          <div>
            <div className="absolute z-40 right-[10px] top-[150px]">
              <FaHeart
                className="text-4xl text-rose-600 cursor-pointer"
                onClick={() => handleIconClick("heart")}
              ></FaHeart>
              <p className="text-white text-center">{heartCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[250px]">
              <FaComment
                className="text-4xl text-fuchsia-600 cursor-pointer"
                onClick={() => handleIconClick("comment")}
              ></FaComment>
              <p className="text-white text-center">{commentCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[350px]">
              <FaShare
                className="text-4xl text-cyan-400 cursor-pointer"
                onClick={() => handleIconClick("share")}
              ></FaShare>
              <p className="text-white text-center">{shareCount}</p>
            </div>
            <div className="absolute z-40 right-[10px] top-[450px]">
              <FaEye
                className="text-4xl text-amber-400 cursor-pointer"
                onClick={() => handleIconClick("eye")}
              ></FaEye>
              <p className="text-white text-center">{eyeCount}</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
