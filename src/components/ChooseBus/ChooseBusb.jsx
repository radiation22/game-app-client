import React, { useContext, useEffect, useState } from "react";
import bus from "../../assets/Asset 30.png";
import { useForm } from "react-hook-form";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";
import style2 from "../../assets/style2-removebg-preview.png";
import Navbarb from "../Navbar/Navbarb";
import Footerb from "../Footer/Footerb";

const ChooseBusb = () => {
  const { busNumber } = useParams();
  const [ticket, setTicket] = useState(0);
  const busNo = parseInt(busNumber.match(/\d+/)[0]);
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();
  const formattedDate = `${dd}/${mm}/${yyyy}`;

  const status = "Pending";
  const calculateCost = (startPoint, destination) => {
    // Define the cost for different routes
    const costMap = {
      NotunBridge: {
        RajaKhali: 12,
        KalmiyaBazar: 15,
        RahatarPhul: 18,
        Bohoddarhat: 21,
        MuradPur: 24,
        DuiNogate: 27,
        GEC: 30,
        Washa: 33,
        Lalkhan: 37,
        Dewanhat: 40, // Cost from Muradpur to GEC
        Agrabad: 43,
        BarekBuilding: 47,
        Bandhar: 50,
        Cepz: 53,
        Katghor: 57,
        Potenga: 60,
        // Cost from Muradpur to Agrabad
      },
      RajaKhali: {
        KalmiyaBazar: 12,
        RahatarPhul: 15,
        Bohoddarhat: 18,
        MuradPur: 21,
        DuiNogate: 24,
        GEC: 27,
        Washa: 30,
        Lalkhan: 33,
        Dewanhat: 37, // Cost from Muradpur to GEC
        Agrabad: 40,
        BarekBuilding: 43,
        Bandhar: 47,
        Cepz: 50,
        Katghor: 53,
        Potenga: 57,
        NotunBridge: 12,
        // Cost from Muradpur to Agrabad
      },
      KalmiyaBazar: {
        RahatarPhul: 12,
        Bohoddarhat: 15,
        MuradPur: 18,
        DuiNogate: 21,
        GEC: 24,
        Washa: 27,
        Lalkhan: 30,
        Dewanhat: 33, // Cost from Muradpur to GEC
        Agrabad: 37,
        BarekBuilding: 40,
        Bandhar: 43,
        Cepz: 47,
        Katghor: 50,
        Potenga: 53,
        NotunBridge: 15,
        RajaKhali: 12,
        // Cost from Muradpur to Agrabad
      },
      RahatarPhul: {
        Bohoddarhat: 12,
        MuradPur: 15,
        DuiNogate: 18,
        GEC: 21,
        Washa: 24,
        Lalkhan: 27,
        Dewanhat: 30, // Cost from Muradpur to GEC
        Agrabad: 33,
        BarekBuilding: 37,
        Bandhar: 40,
        Cepz: 43,
        Katghor: 47,
        Potenga: 50,
        NotunBridge: 18,
        RajaKhali: 15,
        KalmiyaBazar: 12,
        // Cost from Muradpur to Agrabad
      },
      Bohoddarhat: {
        MuradPur: 12,
        DuiNogate: 15,
        GEC: 18,
        Washa: 21,
        Lalkhan: 24,
        Dewanhat: 27, // Cost from Muradpur to GEC
        Agrabad: 30,
        BarekBuilding: 33,
        Bandhar: 37,
        Cepz: 40,
        Katghor: 47,
        Potenga: 50,
        NotunBridge: 21,
        RajaKhali: 18,
        KalmiyaBazar: 15,
        RahatarPhul: 12,
        // Cost from Muradpur to Agrabad
      },
      MuradPur: {
        DuiNogate: 12,
        GEC: 15,
        Washa: 18,
        Lalkhan: 21,
        Dewanhat: 24,
        Agrabad: 27,
        BarekBuilding: 30,
        Bandhar: 33,
        Cepz: 37,
        Katghor: 40,
        Potenga: 43,
        NotunBridge: 24,
        RajaKhali: 21,
        KalmiyaBazar: 18,
        RahatarPhul: 15,
        Bohoddarhat: 12,
      },
      DuiNogate: {
        GEC: 12,
        Washa: 15,
        Lalkhan: 18,
        Dewanhat: 21,
        Agrabad: 24,
        BarekBuilding: 27,
        Bandhar: 30,
        Cepz: 33,
        Katghor: 37,
        Potenga: 40,
        NotunBridge: 27,
        RajaKhali: 24,
        KalmiyaBazar: 21,
        RahatarPhul: 18,
        Bohoddarhat: 15,
        MuradPur: 12,
      },
      GEC: {
        Washa: 12,
        Lalkhan: 15,
        Dewanhat: 21,
        Agrabad: 24,
        BarekBuilding: 27,
        Bandhar: 30,
        Cepz: 33,
        Katghor: 37,
        Potenga: 40,
        NotunBridge: 30,
        RajaKhali: 27,
        KalmiyaBazar: 24,
        RahatarPhul: 21,
        Bohoddarhat: 18,
        MuradPur: 15,
        DuiNogate: 12,
      },
      Washa: {
        Lalkhan: 12,
        Dewanhat: 15,
        Agrabad: 18,
        BarekBuilding: 21,
        Bandhar: 24,
        Cepz: 27,
        Katghor: 30,
        Potenga: 33,
        NotunBridge: 33,
        RajaKhali: 30,
        KalmiyaBazar: 27,
        RahatarPhul: 24,
        Bohoddarhat: 21,
        MuradPur: 18,
        DuiNogate: 15,
        GEC: 12,
      },
      Lalkhan: {
        Dewanhat: 12,
        Agrabad: 15,
        BarekBuilding: 18,
        Bandhar: 21,
        Cepz: 24,
        Katghor: 27,
        Potenga: 30,
        NotunBridge: 43,
        RajaKhali: 33,
        KalmiyaBazar: 30,
        RahatarPhul: 27,
        Bohoddarhat: 24,
        MuradPur: 21,
        DuiNogate: 18,
        GEC: 15,
        Washa: 12,
      },
      Dewanhat: {
        Agrabad: 12,
        BarekBuilding: 15,
        Bandhar: 18,
        Cepz: 21,
        Katghor: 24,
        Potenga: 27,
        NotunBridge: 40,
        RajaKhali: 37,
        KalmiyaBazar: 33,
        RahatarPhul: 30,
        Bohoddarhat: 27,
        MuradPur: 24,
        DuiNogate: 21,
        GEC: 18,
        Washa: 15,
        Lalkhan: 12,
      },
      Agrabad: {
        BarekBuilding: 12,
        Bandhar: 15,
        Cepz: 18,
        Katghor: 21,
        Potenga: 24,
        NotunBridge: 43,
        RajaKhali: 40,
        KalmiyaBazar: 37,
        RahatarPhul: 33,
        Bohoddarhat: 30,
        MuradPur: 27,
        DuiNogate: 24,
        GEC: 21,
        Washa: 18,
        Lalkhan: 15,
        Dewanhat: 12,
      },
      BarekBuilding: {
        Bandhar: 12,
        Cepz: 15,
        Katghor: 18,
        Potenga: 21,
        NotunBridge: 47,
        RajaKhali: 43,
        KalmiyaBazar: 40,
        RahatarPhul: 37,
        Bohoddarhat: 33,
        MuradPur: 30,
        DuiNogate: 27,
        GEC: 24,
        Washa: 21,
        Lalkhan: 18,
        Dewanhat: 15, // Cost from Muradpur to GEC
        Agrabad: 12,
      },
      Bandhar: {
        Cepz: 12,
        Katghor: 15,
        Potenga: 18,
        NotunBridge: 50,
        RajaKhali: 47,
        KalmiyaBazar: 43,
        RahatarPhul: 40,
        Bohoddarhat: 37,
        MuradPur: 33,
        DuiNogate: 30,
        GEC: 27,
        Washa: 24,
        Lalkhan: 21,
        Dewanhat: 18, // Cost from Muradpur to GEC
        Agrabad: 15,
        BarekBuilding: 12,
      },
      Cepz: {
        Katghor: 12,
        Potenga: 15,
        NotunBridge: 53,
        RajaKhali: 50,
        KalmiyaBazar: 47,
        RahatarPhul: 43,
        Bohoddarhat: 40,
        MuradPur: 37,
        DuiNogate: 33,
        GEC: 30,
        Washa: 27,
        Lalkhan: 24,
        Dewanhat: 21, // Cost from Muradpur to GEC
        Agrabad: 18,
        BarekBuilding: 15,
        Bandhar: 12,
      },
      Katghor: {
        Potenga: 12,
        NotunBridge: 57,
        RajaKhali: 53,
        KalmiyaBazar: 50,
        RahatarPhul: 47,
        Bohoddarhat: 43,
        MuradPur: 40,
        DuiNogate: 37,
        GEC: 33,
        Washa: 30,
        Lalkhan: 27,
        Dewanhat: 24, // Cost from Muradpur to GEC
        Agrabad: 21,
        BarekBuilding: 18,
        Bandhar: 15,
        Cepz: 12,
      },
      Potenga: {
        NotunBridge: 60,
        RajaKhali: 57,
        KalmiyaBazar: 53,
        RahatarPhul: 50,
        Bohoddarhat: 47,
        MuradPur: 43,
        DuiNogate: 40,
        GEC: 37,
        Washa: 33,
        Lalkhan: 30,
        Dewanhat: 27, // Cost from Muradpur to GEC
        Agrabad: 24,
        BarekBuilding: 21,
        Bandhar: 18,
        Cepz: 15,
        Katghor: 12,
      },
    };

    // Check if the start point and destination are in the cost map
    if (costMap[startPoint] && costMap[startPoint][destination]) {
      return costMap[startPoint][destination];
    }

    // Default cost if no matching route is found
    return 0; // You can set a default cost here
  };

  useEffect(() => {
    const url = `https://nirapode-server.vercel.app/ticket`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTicket(data));
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    const startPoint = data.startPoint;
    const destination = data.destination;
    const passenger = parseFloat(data.passenger);
    const donation = parseFloat(data.donation);
    const email = user?.email;

    // Get the current time
    const currentTime = new Date();

    // Format the time as needed (e.g., HH:MM AM/PM)
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;

    // Calculate the cost based on the selected start point and destination
    const cost = calculateCost(startPoint, destination);

    // Calculate the total cost (including donation)
    const totalCost = cost * passenger;
    const tickets = {
      startPoint,
      destination,
      passenger,
      donation,
      email,
      totalCost,
      formattedDate,
      formattedTime, // Add the formatted time here
      busNo,
      status,
      ticketNo: ticket?.length,
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
          navigate("/ticketb");
        }
      });
  };

  return (
    <>
      <Navbarb></Navbarb>
      <div className="py-2 w-[80%] mx-auto">
        <div>
          <div className="flex justify-center">
            <img className="h-[120px]" src={bus} alt="" />
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" rounded px-3 pt-2 pb-8"
            >
              <h1 className="uppercase rounded-full w-[70%] mx-auto text-center bg-[#05A83F] text-white   font-bold py-1">
                BUS {busNo}
              </h1>
              <div className="flex flex-wrap mt-4 -mx-2 mb-4">
                <div className="w-full flex">
                  <div>
                    <img src={style2} alt="" />
                  </div>
                  <div className="w-full">
                    <div className="w-full  px-2 mb-4 lg:mb-0">
                      <label
                        className="block text-[#373738] text-xs  mb-1"
                        htmlFor="packageRequested"
                      >
                        From
                      </label>
                      <select
                        style={{
                          borderTop: "none",
                          borderRight: "none",
                          borderLeft: "none",
                          borderBottom: "1px solid #B6C5D3",
                        }}
                        {...register("startPoint")}
                        className="  bg-[#F2F3F5] w-full py-3  text-[#A5B1C0]   focus:outline-none "
                        id="packageRequested"
                      >
                        <option value="Muradpur">আমার যাত্রা শুরু</option>
                        <option value="NotunBridge">NotunBridge</option>
                        <option value="RajaKhali">RajaKhali</option>
                        <option value="KalmiyaBazar">KalmiyaBazar</option>
                        <option value="RahatarPhul">RahatarPhul</option>
                        <option value="Bohoddarhat"> Bohoddarhat</option>
                        <option value="MuradPur"> MuradPur</option>
                        <option value="DuiNogate"> DuiNogate</option>
                        <option value="GEC"> GEC</option>
                        <option value="Washa">Washa</option>
                        <option value="Lalkhan">Lalkhan</option>
                        <option value="Dewanhat">Dewanhat</option>
                        <option value="Agrabad">Agrabad</option>
                        <option value="BarekBuilding">BarekBuilding</option>
                        <option value="Bandhar"> Bandhar</option>
                        <option value="Cepz">Cepz</option>
                        <option value="Katghor">Katghor</option>
                        <option value="Potenga">Potenga</option>
                      </select>
                    </div>
                    <div className="w-full  px-2 mb-1 lg:mb-0">
                      <label
                        className="block text-[#373738] text-xs  mb-1"
                        htmlFor="packageRequested"
                      >
                        To
                      </label>
                      <select
                        style={{
                          borderTop: "none",
                          borderRight: "none",
                          borderLeft: "none",
                          borderBottom: "1px solid #B6C5D3",
                        }}
                        {...register("destination")}
                        className="  bg-[#F2F3F5] w-full py-3  text-[#A5B1C0]   focus:outline-none "
                        id="packageRequested"
                      >
                        <option value="Muradpur">গন্তব্য</option>
                        <option value="NotunBridge">NotunBridge</option>
                        <option value="RajaKhali">RajaKhali</option>
                        <option value="KalmiyaBazar">KalmiyaBazar</option>
                        <option value="RahatarPhul">RahatarPhul</option>
                        <option value="Bohoddarhat"> Bohoddarhat</option>
                        <option value="MuradPur"> MuradPur</option>
                        <option value="DuiNogate"> DuiNogate</option>
                        <option value="GEC"> GEC</option>
                        <option value="Washa">Washa</option>
                        <option value="Lalkhan">Lalkhan</option>
                        <option value="Dewanhat">Dewanhat</option>
                        <option value="Agrabad">Agrabad</option>
                        <option value="BarekBuilding">BarekBuilding</option>
                        <option value="Bandhar"> Bandhar</option>
                        <option value="Cepz">Cepz</option>
                        <option value="Katghor">Katghor</option>
                        <option value="Potenga">Potenga</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="w-full pt-5  px-2 mb-1 lg:mb-0">
                  <input
                    {...register("passenger")}
                    className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                    id="numPeople"
                    type="number"
                    required
                    placeholder="    নাম্বার অফ প্যাসেঞ্জার"
                  />
                </div>
                <div className="w-full pt-3  px-2 mb-1 lg:mb-0">
                  <input
                    {...register("donation")}
                    className="w-full px-3 py-2 drop-shadow-xl border rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                    id="numPeople"
                    type="number"
                    placeholder="    অনুদান"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mb-10">
                <button
                  className="w-full px-8 py-2 font-semibold drop-shadow-xl rounded-full bg-[#9DDE2A] hover:text-white text-gray-100"
                  type="submit"
                >
                  কনফার্ম টিকিট
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footerb></Footerb>
    </>
  );
};

export default ChooseBusb;
