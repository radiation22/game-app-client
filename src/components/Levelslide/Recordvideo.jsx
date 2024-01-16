import React, { useEffect, useRef, useState } from "react";
import { CloudinaryContext, Video } from "cloudinary-react";
import Camera from "../CaptureCamera/Camera";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const VideoRecordingApp = () => {
  const { slNo } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState({});
  const [previewStream, setPreviewStream] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [log, setLog] = useState("");
  const [remainingTime, setRemainingTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  const recordingTimeMS = 20000; // 20 seconds
  const timerInterval = 1000; // 1 second
  const [selectedFilter, setSelectedFilter] = useState(null);
  const levels = [
    {
      id: 1,
      earn: 10,
      status: "Pending",
    },
    {
      id: 2,
      earn: 20,
      status: "Pending",
    },
    {
      id: 3,
      earn: 30,
      status: "Pending",
    },
    {
      id: 4,
      earn: 40,
      status: "Pending",
    },
    {
      id: 5,
      earn: 50,
      status: "Pending",
    },
  ];

  const applyFilterToRecordedVideo = () => {
    const recordedVideo = document.getElementById("recording");

    // Apply the selected filter directly to the video element
    if (selectedFilter === "grayscale") {
      recordedVideo.style.filter = "grayscale(100%)";
    } else if (selectedFilter === "sepia") {
      recordedVideo.style.filter = "sepia(100%)";
    } else {
      // Reset the filter if no filter is selected
      recordedVideo.style.filter = "none";
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  useEffect(() => {
    const selectEvent = levels.find((level) => level.id === parseInt(slNo));
    setEvent(selectEvent);
  }, []);

  const startRecording = (stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    const recordedChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.start();
    setLog(
      mediaRecorder.state + " for " + recordingTimeMS / 1000 + " seconds..."
    );

    const stopped = new Promise((resolve, reject) => {
      mediaRecorder.onstop = resolve;
      mediaRecorder.onerror = (event) => reject(event.name);
    });

    const recorded = new Promise((resolve) =>
      setTimeout(resolve, recordingTimeMS)
    ).then(() => mediaRecorder.state === "recording" && mediaRecorder.stop());

    return Promise.all([stopped, recorded]).then(() => {
      const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
      setRecordedBlob(recordedBlob);
      document.getElementById("preview").style.display = "none";
      document.getElementById("record").style.display = "block";
      setIsRecording(false);
    });
  };

  const handleStartRecording = async () => {
    document.getElementById("test").style.display = "none";
    document.getElementById("demo").style.display = "none";
    document.getElementById("preview").style.display = "block";
    document.getElementById("record").style.display = "none";

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setPreviewStream(stream);
      const previewVideo = document.getElementById("preview");
      previewVideo.srcObject = stream;
      previewVideo.captureStream =
        previewVideo.captureStream || previewVideo.mozCaptureStream;

      new Promise((resolve) => (previewVideo.onplaying = resolve)).then(() => {
        setIsRecording(true);
        startRecording(previewVideo.captureStream());
      });

      // Start countdown timer
      let timeLeft = 1;
      setRemainingTime(timeLeft);
      const timer = setInterval(() => {
        timeLeft += 1;
        setRemainingTime(timeLeft);
        if (timeLeft >= 20) {
          clearInterval(timer);
        }
      }, timerInterval);
    } catch (error) {
      setLog("Error accessing the camera: " + error);
    }
  };

  const cloudinaryConfig = {
    cloud_name: "dcsrtbgln",
    api_key: "838588141269155",
    api_secret: "b3-0h4o-Oc7i7cScFR6RbxqsJqo",
    upload_preset: "y0f8tbjh",
  };

  const handleUpload = async () => {
    if (recordedBlob) {
      // Apply the selected filter to the recorded video
      applyFilterToRecordedVideo();

      const formData = new FormData();
      formData.append("file", recordedBlob);
      formData.append("upload_preset", "y0f8tbjh");

      try {
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/video/upload`,
          {
            method: "POST",
            body: formData,
          }
        ).then((response) => response.json());

        const cloudinaryUrl = cloudinaryResponse.secure_url;
        // const filterTransformation = selectedFilter
        //   ? `e_${selectedFilter}`
        //   : "";
        const videoInfo = {
          like: 0,
          level: 0,
          comment: 0,
          share: 0,
          views: 0,
          url: cloudinaryUrl,
          email: user?.email,
          earn: parseInt(slNo),
          photo: user?.photoURL,
          followers: [],
        };

        // Send the cloudinaryUrl and filter to your backend
        try {
          const backendResponse = await fetch(
            "https://game-app-server-three.vercel.app/addVideo",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Add any additional headers as needed
              },
              body: JSON.stringify(videoInfo),
            }
          );
          navigate("/");
        } catch (error) {
          console.error("Error sending video info to backend:", error);
        }
      } catch (error) {
        console.error("Error uploading video to Cloudinary:", error);
      }
    }
  };

  return (
    <CloudinaryContext cloudName={cloudinaryConfig.cloud_name}>
      <div className="">
        <div id="demo">
          <h2 className="text-white text-center">
            Show this video what you make for your video
          </h2>

          <ReactPlayer
            url="https://www.w3schools.com/html/mov_bbb.mp4"
            controls
            width="100%"
            height="120"
          />
        </div>
        <div className="preview">
          <div id="test" className="">
            <Camera handleStartRecording={handleStartRecording}></Camera>
          </div>
          {/* this is preview video */}
          <video
            id="preview"
            className="w-full h-screen object-cover hidden"
            height="100%"
            autoPlay
            muted
            style={{ filter: "saturate(150%) brightness(120%)" }}
          ></video>
          <div></div>
          {isRecording ? (
            <div className="absolute left-14 top-[500px] ">
              <p className="text-white">Recording...</p>
              <p className="text-white">{remainingTime}s</p>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div id="record" className="recorded hidden">
          <video
            className="w-full h-full object-cover"
            id="recording"
            height=""
            controls
            style={{ filter: "saturate(150%) brightness(120%)" }}
            src={
              recordedBlob &&
              URL.createObjectURL(recordedBlob, { type: "video/webm" })
            }
          ></video>

          {recordedBlob && (
            <>
              {/* <div className="mt-4">
               
                <button
                  onClick={() => handleFilterChange("grayscale")}
                  className="mr-2"
                >
                  Grayscale
                </button>
                <button
                  onClick={() => handleFilterChange("sepia")}
                  className="mr-2"
                >
                  Sepia
                </button>

                <button
                  onClick={applyFilterToRecordedVideo}
                  className="ml-4 bg-rose-600 px-5 py-2 rounded-lg text-white"
                >
                  Apply Filter
                </button>
              </div> */}
              <button
                onClick={handleUpload}
                className="bg-rose-600 px-5 mb-20 py-2 rounded-lg mt-4 text-white"
              >
                Upload
              </button>

              <button
                onClick={handleStartRecording}
                className="bg-yellow-600 px-5 py-2 mb-20 rounded-lg mt-4 text-white ms-2"
              >
                Re-Record
              </button>
            </>
          )}
        </div>
      </div>
    </CloudinaryContext>
  );
};

export default VideoRecordingApp;
