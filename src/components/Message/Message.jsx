import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const Message = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar></Navbar>
      <div className="py-14">
        <div className="bg-white mx-6 rounded-2xl py-3 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-[100px]">
                <img
                  className="h-14 w-14 rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
              </div>
              <div>
                <p className="font-bold">Team Nirapode</p>
                <p className="text-sm text-[#A0B1C6]">
                  Welcome to Nirapode. Thanks for sign In.
                </p>
              </div>
            </div>
            <p className="text-sm text-[#A0B1C6] w-[100px]">1 min</p>
          </div>
        </div>
      </div>
      <Link to="/inbox">
        <div className="mx-6">
          <button className="bg-[#05A83F] w-full py-2 rounded-full text-white text-lg">
            Contact Us
          </button>
        </div>
      </Link>
      <Footer></Footer>
    </>
  );
};

export default Message;
