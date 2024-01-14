import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/gamelog.png";
import { AuthContext } from "../context/AuthProvider";
const StartPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      navigate("/appHome");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate, user]);

  const zoomInStyle = {
    animation: "zoom-in 3s ease-in-out",
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center  items-center h-screen">
          <img className="h-20" src={logo} alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default StartPage;
