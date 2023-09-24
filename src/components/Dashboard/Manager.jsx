import React, { useState, useEffect } from "react"; // Import useState and useEffect
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ManagerNav from "../Navbar/ManagerNav";
import ManagerDash from "./Manager/ManagerDash";
import Tab from "./Manager/Tab";
import Loader from "../Loader/Loader";

const Manager = () => {
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading state

  // Simulate loading for 2 seconds (you can replace this with your actual loading logic)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after 2 seconds
    }, 2000);
  }, []);

  return (
    <>
      <ManagerNav></ManagerNav>

      {isLoading ? ( // Conditionally render a loading indicator
        <Loader></Loader>
      ) : (
        <Tab></Tab> // Render your ManagerDash component when not loading
      )}
    </>
  );
};

export default Manager;
