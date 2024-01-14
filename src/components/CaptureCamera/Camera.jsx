import React, { useEffect, useRef } from "react";
import Footer from "../Footer/Footer";
import ShopingSlide from "../ShopingSlide/ShopingSlide";
import LevelSlide from "../Levelslide/LevelSlide";
import VideoSlider from "../AppHome/VideoSlider";
import Modal from "../Levelslide/Modal";
import { useState } from "react";

const Camera = ({ handleStartRecording }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [isLV1ModalOpen, setLV1ModalOpen] = useState(false);
  const [isFrontCamera, setFrontCamera] = useState(true);

  useEffect(() => {
    const openCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        if (videoDevices.length > 0) {
          const selectedDevice = isFrontCamera
            ? videoDevices[0]
            : videoDevices[videoDevices.length - 1];

          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: selectedDevice.deviceId } },
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } else {
          console.error("No video devices found.");
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    openCamera();
  }, [isFrontCamera]);

  return (
    <div className="">
      <div className="w-full ">
        <video
          className="w-full h-full"
          autoPlay
          playsInline
          style={{
            filter: "saturate(150%) brightness(120%)",
          }}
          ref={videoRef}
        ></video>
      </div>
      <button
        className="bg-red-600 h-12 border w-12 rounded-full absolute top-[75%] mx-auto left-[45%]"
        onClick={handleStartRecording}
      ></button>
    </div>
  );
};

export default Camera;
