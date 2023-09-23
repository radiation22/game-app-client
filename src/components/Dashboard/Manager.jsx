import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ManagerNav from "../Navbar/ManagerNav";
import ManagerDash from "./Manager/ManagerDash";

import Tab from "./Manager/Tab";

const Manager = () => {
  return (
    <>
      <ManagerNav></ManagerNav>
      <Tab></Tab>
      {/* <ManagerDash></ManagerDash> */}
      <Footer></Footer>
    </>
  );
};

export default Manager;
