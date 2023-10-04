import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import sun from "../../assets/sun.png";
import star from "../../assets/star.png";
import { FaAngleRight } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import Footerb from "../Footer/Footerb";
import Navbarb from "../Navbar/Navbarb";
import { useState } from "react";
import { Link } from "react-router-dom";

const Claim = () => {
  const { user } = useContext(AuthContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Define the query key
  const queryKey = ["tickets", user?.email];

  // Use the useQuery hook to fetch data
  const { data: tickets = [], refetch } = useQuery(
    queryKey,
    async () => {
      const url = `https://nirapode-server.vercel.app/myTicket?email=${user?.email}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
    {
      enabled: !!user?.email, // Only fetch data when user.email is available
    }
  );
  const points = 10 + 5 * tickets.length; // Replace with the actual points
  const totalPointsGoal = 200; // Replace with your total points goal

  // Calculate the progress percentage
  const progressPercentage = (points / totalPointsGoal) * 100;

  // Calculate the width of the progress bar based on the progress percentage
  const progressBarWidth = `${progressPercentage}%`;

  // Define whether each reward is enabled based on points
  const isCashBackEnabled = points >= 10;
  const isFreeRideEnabled = points >= 200;

  return (
    <>
      <Navbar></Navbar>
      <div className="pt-10 pb-28">
        <div>
          <p className="text-2xl font-bold text-center px-4">
            Don't Click Anywhere Just Show it Supervisor
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl mt-5 mx-5">
          <div className="flex justify-between">
            <h1 className="text-[#0DAB46]">রিওয়ার্ডস</h1>
            <p className="text-[#9DDE2A]">সব দেখুন</p>
          </div>
          <hr className="mt-2 mb-4" />
          {/* Render Cash Back reward if enabled */}
          {isCashBackEnabled && (
            <div className="flex gap-3 items-center justify-between">
              <div className="w-[20%]">
                <div
                  style={{
                    borderRadius: "50%",
                    width: "70px",
                    height: "70px",
                    background: "#9DDE2A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p>
                    Free <br /> Ride
                  </p>
                </div>
              </div>
              <p className="w-[60%] text-sm text-[#96A6B6]">
                Please Collect your Reward
              </p>

              <button
                className="bg-[#96A6B6] py-2 px-4 rounded-full"
                disabled={isButtonDisabled}
              >
                Collect
              </button>
            </div>
          )}

          {/* Render Free Ride reward if enabled */}
          {isFreeRideEnabled && (
            <div className="flex gap-3 items-center mt-3 justify-between">
              <div className="w-[20%]">
                <div
                  style={{
                    borderRadius: "50%",
                    width: "70px",
                    height: "70px",
                    background: "#9DDE2A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p>
                    Cash <br /> Back
                  </p>
                </div>
              </div>
              <p className="w-[60%] text-sm text-[#96A6B6]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis mollitia
              </p>
              <button className="bg-[#9DDE2A] py-2 px-4 rounded-full">
                Claim
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Claim;
