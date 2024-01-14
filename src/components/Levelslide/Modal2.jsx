import React from "react";
import "./modal.css";
import { Link } from "react-router-dom";
const Modal2 = () => {
  return (
    <div className="">
      <div className="modal">
        <h2 className="text-white"></h2>
        <div className="mt-8">
          <div className="border gap-5 items-center justify-between flex p-1 rounded-lg">
            <h1 className="text-white"> 1. Run 1 minutes</h1>
            <Link to="/recorder">
              <button className="px-4 py-1 rounded-full bg-rose-600 text-white">
                Go
              </button>
            </Link>
            <p className="text-white">10tk</p>
          </div>
          <div className="border gap-5 mt-2 items-center justify-between flex p-1 rounded-lg">
            <h1 className="text-white"> 2. Sleep 5 minutes</h1>
            <Link to="/recorder">
              <button className="px-4 py-1 rounded-full bg-rose-600 text-white">
                Go
              </button>
            </Link>
            <p className="text-white">10tk</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
