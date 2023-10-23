import React from "react";
import slid1 from "../../assets/location-pin-5168313-4323784.png";
import skip from "../../assets/skip.png";
import bus2 from "../../assets/bus2.png";
import { initializeApp } from "firebase/app";

const Page2 = () => {
  return (
    <div className=" pb-[40px]">
      <div className="">
        <img className="h-[200px] mx-auto mt-20 mb-20" src={slid1} alt="" />
        <div className="mt-[-50px]">
          <p className="text-[#232323] font-bold text-xl">Facilitated</p>
          <p className="text-sm mx-10  text-center mb-10 text-[#474d53]">
            This app is facilitated by google maping service. anyone who exist
            in online he or she can buy bus ticket from anywhere or anytime. no
            need to stay on road to take the ticket and take the bus facilities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page2;
