import React, { useContext } from "react";
import user from "../../assets/user2.png";
import lang from "../../assets/lang.png";
import mode from "../../assets/night.png";
import notification from "../../assets/noti2.png";
import help from "../../assets/help.png";
import sign from "../../assets/signout.png";
import { FaAngleRight } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import icon from "../../assets/left2.png";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import DriverFooter from "../Footer/DriverFooter";
import DriverFooterb from "../Footer/DriverFooterb";
import Navbarb from "../Navbar/Navbarb";
const DriverSettingb = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const handleSignOut = () => {
    logOut()
      .then((result) => {
        toast.success("You have logged out");
        navigate("/login2b");
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Navbarb></Navbarb>
      <div>
        <Link to="/dashboardb">
          <img className="h-10 pl-6 mt-10" src={icon} alt="" />
        </Link>
        <p className="mx-6 mt-6 text-[#4d5155]">একাউন্ট</p>
        <Link to="/driverProfileb">
          <div className="bg-white mx-6 rounded-lg py-3 px-5 mt-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-5">
                <img className="h-6" src={user} alt="" />
                <p>আমার প্রোফাইল</p>
              </div>
              <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
            </div>
          </div>
        </Link>
        <p className="mx-6 mt-6 mb-3 text-[#4d5155]">সেটিং</p>
        <div className="bg-white mx-6 rounded-lg py-3 px-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <img className="h-6" src={mode} alt="" />
              <p>নাইট মোড</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div>
        <Link to="/driverNotificationb">
          <div className="bg-white mx-6 rounded-lg py-3 px-5 mt-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-5">
                <img className="h-6" src={notification} alt="" />
                <p>নোটিফিকেশন</p>
              </div>
              <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
            </div>
          </div>
        </Link>
        <div className="bg-white mx-6 rounded-lg py-3 px-5 mt-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <img className="h-6" src={lang} alt="" />
              <p>ল্যাংগুয়েজ</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div>
        <div className="bg-white mx-6 rounded-lg py-3 px-5 mt-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <img className="h-6" src={help} alt="" />
              <p>হেল্প</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div>
        <div
          onClick={handleSignOut}
          className="bg-white mx-6 rounded-lg py-3 px-5 mt-1"
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <img className="h-6" src={sign} alt="" />
              <p>সাইন আউট</p>
            </div>
            <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
          </div>
        </div>
      </div>
      <DriverFooterb></DriverFooterb>
    </>
  );
};

export default DriverSettingb;
