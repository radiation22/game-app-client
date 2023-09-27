import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Footerb from "../Footer/Footerb";
import Navbarb from "../Navbar/Navbarb";

const Notificationb = () => {
  return (
    <>
      <Navbarb></Navbarb>
      <div className="py-8">
        <h2 className="text-xl text-center">আপনার কোনো নোটিফিকেশন নাই</h2>
      </div>
      <Footerb></Footerb>
    </>
  );
};

export default Notificationb;
