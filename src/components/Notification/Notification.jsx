import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Notification = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="py-8">
        <h2 className="text-xl text-center">You have No notification</h2>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Notification;
