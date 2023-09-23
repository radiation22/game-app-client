import React, { useContext, useState } from "react";
import { FaBell, FaChartLine, FaSearch, FaUser } from "react-icons/fa";
import { FaGear, FaHandHoldingDollar, FaGift } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ManagerNav = () => {
  const [showSignOut, setShowSignOut] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  //   const [showTicketPage, setShowTicketPage] = useState(false);
  //   const [showDropdown, setShowDropdown] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const handleSignOut = () => {
    logOut()
      .then((result) => {
        toast.success("you have logged out");
        navigate("/home");
      })
      .catch((error) => console.log(error));
  };
  const handleTrip = () => {
    navigate("/trip");
  };
  const toggleSignOut = () => {
    setShowSignOut(!showSignOut);
  };
  const handleNotificationClick = () => {
    setNotificationCount(0);
  };
  return (
    <>
      <header className="bg-[#BF1B21] w-full text-white p-4">
        <div className="container mx-auto flex items-center">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 text-gray-900 placeholder-gray-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <FaSearch className="text-2xl text-gray-400" />
            </div>
          </div>
          <div className="ml-4 flex items-center">
            <button className="mr-4" onClick={handleNotificationClick}>
              <div className="relative">
                <FaBell className="text-2xl" /> {/* Notification icon */}
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1">
                    {notificationCount}
                  </span>
                )}
              </div>
            </button>
            <div className="flex flex-col items-center">
              <FaUser
                className="text-2xl cursor-pointer"
                onClick={toggleSignOut}
              />
              {/* User icon */}
              <span className="ml-2 text-lg">{user?.displayName}</span>
              {/* Display user's name */}
            </div>
            {/* User icon */}
            {showSignOut && (
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>

      <footer className="bg-[#BF1B21] w-full text-white   p-4">
        <div className="container mx-auto flex justify-between">
          <div onClick={handleTrip} className="flex flex-col items-center">
            <FaChartLine
              className="text-2xl cursor-pointer
                text-white"
            />
            <span className="uppercase py-1">Trips</span>
          </div>
          <div className="flex flex-col items-center">
            <FaGift className="text-2xl"></FaGift>
            <span className="uppercase py-1">Your Gift</span>
          </div>
          <div className="flex flex-col items-center">
            <FaHandHoldingDollar className="text-2xl"></FaHandHoldingDollar>
            <span className="uppercase py-1">Donate</span>
          </div>
          <div className="flex flex-col items-center">
            <FaGear className="text-2xl"></FaGear>
            <span className="uppercase py-1">More</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ManagerNav;
