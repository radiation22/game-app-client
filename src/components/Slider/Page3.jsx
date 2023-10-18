import React from "react";
import slid1 from "../../assets/slidebus2.png";
import skip from "../../assets/skip.png";
import bus2 from "../../assets/bus2.png";
import app from "./../../firebase/firebase.init";

const Page3 = () => {
  return (
    <div className=" pb-[40px]">
      <div className="">
        <img className="w-full" src={slid1} alt="" />
        <div className="mt-[-50px]">
          <p className="text-[#232323] font-bold text-xl">Freedom</p>
          <p className="text-sm mx-10 text-center mb-10 text-[#474d53]">
            By this app you are fee to buy or go anywhere, anytime. just go to
            your app and buy a ticket or multiple tickets for whole day, you can
            use anytime in a day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page3;
