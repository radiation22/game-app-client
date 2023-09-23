import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
const StartPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigate("/slider");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const zoomInStyle = {
    animation: "zoom-in 3s ease-in-out",
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center bg-[#04A83F] items-center h-screen">
          <img className="h-48" src={logo} alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default StartPage;
