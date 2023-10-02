import { useState } from "react";
import io from "socket.io-client";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

function inbox() {
  const { user } = useContext(AuthContext);
  const socket = io.connect("http://localhost:5000/");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const handleMessage = (e) => {
    if (newMessage.trim() === "") return;

    // Send the message to the server
    socket.emit("message", { text: newMessage, sender: user?.email });

    // Update the client's message state
    const userMessage = { text: newMessage, sender: user?.email };
    setMessages([...messages, userMessage]);
    setNewMessage("");
  };

  useEffect(() => {
    // Listen for messages from the server
    socket.on("adminMessage", (message) => {
      console.log(message);
      // Update the client's message state
      setMessages([...messages, message]);
    });

    return () => {
      // Clean up socket connection when component unmounts
      socket.disconnect();
    };
  }, [messages]);
  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col bg-gray-100">
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
                handleMessage();
              }
            }}
          />
          <button
            className="mt-2 px-4 py-3 w-full bg-[#05A83F] text-white rounded-full"
            onClick={handleMessage}
          >
            Send Message
          </button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default inbox;
