import React, { useEffect, useRef } from "react";
import Footer from "../Footer/Footer";
import ShopingSlide from "../ShopingSlide/ShopingSlide";
import LevelSlide from "../Levelslide/LevelSlide";
import VideoSlider from "../AppHome/VideoSlider";
import Modal from "../Levelslide/Modal";
import { useState } from "react";

const AfterLogin = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [isLV1ModalOpen, setLV1ModalOpen] = useState(false);
  const [isFrontCamera, setFrontCamera] = useState(true);

  const openLV1Modal = () => {
    setLV1ModalOpen(true);
  };

  const closeLV1Modal = () => {
    setLV1ModalOpen(false);
  };

  const switchCamera = () => {
    setFrontCamera(!isFrontCamera);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Flip the image horizontally if using the front camera
      if (!isFrontCamera) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // You can now use the captured photo stored in the canvas
    }
  };

  useEffect(() => {
    const openCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: isFrontCamera ? "user" : "environment",
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    openCamera();
  }, [isFrontCamera]);

  return (
    <div>
      <div>
        <h1 className="text-2xl py-5 text-cyan-400 text-center">
          Start Your activity From Level 1
        </h1>
      </div>
      <div className="w-full h-screen relative">
        <video className="w-full" autoPlay playsInline ref={videoRef}></video>
        <canvas style={{ display: "none" }} ref={canvasRef}></canvas>
      </div>
      <button
        className="bg-red-600 h-12 border w-12 rounded-full absolute top-[90%] mx-auto left-[45%]"
        onClick={capturePhoto}
      ></button>

      <ShopingSlide></ShopingSlide>
      <Footer></Footer>
    </div>
  );
};

export default AfterLogin;
