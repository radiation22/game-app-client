import React, { useState, useEffect } from "react";
import bus1 from "../../assets/homebus.png";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaTv } from "react-icons/fa";
import back from "../../assets/Asset 8.png";
import bus from "../../assets/bus1.png";

const Home = () => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const navigate = useNavigate();

  const checkLocationStatus = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setLocationEnabled(true);
        },
        (error) => {
          setLocationEnabled(false);
        }
      );
    }
  };

  // const handleAvailableBusesClick = () => {
  //   // Check if geolocation is available in the browser
  //   if ("geolocation" in navigator) {
  //     // Try to get the location continuously until it's successful or permission is granted
  //     const watchId = navigator.geolocation.watchPosition(
  //       (position) => {
  //         // Location is obtained, navigate to the "/account" route
  //         navigate("/account");
  //         // Clear the watch to stop continuous tracking
  //         navigator.geolocation.clearWatch(watchId);
  //       },
  //       (error) => {
  //         if (error.code === 1) {
  //           // Location permission is denied, show an alert or prompt the user to enable it
  //           alert("Please enable location services to continue.");
  //           // Clear the watch to stop continuous tracking
  //           navigator.geolocation.clearWatch(watchId);
  //         } else {
  //           // An error occurred, handle it accordingly
  //           console.error("Error getting location:", error);
  //         }
  //       }
  //     );
  //   } else {
  //     // Geolocation is not supported in the browser
  //     alert("Geolocation is not supported in your browser.");
  //   }
  // };

  const handleAvailableBusesClick = () => {
    if (locationEnabled) {
      navigate("/account");
    } else {
      navigate("/account");
    }
  };

  useEffect(() => {
    checkLocationStatus();
  }, [locationEnabled]);

  return (
    <>
      <div className="mt-0 relative z-5">
        <img src={back} className="top-0" alt="" />
      </div>
      <div className="flex w-full  top-5 justify-between absolute">
        <div className=" flex items-center justify-center ml-5 rounded-md">
          <img className="h-[25px] w-[25px]" src={bus} alt="" />
        </div>
        <div className=" flex items-center justify-center mr-5 h-7 w-8 rounded-md">
          <FaRegUserCircle className="text-white text-2xl"></FaRegUserCircle>
        </div>
      </div>
      <div className="flex justify-center relative items-center  text-center">
        <div className=" pt-8">
          <div className="flex justify-center">
            <img className="h-[190px] w-[95%]" src={bus1} alt="" />
          </div>
          <h1 className="text-xl  text-[#4E4E4E] mt-5">Turn on locations</h1>
          <p className="text-center text-sm mt-2 text-[#AFAFAF]">
            Pls turn on your location to get your <br /> available bus list
            without any <br /> unnecessary effort
          </p>
          <button
            className="bg-[#9DDE2A] px-10 py-1 rounded-full mt-4 text-white uppercase "
            onClick={handleAvailableBusesClick}
          >
            Available Buses
          </button>
          <br />
          <p className="text-[#AFAFAF] py-1 rounded-lg underline  uppercase text-[11px]">
            Not Now
          </p>
          <Link to="/admin">
            <FaTv className="text-3xl text-white hover:bg-black"></FaTv>
          </Link>
        </div>
      </div>
      <div className="bg-[#04A83F] h-[50px] w-full mt- fixed bottom-0"></div>
    </>
  );
};

export default Home;
