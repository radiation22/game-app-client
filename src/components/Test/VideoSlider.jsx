import React, { useRef, useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import ReactPlayer from "react-player";
import "./video.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import CommentModal from "./CommentModal";
import LevelSlide from "../Levelslide/LevelSlide";
import ShopingSlide from "../ShopingSlide/ShopingSlide";
import heart from "../../assets/love.png";
import cmt from "../../assets/comments.png";
import share from "../../assets/share.png";
import eye from "../../assets/views.png";
import write from "../../assets/write.png";
import write1 from "../../assets/cricle.png";
import write2 from "../../assets/write2.png";
import arrow from "../../assets/btnarrow.png";
import ShareModal from "./ShareModal";
const VideoSlider = ({ videos, refetch }) => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [commentVideoId, setCommentVideoId] = useState(null);
  const [like, setLike] = useState(false);
  const [earn, setEarn] = useState(0);
  const [url, setUrl] = useState("");
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  // const [id, setId] = useState(null);
  const [likedVideos, setLikedVideos] = useState([]);
  const sliderRef = useRef(null);

  const handleCommentIconClick = (videoId) => {
    if (!user) {
      return navigate("/login");
    }

    setShowCommentModal(true);
    setCommentVideoId(videoId);
  };

  const handleShareClick = (url) => {
    setShowShareModal(true);
    setUrl(url);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
    setShowShareModal(false);
    setCommentVideoId(null);
  };

  useEffect(() => {
    const initialCounts = {};
    videos.forEach((video) => {
      initialCounts[video._id] = {
        like: video?.like,
        comment: video.comment,
        share: video.share,
        views: video.views,
      };
    });
    setCounts(initialCounts);
  }, [videos]);

  useEffect(() => {
    if (currentPlayingVideo) {
      fetch("https://game-server-xi.vercel.app/incrementView", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId: currentPlayingVideo,
          email: user?.email,
        }),
      }).then((res) => res.json());
    }
  }, [currentPlayingVideo]);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      const clickedId = localStorage.getItem("clickedId");

      try {
        const response = await fetch(
          `https://game-server-xi.vercel.app/api/fetchLikedVideos/${user?.email}`
        );
        if (response.ok) {
          const data = await response.json();

          const giveLike = data.find((d) => {
            return d.userEmail === user?.email && clickedId === d?.id;
          });
          if (giveLike) {
            setLike(true);
          } else {
            setLike(false);
          }
        } else {
          console.error("Failed to fetch liked videos:", response.status);
        }
      } catch (error) {
        console.error("Error fetching liked videos:", error);
      }
    };
    fetchLikedVideos();
  }, [user?.email]);

  const handleIconClick = async (clickedId, icon, isLiked) => {
    console.log("increase");

    if (!user) {
      navigate("/login");
      return;
    }
    localStorage.setItem("clickedId", clickedId);
    setLike(true);

    try {
      fetch("https://game-server-xi.vercel.app/saveLikedVideos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: clickedId,
          userEmail,
          status: "liked",
        }),
      });

      const url = `https://game-server-xi.vercel.app/addLike/${clickedId}`;
      const backendResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          like: counts[clickedId].like + 1,
          email: user?.email,
        }),
      });

      if (backendResponse.ok) {
        const updatedCounts = { ...counts };
        updatedCounts[clickedId] = {
          ...updatedCounts[clickedId],
          [icon]: counts[clickedId].like + 1,
        };
        setCounts(updatedCounts);

        setLikedVideos((prevLikedVideos) => {
          const updatedLikedVideos = Array.isArray(prevLikedVideos)
            ? isLiked
              ? prevLikedVideos.filter((likedId) => likedId !== clickedId)
              : [...prevLikedVideos, clickedId]
            : [clickedId];

          return updatedLikedVideos;
        });
      } else {
        console.error("Backend returned an error:", backendResponse.status);
      }
    } catch (error) {
      console.error("Error updating counts on the backend:", error);
    }
  };

  const handleDecrease = async (clickedId, icon, isLiked) => {
    console.log("decrease");
    if (!user) {
      navigate("/login");
      return;
    }

    setLike(false);

    try {
      const url = `https://game-server-kohl.vercel.app/addLike/${clickedId}`;
      const backendResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          like: counts[clickedId].like - 1,

          email: user?.email,
        }),
      });

      if (backendResponse.ok) {
        const updatedCounts = { ...counts };
        updatedCounts[clickedId] = {
          ...updatedCounts[clickedId],
          [icon]: counts[clickedId].like - 1,
        };
        setCounts(updatedCounts);

        setLikedVideos((prevLikedVideos) => {
          const updatedLikedVideos = Array.isArray(prevLikedVideos)
            ? isLiked
              ? prevLikedVideos.filter((likedId) => likedId !== clickedId)
              : [...prevLikedVideos, clickedId]
            : [clickedId];

          return updatedLikedVideos;
        });
      } else {
        console.error("Backend returned an error:", backendResponse.status);
      }
    } catch (error) {
      console.error("Error updating counts on the backend:", error);
    }
  };

  const renderHeartIcon = (videoId) => {
    const isLiked = likedVideos.includes(videoId);

    return (
      <div className="absolute right-[20px] top-[40%]">
        {like === true && isLiked ? (
          <>
            <img
              className="h-5"
              onClick={() => handleDecrease(videoId, "like", isLiked)}
              src={heart}
              alt=""
            />
            {/* <FaHeart
              className="text-3xl cursor-pointer text-red-700"
              onClick={() => handleDecrease(videoId, "like", isLiked)}
            ></FaHeart> */}
            <p className="text-white text-center">{counts[videoId]?.like}</p>
          </>
        ) : (
          <>
            <img
              className="h-6"
              onClick={() => handleIconClick(videoId, "like", isLiked)}
              src={heart}
              alt=""
            />

            <p className="text-white text-center">{counts[videoId]?.like}</p>
          </>
        )}
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    afterChange: (index) => {
      setCurrentSlideIndex(index);
      // Set currentPlayingVideo to null when moving to the next slide
      setCurrentPlayingVideo(null);
    },
  };
  const videoWrapperStyle = {
    filter: "saturate(150%) brightness(120%)", // Adjust these values for the desired effect
  };

  return (
    <div className="w-full object-cover">
      <Slider {...settings} ref={sliderRef}>
        {videos
          .slice()
          .reverse()
          .map((video, index) => (
            <div key={index} className="video-slide h-screen w-full relative">
              <ReactPlayer
                style={{
                  ...videoWrapperStyle,
                  filter: "saturate(150%) brightness(120%)",
                }}
                url={video?.url}
                controls={false}
                width="100vh"
                height=""
                playing
                muted
                onProgress={(progress) => {
                  // Check if the current slide is the one being viewed
                  if (index === currentSlideIndex && progress.played >= 0.1) {
                    // Update the view count or perform any other action
                    setCurrentPlayingVideo(video._id);
                  }
                }}
                loop={true}
              />

              <div>
                <div className="absolute z-40 right-[20px] top-[30%]">
                  <Link to={`/singleProfile/${video?.email}`}>
                    <div className="w-7 h-7 rounded-full flex items-center  bg-[#DD1E64]">
                      <img
                        className="h-6 w-6 mx-auto rounded-full "
                        src={video?.photo}
                        alt=""
                      />
                    </div>
                  </Link>
                </div>
                {renderHeartIcon(video._id)}
                <div className="absolute flex  flex-col z-40 right-4  top-5">
                  <img
                    className="h-10 z-30 mx-auto mb-[-7px] w-10"
                    src={write1}
                    alt=""
                  />
                  <img className="h-9 w-[130px]" src={write} alt="" />
                  <img
                    className="h-7 mx-auto w-[110px] mt-[-10px]"
                    src={write2}
                    alt=""
                  />
                </div>
                <div className="absolute z-40 right-5 top-7">
                  {video?.like >= 0 && video?.views >= 0 && video.level == 1 ? (
                    <>
                      <p className="">{video?.earn}</p>
                      <p className="text-white p-1 text-[12px]">
                        You Earning {video?.earn} tk
                      </p>
                    </>
                  ) : video.like >= 1 &&
                    video.views >= 1 &&
                    video.level == 2 ? (
                    <>
                      <p className="">{video?.earn}</p>
                      <p className="text-white p-1 text-[12px]">
                        You Earning {video?.earn} tk
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="">0</p>
                      <p className="text-white p-1 text-[12px]">
                        Earning Pending
                      </p>
                    </>
                  )}

                  <p
                    style={{ fontSize: "12px" }}
                    className="  font-bold text-amber-400"
                  >
                    Play More
                  </p>
                </div>
                <div className="absolute z-40 right-[20px] top-[50%]">
                  <img
                    className="h-5"
                    onClick={() => handleCommentIconClick(video._id)}
                    src={cmt}
                    alt=""
                  />

                  <p className="text-white text-center">
                    {counts[video._id]?.comment}
                  </p>
                </div>
                <div className="absolute z-40 right-[20px] top-[60%]">
                  <img
                    onClick={() => handleShareClick(video.url)}
                    className="h-5"
                    src={share}
                    alt=""
                  />
                  <p className="text-white text-center">
                    {counts[video._id]?.share}
                  </p>
                </div>
                <div className="absolute z-40 right-[20px] top-[70%]">
                  <img className="h-4" src={eye} alt="" />
                  <p className="text-white text-center">
                    {counts[video._id]?.views}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </Slider>

      <div className="absolute top-10 left-3 right-0">
        <LevelSlide></LevelSlide>
      </div>

      <div className="absolute bottom-20 left-3 right-0">
        <ShopingSlide></ShopingSlide>
      </div>
      {/* <div className="absolute bottom-[165px] left-[49%]">
        <img className="mx-auto h-5" src={arrow} alt="" />
      </div> */}

      {showCommentModal && (
        <CommentModal
          refetch={refetch}
          onClose={handleCloseCommentModal}
          videoId={commentVideoId}
          commentCount={counts[commentVideoId]?.comment}
        />
      )}
      {showShareModal && (
        <ShareModal onClose={handleCloseCommentModal} url={url}></ShareModal>
      )}
    </div>
  );
};

export default VideoSlider;
