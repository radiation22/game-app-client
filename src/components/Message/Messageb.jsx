import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import nirapode from "../../assets/nirapode.png";
import Footerb from "../Footer/Footerb";
import Navbarb from "../Navbar/Navbarb";
const Messageb = () => {
  // const { user } = useContext(AuthContext);
  // const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState("");

  // const handleMessage = (e) => {
  //   if (newMessage.trim() === "") return;

  //   // Update the client's message state
  //   const userMessage = { text: newMessage, sender: user?.email };
  //   fetch("https://nirapode-server.vercel.app/addMessage", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(userMessage),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.acknowledged) {
  //         console.log("success");
  //         setNewMessage("");
  //       }
  //     });
  // };

  // useEffect(() => {
  //   // Fetch messages from the database when the component mounts
  //   const fetchMessagesFromDatabase = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://nirapode-server.vercel.app/message"
  //       );
  //       if (response.ok) {
  //         const data = await response.json();

  //         // Filter messages for user.email and admin senders
  //         const filteredMessages = data.filter(
  //           (message) => message.sender === "Admin"
  //           // message.sender === "Admin"
  //         );
  //         console.log(filteredMessages);

  //         setMessages(filteredMessages);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching messages from the database:", error);
  //     }
  //   };

  //   fetchMessagesFromDatabase(); // Call the function to fetch messages

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user, messages]);
  return (
    <>
      <Navbarb></Navbarb>
      <div className="py-14">
        <div className="bg-white mx-6 rounded-2xl py-3 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-[100px]">
                <img className="h-14 w-14 rounded-full" src={nirapode} alt="" />
              </div>
              <div>
                <p className="font-bold">টিম নিরাপদে</p>
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
            যোগাযোগ করুন
          </button>
        </div>
      </Link>
      <Footerb></Footerb>
    </>
  );
};

export default Messageb;
