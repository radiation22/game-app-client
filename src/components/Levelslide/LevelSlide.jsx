import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import avt1 from "../../assets/level1.png";
import avt2 from "../../assets/level2.png";
import avt3 from "../../assets/lv3.png";
import avt4 from "../../assets/lv4.png";
import avt5 from "../../assets/lv5.png";
import Modal from "./Modal";
import "./level.css";
import { toast } from "react-toastify";

export default function LevelSlide() {
  const [dropdowns, setDropdowns] = useState({
    dropdown1: false,
  });
  const [event, setEvent] = useState({});
  const [level, setLevel] = useState(1);
  const [levels, setLevels] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://game-app-server-three.vercel.app/allLevel`
        );
        const data = await response.json();
        setLevels(data);
      } catch (error) {
        console.error("Error fetching follow data:", error);
      }
    };

    fetchData();
  }, [levels]);

  // const levels = [
  //   {
  //     no: 1,
  //     imgSrc: avt1,
  //     price: 100,
  //     name: "burger",
  //     event: {
  //       no1: "Happy Zone",
  //       no2: "Sad Zone",
  //       no3: "Fun World",
  //       no4: "Crazy Area",
  //       no5: "Action World",
  //     },
  //   },
  //   {
  //     no: 2,
  //     imgSrc: avt2,
  //     price: 200,
  //     name: "fizza",
  //     event: {
  //       no1: "Happy Zone",
  //       no2: "Sad Zone",
  //       no3: "Fun World",
  //       no4: "Crazy Area",
  //       no5: "Action World",
  //     },
  //     // event: [
  //     //   "Happy Zone",
  //     //   " Sad Zone",
  //     //   "Fun World",
  //     //   "Crazy Area",
  //     //   "Action World",
  //     // ],
  //   },
  //   {
  //     no: 3,
  //     imgSrc: avt3,
  //     price: 300,
  //     name: "chokolate",
  //     event: {
  //       no1: "Happy Zone",
  //       no2: "Sad Zone",
  //       no3: "Fun World",
  //       no4: "Crazy Area",
  //       no5: "Action World",
  //     },
  //     // event: [
  //     //   "Happy Zone",
  //     //   " Sad Zone",
  //     //   "Fun World",
  //     //   "Crazy Area",
  //     //   "Action World",
  //     // ],
  //   },
  //   {
  //     no: 4,
  //     imgSrc: avt4,
  //     price: 400,
  //     name: "box",
  //     event: {
  //       no1: "Happy Zone",
  //       no2: "Sad Zone",
  //       no3: "Fun World",
  //       no4: "Crazy Area",
  //       no5: "Action World",
  //     },
  //   },
  //   {
  //     no: 5,
  //     imgSrc: avt5,
  //     price: 100,
  //     name: "burger",
  //     event: {
  //       no1: "Happy Zone",
  //       no2: "Sad Zone",
  //       no3: "Fun World",
  //       no4: "Crazy Area",
  //       no5: "Action World",
  //     },
  //   },
  //   {
  //     no: 6,
  //     imgSrc: avt1,
  //     price: 100,
  //     name: "fizza",
  //     event: {
  //       no1: "Happy Zone",
  //       no2: "Sad Zone",
  //       no3: "Fun World",
  //       no4: "Crazy Area",
  //       no5: "Action World",
  //     },
  //   },
  //   {
  //     no: 7,
  //     imgSrc: avt2,
  //     price: 100,
  //     name: "burger",
  //     event: {
  //       no1: "Happy Zone",
  //       no2: "Sad Zone",
  //       no3: "Fun World",
  //       no4: "Crazy Area",
  //       no5: "Action World",
  //     },
  //     // event:[
  //     //   {Event1:"Happy Zone",Activity: }
  //     // ]
  //   },
  //   {
  //     no: 8,
  //     imgSrc: avt1,
  //     price: 100,
  //     name: "fizza",
  //     event: {
  //       no1: "Happy Zone",
  //       no2: "Sad Zone",
  //       no3: "Fun World",
  //       no4: "Crazy Area",
  //       no5: "Action World",
  //     },
  //   },
  //   {
  //     no: 9,
  //     imgSrc: avt2,
  //     price: 100,
  //     name: "chokolate",
  //     event: {
  //       no1: "Happy Zone",
  //       no2: "Sad Zone",
  //       no3: "Fun World",
  //       no4: "Crazy Area",
  //       no5: "Action World",
  //     },
  //   },
  //   {
  //     imgSrc: avt3,
  //     price: 100,
  //     name: "box",
  //     event: {
  //       no1: "Happy Zone",
  //       no2: "Sad Zone",
  //       no3: "Fun World",
  //       no4: "Crazy Area",
  //       no5: "Action World",
  //     },
  //   },
  // ];

  // Toggle a specific dropdown by key
  const toggleDropdown = (key, event, price) => {
    setEvent(event);
    setPrice(price);
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [key]: !prevDropdowns[key],
    }));
  };

  const handleDisabledClick = () => {
    toast.error(`Complete level ${level} First`);
  };

  return (
    <>
      <div className="left-0 bg-gradient-to-r border border-white  from-[#B4275C] to-[#492040] w-[36%]  overflow-hidden rounded-full ">
        <Swiper
          slidesPerView={2}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper px-3"
        >
          {levels.map((currentLevel, idx) => (
            <SwiperSlide key={idx}>
              <div className="py-1 " style={{ position: "relative" }}>
                <img
                  onClick={
                    level >= idx + 1
                      ? () =>
                          toggleDropdown(
                            "dropdown1",
                            currentLevel.zone,
                            currentLevel.price
                          )
                      : handleDisabledClick
                  }
                  className={`h-8 w-8 ${level < idx + 1 ? "disabled" : ""}`}
                  src={currentLevel?.imageUrl}
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="">
        {dropdowns.dropdown1 && <Modal event={event} price={price}></Modal>}
      </div>
    </>
  );
}
