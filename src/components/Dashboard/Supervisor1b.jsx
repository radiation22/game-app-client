import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthProvider";
import MyTickets from "./MyTickets";
import { useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import DriverNavb from "./../Navbar/DriverNavb";
import DriverFooterb from "./../Footer/DriverFooterb";
import { useForm } from "react-hook-form";

const Supervisor1b = () => {
  const { user } = useContext(AuthContext);
  const [ticketNo, setTicketNo] = useState(0);
  const [trip, setTrip] = useState(1);
  const [busNo, setBusNo] = useState(0);
  const [donation, setDonation] = useState(0);
  const [totalCostSum, setTotalCostSum] = useState(0);
  const [totalPassengerSum, setTotalPassengerSum] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [tripPassenger, setTripPassenger] = useState(0);
  const [loading, setLoading] = useState(true);
  const [secret, setSecret] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();
  const formattedDate = `${dd}/${mm}/${yyyy}`;
  const refreshPage = () => {
    window.location.reload();
  };
  // Update the dependencies to include both formattedDate and busNo

  const openModal = () => {
    if (busNo == 1) {
      setSecret(19990);
    } else if (busNo == 2) {
      setSecret(28880);
    } else if (busNo == 3) {
      setSecret(35550);
    } else if (busNo == 4) {
      setSecret(41110);
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);

    // Get the current time
    const currentTime = new Date();
    // Format the time as needed (e.g., HH:MM AM/PM)
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;
    // Calculate the total cost (including donation)
    const totalCost = parseInt(data.totalCost);
    const passenger = parseInt(data.passenger);
    const tickets = {
      startPoint: "auto",
      destination: "auto",
      passenger,
      donation: 0,
      email: "auto",
      totalCost,
      formattedDate,
      formattedTime, // Add the formatted time here
      busNo,
      status: "checked",
      ticketNo: "auto",
      secret,
    };

    fetch("https://nirapode-server.vercel.app/addTicket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tickets),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Ticket Confirmed");
          refreshPage();
        }
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch driver data and extract bus numbers
        const driverResponse = await fetch(
          `https://nirapode-server.vercel.app/singleDrivers?email=${user?.email}`
        );

        const driverData = await driverResponse.json();

        const extractedBusNumbers = driverData.map((item) => {
          setBusNo(item?.busNo);
          // item.busNo;
        });

        // Fetch bus ticket data
        const busTicketResponse = await fetch(
          `https://nirapode-server.vercel.app/ticket`
        );
        const busTicketData = await busTicketResponse.json();

        const confirmedTickets = busTicketData.filter((ticket) => {
          const today = new Date();
          const dd = String(today.getDate()).padStart(2, "0");
          const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
          const yyyy = today.getFullYear();
          const formattedDate = `${dd}/${mm}/${yyyy}`;

          if (
            ticket.status === "checked" &&
            ticket.formattedDate === formattedDate
          ) {
            if (busNo == 1 && ticket.secret == 19990) {
              return true;
            } else if (busNo == 2 && ticket.secret == 28880) {
              return true; // Include this ticket in the filtered array
            } else if (busNo == 3 && ticket.secret == 35550) {
              return true; // Include this ticket in the filtered array
            } else if (busNo == 4 && ticket.secret == 41110) {
              return true; // Include this ticket in the filtered array
            }
          }
          return false; // Exclude this ticket from the filtered array
        });

        setTicketNo(confirmedTickets?.length);

        // Calculate total cost and passenger sum for confirmed tickets
        const costSum = confirmedTickets.reduce(
          (sum, ticket) => sum + ticket.totalCost,
          0
        );

        const passengerSum = confirmedTickets.reduce(
          (sum, ticket) => sum + ticket.passenger,
          0
        );
        const donationSum = confirmedTickets.reduce(
          (sum, ticket) => sum + ticket.donation,
          0
        );
        // setBusNo(extractedBusNumbers);

        setTotalCostSum(costSum);
        setTotalPassengerSum(passengerSum);
        setDonation(donationSum);
        setLoading(false);
        // setTimeout(refreshPage, 20000);

        // Refresh the tickets query
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [busNo]);

  useEffect(() => {
    // Fetch data from the URL
    fetch("https://nirapode-server.vercel.app/trips")
      .then((response) => response.json())
      .then((data) => {
        const todayTrips = data.filter((trip) => {
          return trip.formattedDate === formattedDate && trip.busNo === busNo;
        });

        // Calculate totalCost and totalTickets
        const totalCostSum = todayTrips.reduce(
          (sum, trip) => sum + trip?.totalCostSum,
          0
        );

        const totalTicketsSum = todayTrips.reduce(
          (sum, trip) => sum + trip.ticketNo,
          0
        );

        const totalDonationSum = todayTrips.reduce(
          (sum, trip) => sum + trip.donation,
          0
        );

        const tripPassenger = todayTrips.reduce(
          (sum, trip) => sum + trip.totalPassengerSum,
          0
        );

        setTripPassenger(tripPassenger);
        setTrip(todayTrips?.length);
        setTotalCost(totalCostSum);
        setTotalTickets(totalTicketsSum);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [formattedDate, busNo]);

  // this is for reducing the cost when it send to the manager

  const handleManager = () => {
    // Create a confirmation dialog
    const confirmed = window.confirm("Are you sure to Deliver?");

    if (!confirmed) {
      // If the user cancels the confirmation, do nothing
      return;
    }

    const tripsInfo = {
      totalCostSum,
      totalPassengerSum,
      ticketNo,
      donation,
      trip: trip + 1,
      email: user?.email,
      busNo,
      status: "Pending",
      formattedDate,
    };

    fetch("https://nirapode-server.vercel.app/addTrip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripsInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Trip Confirmed");
          window.location.reload();
        }
      });
  };

  return (
    <>
      <DriverNavb></DriverNavb>
      <div className=" text-center h-screen  py-5 ">
        <h1 className="text-2xl font-bold">ড্যাশবোর্ড</h1>
        <p>[Supervisor - 2]</p>
        <p className="text-xl mt-4">Welcome {user?.displayName}</p>
        <div className="">
          <button className="px-4 bg-[#05A83F] text-white uppercase py-2 rounded-lg my-3">
            বাস: 0{busNo}
          </button>
          <button className="px-4 ml-2 bg-[#05A83F] text-white uppercase py-2 rounded-lg my-3">
            ট্রিপ নং - 0{trip + 1}
          </button>
          <button
            onClick={refreshPage}
            className=" ml-2 px-4 bg-[#05A83F] text-white uppercase py-2 rounded-lg my-3"
          >
            রিফ্রেশ
          </button>
        </div>
        <button
          onClick={openModal}
          className=" ml-2 px-4 bg-[#05A83F] text-white uppercase py-2 rounded-lg my-3"
        >
          টিকিট কেটে দিন
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-bold"></p>
                  <button
                    className="modal-close-button rounded-full cursor-pointer z-50 bg-red-400 px-3 py-1 text-white"
                    onClick={closeModal}
                  >
                    X
                  </button>
                </div>
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full pt-5  px-2 mb-1 lg:mb-0">
                      <input
                        {...register("passenger")}
                        className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                        id="numPeople"
                        type="number"
                        required
                        placeholder="    Number of Passengers"
                      />
                    </div>
                    <div className="w-full pt-5  px-2 mb-1 lg:mb-0">
                      <select
                        style={{
                          borderTop: "none",
                          borderRight: "none",
                          borderLeft: "none",
                          borderBottom: "1px solid #B6C5D3",
                        }}
                        {...register("totalCost")}
                        className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                        id="packageRequested"
                      >
                        <option value="12">12 tk</option>
                        <option value="15">15 tk</option>
                        <option value="18">18 tk</option>
                        <option value="21">21 tk</option>
                        <option value="24">24 tk</option>
                        <option value="27">27 tk</option>
                        <option value="30">30 tk</option>
                        <option value="33">33 tk</option>
                        <option value="37">37 tk</option>
                        <option value="40">40 tk</option>
                        <option value="43">43 tk</option>
                        <option value="47">47 tk</option>
                        <option value="50">50 tk</option>
                      </select>
                    </div>
                    <button className=" ml-2 px-4 bg-[#05A83F] text-white uppercase py-2 rounded-lg my-3">
                      Confirm
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading ? (
          // Display the loading spinner while loading data
          <div className="text-center">
            <button className="btn loading">Loading</button>
          </div>
        ) : (
          <>
            <div className="flex flex-col py-5 w-full">
              <div className="bg-[#41d341] space-y-3  rounded-lg mx-4 my-5 text-center p-5">
                <h1 className="text-lg text-white font-bold">
                  এই ট্রিপের জন্য জমা দিন
                </h1>
                <h1 className="text-3xl text-white font-bold">
                  {totalCostSum - totalCost} BDT
                </h1>
                <p className="font-bold text-white">Total</p>
              </div>
              <div className="space-y-3 w-[60%] mx-auto">
                <p className="text-lg font-bold">Summary for this trip</p>
                <div className="flex justify-between uppercase mt-5">
                  <p className="border-l-4 ps-3 border-[#41d341]">মোট যাত্রী</p>
                  <p>{totalPassengerSum - tripPassenger}</p>
                </div>

                <div className="flex justify-between uppercase">
                  <p className="border-l-4 ps-3 border-[#41d341]">মোট টিকিট</p>
                  <p>{ticketNo - totalTickets}</p>
                </div>
                <div className="flex justify-between uppercase">
                  <p className="border-l-4 ps-3 border-[#41d341]">অনুদান</p>
                  <p>{donation}</p>
                </div>
                <button
                  onClick={handleManager}
                  className="px-5 bg-[#9DDE2A] uppercase py-2  rounded-full my-3"
                >
                  ম্যানেজারকে জমা দিন
                </button>
              </div>
            </div>
          </>
        )}

        <hr className="mx-5 py-4" />
        {/* <MyTickets tickets={tickets}></MyTickets> */}
        <DriverFooterb></DriverFooterb>
      </div>
    </>
  );
};

export default Supervisor1b;
