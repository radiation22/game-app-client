import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Language = () => {
  return (
    <div className=" bg-[#04A83F] h-screen flex items-center justify-center">
      <div>
        <img className="w-[100px] mx-auto h-[100px]" src={logo} alt="" />
        <h1 className="text-2xl text-center text-white pt-10">
          Select Your Language
        </h1>
        <div className="py-5">
          <Link to="/sliderb">
            {" "}
            <button className="bg-[#9DDE2A] px-10 text-lg rounded-full py-2 text-white mr-4">
              বাংলা
            </button>
          </Link>
          <Link to="/slider">
            <button className="bg-[#9DDE2A] px-10 rounded-full py-2 text-lg text-white">
              English
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Language;
