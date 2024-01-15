import React, { useContext, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/pagination";
import "./shoping.css";
import burger from "../../assets/buyburger.png";
import fizza from "../../assets/buyfizza.png";
import chicken from "../../assets/buychicken.png";
import sandwich from "../../assets/buysand.png";
import icecream from "../../assets/buyicecream.png";
import chawmin from "../../assets/buychawmin.png";
import hotDog from "../../assets/buyhotdog.png";
import kacci from "../../assets/buykacci.png";
import sharma from "../../assets/buysharma.png";
import juice from "../../assets/buyjuice.png";
import { AuthContext } from "../context/AuthProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import arrow from "../../assets/rightarrow.png";

// Other imports...

export default function ShopingSlide() {
  const [selectedImage, setSelectedImage] = useState("");
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [item, setItem] = useState({});

  const foods = [
    {
      id: 1,
      imgSrc: burger,
      price: 100,
      name: "burger",
    },
    {
      id: 2,
      imgSrc: fizza,
      price: 100,
      name: "fizza",
    },
    {
      id: 3,
      imgSrc: chicken,
      price: 100,
      name: "chokolate",
    },
    {
      id: 4,
      imgSrc: sandwich,
      price: 100,
      name: "box",
    },
    {
      id: 5,
      imgSrc: juice,
      price: 100,
      name: "burger",
    },
    {
      id: 6,
      imgSrc: sharma,
      price: 100,
      name: "fizza",
    },
    {
      id: 7,
      imgSrc: icecream,
      price: 100,
      name: "burger",
    },
    {
      id: 8,
      imgSrc: kacci,
      price: 100,
      name: "fizza",
    },
    {
      id: 9,
      imgSrc: chawmin,
      price: 100,
      name: "chokolate",
    },
    {
      id: 10,
      imgSrc: hotDog,
      price: 100,
      name: "box",
    },
  ];

  const onSubmit = (data) => {
    const name = data.name;
    const phone = data.number;
    const address = data.address;
    const email = data.email;

    // Get the current time
    const currentTime = new Date();
    // Format the time as needed (e.g., HH:MM AM/PM)
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;

    const orderInfo = {
      // formattedDate,
      formattedTime,
      name,
      phone,
      email,
      address,
      status: "pending",
      food: item?.name,
      price: item?.price,
    };

    fetch("https://game-server-xi.vercel.app/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setIsModalOpen(false);
          toast.success("Order Confirmed");
          refreshPage();
        }
      });
  };
  const [expanded, setExpanded] = useState(false);
  const [width, setWidth] = useState(25);
  const [arrowHeight, setArrowHeight] = useState(15);
  const [arrowWidth, setArrowWidth] = useState(150);

  const toggleExpansion = () => {
    setExpanded(!expanded);
    if (expanded === false) {
      setWidth(100);
      setArrowWidth(0);
      setArrowHeight(0);
    } else {
      setArrowHeight(15);
      setArrowHeight(150);
      setWidth(25);
    }
  };
  const openModal = (src, food) => {
    if (!user) {
      return navigate("/login");
    }
    setItem(food);
    setSelectedImage(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        style={{ width: `${width}%` }}
        className="left-1 h-[45px] flex border border-gray-200  items-center bg-gradient-to-r  from-[#ec2a74c0] to-[#381130de] ps-2  pr-3 rounded-full  bottom-20"
      >
        <Swiper
          navigation={false}
          modules={[Navigation]}
          slidesPerView={expanded ? 4 : 1}
          spaceBetween={20}
          className="mySwiper mt-[-40px]"
        >
          {foods.map((food) => (
            <SwiperSlide className="" key={food.id}>
              <div className="p-1 text-center">
                <img
                  onClick={() => openModal(food?.imgSrc, food)}
                  className="h-16 w-16 mx-auto"
                  src={food?.imgSrc}
                  alt=""
                />
                <p className="text-white text-[10px] uppercase">{food.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="" onClick={toggleExpansion}>
          <img
            className={`h-[${arrowHeight}px] w-[${arrowWidth}px]`}
            src={arrow}
            alt=""
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container border border-rose-600 border-r-2 bg-[#0c13249d] w-11/12 md:max-w-md mx-auto rounded-[30px] shadow-lg z-50">
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
                <h1 className="text-center text-white">Want this Food?</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="w-full   px-2 mb-1 lg:mb-0">
                    <img
                      className="h-14 w-14 my-2 rounded-full mx-auto"
                      src={selectedImage}
                      alt=""
                    />

                    <div>
                      <p className="text-white text-center">
                        Price:{item?.price} tk
                      </p>
                    </div>

                    <div>
                      <input
                        {...register("name")}
                        type="text"
                        name="name"
                        id="name"
                        required
                        defaultValue={user?.displayName}
                        placeholder="Enter Your Name"
                        className="w-full px-8 py-3 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-gray-900"
                      />
                    </div>

                    <div>
                      <input
                        {...register("email")}
                        type="email"
                        name="email"
                        id="email"
                        required
                        readOnly
                        defaultValue={user?.email}
                        placeholder="Enter Your Email"
                        className="w-full pl-4 py-3 drop-shadow-xl border-2 my-2 rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                        data-temp-mail-org="0"
                      />
                    </div>
                    <div>
                      <input
                        {...register("number")}
                        type="number"
                        name="number"
                        id="number"
                        required
                        placeholder="Enter Phone Number"
                        className="w-full pl-4 py-3 drop-shadow-xl border-2 my-2 rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                        data-temp-mail-org="0"
                      />
                    </div>
                    <div>
                      <input
                        {...register("address")}
                        type="text"
                        name="address"
                        id="address"
                        required
                        placeholder="Enter Delivery Address"
                        className="w-full pl-4 py-3 drop-shadow-xl border-2 my-2 rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                        data-temp-mail-org="0"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button className="text-center ml-2 px-4 bg-[#E11D48] text-white uppercase py-2 rounded-lg my-3">
                      Order Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
