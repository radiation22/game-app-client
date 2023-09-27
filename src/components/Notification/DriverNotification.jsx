import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import DriverNav from "../Navbar/DriverNav";
import DriverFooter from "../Footer/DriverFooter";

const DriverNotification = () => {
  return (
    <>
      <DriverNav></DriverNav>
      <div className="py-8">
        <h2 className="text-xl text-center">You have No notification</h2>
      </div>
      <DriverFooter></DriverFooter>
    </>
  );
};

export default DriverNotification;
