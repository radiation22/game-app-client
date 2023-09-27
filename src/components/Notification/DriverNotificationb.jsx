import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import DriverNav from "../Navbar/DriverNav";
import DriverNavb from "../Navbar/DriverNavb";
import DriverFooterb from "../Footer/DriverFooterb";

const DriverNotificationb = () => {
  return (
    <>
      <DriverNavb></DriverNavb>
      <div className="py-8">
        <h2 className="text-xl text-center">You have No notification</h2>
      </div>
      <DriverFooterb></DriverFooterb>
    </>
  );
};

export default DriverNotificationb;
