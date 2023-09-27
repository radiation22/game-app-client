import React from "react";
import Navbar from "../Navbar/Navbar";
import lang from "../../assets/lang.png";
import mode from "../../assets/night.png";
import notification from "../../assets/noti2.png";
import help from "../../assets/help.png";
import sign from "../../assets/signout.png";
import {
  FaAngleRight,
  FaGift,
  FaGifts,
  FaPeopleArrows,
  FaPhoneSquareAlt,
  FaWallet,
} from "react-icons/fa";
import icon from "../../assets/left2.png";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import DriverFooter from "../Footer/DriverFooter";
import DriverNav from "../Navbar/DriverNav";
import DriverFooterb from "../Footer/DriverFooterb";
import DriverNavb from "../Navbar/DriverNavb";
const DriverMoreb = () => {
  return (
    <>
      <DriverNavb></DriverNavb>
      <div>
        <Link to="/dashboardb">
          <img className="h-10 pl-6 mt-10" src={icon} alt="" />
        </Link>
        <div className="bg-white mx-6 rounded-lg py-3 mt-5 px-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <FaWallet className="text-[24px] text-green-600"></FaWallet>
              <p>ই-ওয়ালেট</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div>
        <div className="bg-white mx-6 rounded-lg py-3 px-5 mt-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <FaPhoneSquareAlt className="text-[24px] text-green-600"></FaPhoneSquareAlt>
              <p>ফ্রী-কল</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div>
        <div className="bg-white mx-6 rounded-lg py-3 px-5 mt-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <FaGift className="text-[24px] text-green-600"></FaGift>
              <p>পার্টনারকে টিকিট গিফট করুন</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div>
        <div className="bg-white mx-6 rounded-lg py-3 px-5 mt-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <FaGifts className="text-[24px] text-green-600"></FaGifts>
              <p>অন্যকে রিওয়ার্ড গিফট করুন</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div>
        <div className="bg-white mx-6 rounded-lg py-3 px-5 mt-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <FaPeopleArrows className="text-[24px] text-green-600"></FaPeopleArrows>
              <p>নতুন বন্ধু/কমিউনিটি বানান</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div>
      </div>
      <DriverFooterb></DriverFooterb>
    </>
  );
};

export default DriverMoreb;
