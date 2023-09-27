import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useState } from "react";
import Footerb from "../Footer/Footerb";
import Navbarb from "../Navbar/Navbarb";

const Inboxb = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, how can I help you?", sender: "Admin" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { text: newMessage, sender: "You" }]);
    setNewMessage("");
  };
  return (
    <>
      <Navbarb></Navbarb>
      <div className="flex flex-col  bg-gray-100">
        <div className="flex-1 overflow-y-scroll p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${
                message.sender === "Admin" ? "text-left" : "text-right"
              }`}
            >
              <span
                className={`px-3 py-1 rounded-lg inline-block ${
                  message.sender === "Admin"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <div className="p-4">
          <input
            type="text"
            className="w-full px-3 py-4 border border-gray-300 rounded-lg"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            className="mt-2 px-4 py-3 mb-20 w-full bg-[#05A83F] text-white rounded-full"
            onClick={handleSendMessage}
          >
            Send Message
          </button>
        </div>
      </div>
      <Footerb></Footerb>
    </>
  );
};

export default Inboxb;
