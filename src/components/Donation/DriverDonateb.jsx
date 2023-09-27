import React from "react";
import DriverNav from "../Navbar/DriverNav";
import DriverNavb from "../Navbar/DriverNavb";
import DriverFooterb from "../Footer/DriverFooterb";
const DriverDonateb = () => {
  return (
    <div>
      <DriverNavb></DriverNavb>
      <div>
        <p className="text-center text-3xl  py-10">You have no Donate</p>
      </div>
      <DriverFooterb></DriverFooterb>
    </div>
  );
};

export default DriverDonateb;
