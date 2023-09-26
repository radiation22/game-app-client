import React from "react";
import { useNavigate } from "react-router-dom";
import passenger from "../../assets/passenger.png";
import driver from "../../assets/driver.png";
import background from "../../assets/background.jpg";
const ChooseAccountb = () => {
  const navigate = useNavigate();
  const handlePassenger = () => {
    navigate("/locationb");
  };
  const handleDriver = () => {
    navigate("/dashboard");
  };
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        width: "100%",
        backgroundRepeat: "no-repeat",
      }}
      className="flex items-center w-full h-screen justify-center"
    >
      <div className="space-y-2 px-8 text-center">
        <h1 className="text-center uppercase text-2xl font-semibold  text-white">
          আপনি কি হিসাবে যোগদান করছেন ?
        </h1>
        <div className="flex">
          <div>
            <img
              onClick={handlePassenger}
              className="w-[160px]"
              src={passenger}
              alt=""
            />
          </div>

          <div>
            <img
              onClick={handleDriver}
              className="w-[160px]"
              src={driver}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseAccountb;
