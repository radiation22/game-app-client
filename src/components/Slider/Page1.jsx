import React from "react";
import slid1 from "../../assets/sliding.jpg";

const Page1 = () => {
  return (
    <div className=" pb-[40px]">
      <div className="">
        <img className="w-full" src={slid1} alt="" />
        <div className="mt-[-50px]">
          <p className="text-[#232323] font-bold text-xl">Welcome</p>
          <p className="text-sm mx-10 text-center mb-10 text-[#C9CACB]">
            Greetings From Nirapode family. it's a public transport automation{" "}
            <br />
            service which is a product/sister concern of{" "}
            <a className="underline" href="https://radiationgroup.tech/">
              Radiation corporation.
            </a>
            Developed by :{" "}
            <a className="underline" href="https://ceo.radiationgroup.tech/">
              Md Habibul Islam
            </a>{" "}
            & Radiation Software Team (Mr. Thohidul Islam, so on).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page1;
