import React, { useContext, useState } from "react";
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
import buyTop from "../../assets/buytop.png";
import back from "../../assets/buybg.png";
import orderbg from "../../assets/orderbg.png";
import { AuthContext } from "../context/AuthProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Buy = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [item, setItem] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
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
    <div
      style={{
        backgroundImage: `url(${back})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className=""
    >
      <div>
        <img src={buyTop} alt="" />
      </div>

      <div className="grid my-10 grid-cols-3 gap-3 mx-4">
        {foods.map((food, idx) => (
          <div>
            <div
              style={{
                backgroundImage:
                  "linear-gradient(#046BA2,#0A1B38,#0A1B38,#76673D)",
                borderRadius: "25px 0px 25px 0px",
              }}
              className="py-5 border-2 border-amber-700 shadow-2xl"
              key={idx}
            >
              <div className="text-white flex flex-col  items-center justify-between  px-3 ">
                <img className="h-16" src={food.imgSrc} alt="" />
                <p className="text-[10px]">{food.name}</p>
                <hr className="bg-purple-500 h-[1px]" />
                <p className=" font-bold">{food.price}tk</p>
              </div>
            </div>
            <div
              onClick={() => openModal(food.imgSrc, food)}
              className="text-center  mt-[-15px]"
            >
              <button className="bg-[#FAD466]  rounded-full text-[12px] text-center font-bold uppercase px-2 py-1">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex  items-center justify-center z-50">
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
                      className="h-16 w-16 my-2 rounded-full mx-auto"
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
                        className="w-full bg-gradient-to-r from-[#07375D] to-[#C19A43] px-8 py-3 drop-shadow-xl border-2 rounded-full border-[#54B89C] focus:outline-green-500 text-white"
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
                        className="w-full pl-4 bg-gradient-to-r from-[#07375D] to-[#C19A43] py-3 drop-shadow-xl border-2 my-2 rounded-full  border-[#54B89C] focus:outline-green-500  text-white"
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
                        className="bg-gradient-to-r from-[#07375D] to-[#C19A43] w-full pl-4 py-3 drop-shadow-xl border-2  rounded-full  border-[#54B89C] focus:outline-green-500  text-white"
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
                        className="bg-gradient-to-r from-[#07375D] to-[#C19A43] w-full pl-4 py-3 drop-shadow-xl border-2 my-2 rounded-full  border-[#54B89C] focus:outline-green-500  text-white"
                        data-temp-mail-org="0"
                      />
                    </div>

                    <div className="text-center">
                      <button className="text-center border w-full bg-gradient-to-r from-[#C81D5F] to-[#151B3B] text-white uppercase py-3 rounded-full my-3">
                        Order Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;
