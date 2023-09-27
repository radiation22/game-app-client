import React from "react";
import DriverNav from "../Navbar/DriverNav";
import DriverFooter from "../Footer/DriverFooter";
const DriverDonate = () => {
  return (
    <div>
      <DriverNav></DriverNav>
      <div>
        <p className="text-center text-3xl  py-10">You have no Donate</p>
      </div>
      <DriverFooter></DriverFooter>
    </div>
  );
};

export default DriverDonate;
