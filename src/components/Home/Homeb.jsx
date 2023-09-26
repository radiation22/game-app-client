import React, { useState, useEffect } from "react";
import bus1 from "../../assets/homebus.png";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaTv } from "react-icons/fa";
import back from "../../assets/Asset 8.png";
import bus from "../../assets/bus1.png";
import userIcon from "../../assets/user.png";

const Homeb = () => {
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

  const handleAvailableBusesClick = () => {
    if (locationEnabled) {
      navigate("/accountb"); // Navigate to the "/account" route when location is enabled
    } else {
      alert("Turn On Location");
    }
  };

  useEffect(() => {
    checkLocationStatus();
  }, []);

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
          <h1 className="text-xl  text-[#4E4E4E] mt-5">লোকেশন চালু করুন</h1>
          <p className="text-center text-sm mt-2 text-[#AFAFAF]">
            অনুগ্রহ করে আপনার লোকেশন চালু করুন আপনার <br /> বাস তালিকা পেতে কোন{" "}
            <br /> অপ্রয়োজনীয় প্রচেষ্টা ছাড়া
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
        </div>
      </div>
      <Link className="bottom-20 left-5 absolute" to="/admin">
        <FaTv className="text-3xl text-white hover:bg-black"></FaTv>
      </Link>
      <div className="bg-[#04A83F] h-[50px] w-full mt- fixed bottom-0"></div>
    </>
  );
};

export default Homeb;
