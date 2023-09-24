import React, { useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../context/AuthProvider";
import MyTickets from "./MyTickets";
import { useQuery } from "@tanstack/react-query";
import DriverNav from "../Navbar/DriverNav";
import { toast } from "react-toastify";
import DriverFooter from "../Footer/DriverFooter";
const Supervisor1 = () => {
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

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();
  const formattedDate = `${dd}/${mm}/${yyyy}`;
  const refreshPage = () => {
    window.location.reload();
  };
  // Update the dependencies to include both formattedDate and busNo

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
          `https://nirapode-server.vercel.app/busTicket?busNo=${busNo}`
        );
        const busTicketData = await busTicketResponse.json();

        // Filter data by status "confirmed"
        const confirmedTickets = busTicketData.filter((ticket) => {
          const today = new Date();
          const dd = String(today.getDate()).padStart(2, "0");
          const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
          const yyyy = today.getFullYear();
          const formattedDate = `${dd}/${mm}/${yyyy}`;

          return (
            ticket.status === "checked" &&
            ticket.formattedDate === formattedDate
          );
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
      <DriverNav></DriverNav>
      <div className=" text-center h-screen  py-5 ">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>[Supervisor - 2]</p>
        <p className="text-xl mt-4">Good Afternoon {user?.displayName}</p>
        <div className="">
          <button className="px-4 bg-[#05A83F] text-white uppercase py-2 rounded-lg my-3">
            BUS: 0{busNo}
          </button>
          <button className="px-4 ml-2 bg-[#05A83F] text-white uppercase py-2 rounded-lg my-3">
            Trip No - 0{trip + 1}
          </button>
          <button
            onClick={refreshPage}
            className=" ml-2 px-4 bg-[#05A83F] text-white uppercase py-2 rounded-lg my-3"
          >
            Refresh
          </button>
        </div>
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
                  For this trip you have to deliver
                </h1>
                <h1 className="text-3xl text-white font-bold">
                  {totalCostSum - totalCost} BDT
                </h1>
                <p className="font-bold text-white">Total</p>
              </div>
              <div className="space-y-3 w-[60%] mx-auto">
                <p className="text-lg font-bold">Summary for this trip</p>
                <div className="flex justify-between uppercase mt-5">
                  <p className="border-l-4 ps-3 border-[#41d341]">
                    Total Passenger
                  </p>
                  <p>{totalPassengerSum - tripPassenger}</p>
                </div>

                <div className="flex justify-between uppercase">
                  <p className="border-l-4 ps-3 border-[#41d341]">
                    Total Ticket
                  </p>
                  <p>{ticketNo - totalTickets}</p>
                </div>
                <div className="flex justify-between uppercase">
                  <p className="border-l-4 ps-3 border-[#41d341]">Donation</p>
                  <p>{donation}</p>
                </div>
                <button
                  onClick={handleManager}
                  className="px-5 bg-[#9DDE2A] uppercase py-2 rounded-full my-3"
                >
                  Deliver to Manager
                </button>
              </div>
            </div>
          </>
        )}

        <hr className="mx-5 py-4" />
        {/* <MyTickets tickets={tickets}></MyTickets> */}
        <DriverFooter></DriverFooter>
      </div>
    </>
  );
};

export default Supervisor1;
