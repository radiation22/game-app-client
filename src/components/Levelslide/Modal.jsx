import React from "react";
import { Canvas } from "react-three-fiber";
import { useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import "./carton.css";
import RunningBoy from "./RunningBoy";
import gif1 from "../../assets/gaming.gif";
import gif2 from "../../assets/run.gif";
const Modal = ({ event, price }) => {
  console.log(price);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("");

  const [dropdowns, setDropdowns] = useState({
    dropdown1: false,
  });

  const closeModal = () => {
    setDropdowns({
      dropdown1: false,
    });
  };

  const toggleDropdown = (key, event) => {
    setCategory(event);
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [key]: !prevDropdowns[key],
    }));
  };

  return (
    <div className="fixed top-16 flex items-center justify-center z-50">
      <div className="modal-container p-4 bg-[#300a15]   rounded-lg shadow-lg z-50 overflow-y-auto">
        <div className=" p-2">
          <div className="flex gap-3 flex-col">
            <button
              onClick={() => toggleDropdown("dropdown1", event?.no1)}
              className="text-white bg-rose-600 rounded-md"
            >
              {event?.no1}
            </button>
            <button
              onClick={() => toggleDropdown("dropdown1", event.no2)}
              className="text-white bg-rose-600 rounded-md"
            >
              {event?.no2}
            </button>
            <button
              onClick={() => toggleDropdown("dropdown1")}
              className="text-white bg-rose-600 rounded-md"
            >
              {event?.no3}
            </button>
            <button className="text-white bg-rose-600 rounded-md">
              {event?.no4}
            </button>
            <button className="text-white bg-rose-600 rounded-md">
              {event?.no5}
            </button>
          </div>
        </div>
      </div>

      {dropdowns.dropdown1 && (
        <div className="fixed inset-0 overflow-y-auto flex  items-center justify-center z-50">
          <div className="modal-overlay"></div>
          <div className="modal-container bg-[#300a15] w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className=" text-white font-bold">Welcome to {category}</p>
                <button
                  className="modal-close-button rounded-full cursor-pointer z-50 bg-red-400  px-1 text-white"
                  onClick={closeModal}
                >
                  X
                </button>
              </div>
              <div className="overflow-y-auto">
                <div id="avatar-container" className="avatar-container">
                  <div className="flex gap-4">
                    <img className="h-20" src={gif1} alt="" />
                    <img className="h-20" src={gif2} alt="" />
                  </div>
                  <p className="text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores exercitationem magni ut ab dignissimos ducimus
                    consequatur vitae, a quas tempora ipsa porro animi
                    cupiditate facilis voluptatum ullam in quo ipsum?
                  </p>
                  <button className="bg-green-500 text-white px-3 rounded">
                    Got It
                  </button>
                </div>
                <div>
                  <p className="text-white">Start Your activity for earning</p>
                  <div className="mt-8">
                    <div className="border gap-5 items-center justify-between flex p-1 rounded-lg">
                      <h1 className="text-white"> 1. Run 1 minutes</h1>
                      <Link to={`/recorder/10`}>
                        <button className="px-4 py-1 rounded-full bg-rose-600 text-white">
                          Go
                        </button>
                      </Link>
                      <p className="text-white">10tk</p>
                    </div>
                    <div className="border gap-5 mt-2 items-center justify-between flex p-1 rounded-lg">
                      <h1 className="text-white"> 2. Sleep 5 minutes</h1>
                      <Link to="/recorder/20">
                        <button className="px-4 py-1 rounded-full bg-rose-600 text-white">
                          Go
                        </button>
                      </Link>
                      <p className="text-white">20tk</p>
                    </div>
                    <div className="border gap-5 mt-2 items-center justify-between flex p-1 rounded-lg">
                      <h1 className="text-white"> 2. Sleep 5 minutes</h1>
                      <Link to="/recorder/30">
                        <button className="px-4 py-1 rounded-full bg-rose-600 text-white">
                          Go
                        </button>
                      </Link>
                      <p className="text-white">10tk</p>
                    </div>

                    <div className="border gap-5 mt-2 items-center justify-between flex p-1 rounded-lg">
                      <h1 className="text-white"> 2. Sleep 5 minutes</h1>
                      <Link to="/recorder/40">
                        <button className="px-4 py-1 rounded-full bg-rose-600 text-white">
                          Go
                        </button>
                      </Link>
                      <p className="text-white">10tk</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
