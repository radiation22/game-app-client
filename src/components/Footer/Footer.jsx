import React from "react";
import { FaCogs, FaEnvelopeOpenText, FaHome, FaTasks } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import home from "../../assets/home.png";
import earn from "../../assets/earn.png";
import play from "../../assets/play.png";
import me from "../../assets/user.png";
import buy from "../../assets/buy.png";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import ShopingSlide from "../ShopingSlide/ShopingSlide";

const Footer = () => {
  const { user } = useContext(AuthContext);
  // const [newMessageCount, setNewMessageCount] = useState(2);
  const [messages, setMessages] = useState(0);
  useEffect(() => {
    // Fetch messages from the database when the component mounts
    const fetchMessagesFromDatabase = async () => {
      try {
        const response = await fetch(
          "https://nirapode-server.vercel.app/message"
        );
        if (response.ok) {
          const data = await response.json();

          // Filter messages for user.email and admin senders
          const filteredMessages = data.filter(
            (message) =>
              message.targetEmail === "all" && message.status === "unseen"
          );

          setMessages(filteredMessages?.length);
        }
      } catch (error) {
        console.error("Error fetching messages from the database:", error);
      }
    };

    fetchMessagesFromDatabase(); // Call the function to fetch messages
  }, [user, messages]);

  return (
    <footer className="bg-[#2B2549] fixed px-2 w-full bottom-0 text-white py-1">
      {/* <ShopingSlide></ShopingSlide> */}
      <div className="container mx-auto flex justify-around pt-2">
        <div className="flex  items-center">
          <NavLink to="/appHome">
            {({ isActive }) => (
              <>
                {isActive ? (
                  <>
                    <div className="flex flex-col items-center">
                      <img className="w-6" src={home} alt="" />
                      <span className="uppercase pt-1 font-bold text-sm text-[#04A83F]">
                        Home
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <img className="w-6" src={home} alt="" />
                      <span className="uppercase pt-1 text-sm font-bold text-[#A0B1C6]">
                        Home
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
          </NavLink>
        </div>
        <div className="flex items-center">
          <NavLink to="/earn">
            {({ isActive }) => (
              <>
                {isActive ? (
                  <>
                    <div className="flex flex-col items-center">
                      <img className="w-5" src={earn} alt="" />
                      <span className="uppercase pt-1 text-sm font-bold text-[#A0B1C6]">
                        Earn
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <img className="w-5" src={earn} alt="" />
                      <span className="uppercase pt-1 text-sm font-bold text-[#A0B1C6]">
                        Earn
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
          </NavLink>
        </div>

        <Link to="/">
          <div className="flex flex-col items-center ">
            <img className="w-[55px]" src={play} alt="" />
          </div>
        </Link>

        <div className="flex items-center">
          {" "}
          <NavLink to="/buy">
            {({ isActive }) => (
              <>
                {isActive ? (
                  <>
                    <div className="flex  flex-col items-center">
                      <img className="w-6" src={buy} alt="" />
                      <span className="uppercase pt-1 text-sm font-bold text-[#A0B1C6]">
                        Buy
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <img className="w-6" src={buy} alt="" />
                      <span className="uppercase pt-1 text-sm font-bold text-[#A0B1C6]">
                        Buy
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
          </NavLink>
        </div>

        <div className="flex items-center">
          <NavLink to="/myProfile">
            {({ isActive }) => (
              <>
                {isActive ? (
                  <>
                    <div className="flex flex-col items-center">
                      <img className="w-6" src={me} alt="" />
                      <span className="uppercase pt-1 text-sm font-bold text-[#A0B1C6]">
                        Me
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <img className="w-6" src={me} alt="" />
                      <span className="uppercase pt-1 text-sm font-bold text-[#A0B1C6]">
                        Me
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
