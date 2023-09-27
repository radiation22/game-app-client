import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import userPlus from "../../assets/userplus.png";
import question from "../../assets/question.png";
import bg from "../../assets/signbg.jpg";
import logo from "../../assets/logo.png";
import icon from "../../assets/leftarrow.png";
import { toast } from "react-toastify";
import { FaAngleRight, FaEdit } from "react-icons/fa";
import edit from "../../assets/edit.png";

const DriverProfileb = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loginError, setLoginError] = useState("");
  const { user } = useContext(AuthContext);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        width: "100%",
        backgroundRepeat: "no-repeat",
        height: "500px",
      }}
      className=""
    >
      <div>
        <Link to="/dashboardb">
          <img className="h-12 pt-4 pl-4" src={icon} alt="" />
        </Link>
      </div>

      <div className="flex justify-center w-[85%] mx-auto pt-20 items-center">
        <div className="flex w-full flex-col pb-6 px-10 shadow  bg-white rounded-[25px] sm:p-10  text-gray-900">
          {/* Loading indicator */}
          <img
            className="h-20 w-20 bg-white mt-[-30px] mx-auto border shadow-xl p-2 rounded-full"
            src={user?.photoURL}
            alt=""
          />
          <p className="text-center text-[#110808] font-bold mt-2">
            {user?.displayName}
          </p>
          {isLoading && <div>Loading...</div>}

          {!isLoading && (
            <form
              noValidate=""
              action=""
              className="space-y-6 mt-4 ng-untouched ng-pristine ng-valid"
            >
              <div className="relative">
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
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FaEdit className="text-[#A7B4C2] mr-3 text-xl"></FaEdit>
                </span>
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
                  className="w-full pl-4 py-3 drop-shadow-xl border-2 rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="Password"
                  className="w-full pl-4 py-3 drop-shadow-xl border-2 rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-900"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FaEdit className="text-[#A7B4C2] mr-3 text-xl"></FaEdit>
                </span>
              </div>

              <div>
                <input
                  type="file"
                  accept="image/*"
                  name="photo"
                  id="photo"
                  placeholder="Profile Photo"
                  onChange={handleFileChange}
                  className="w-full px-3 py-3 drop-shadow-xl  border-2 file:bg-[#9DDE2A] file:rounded-full file:border-0 file:text-white file:px-2 rounded-full  border-[#54B89C] focus:outline-green-500  text-gray-400"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full px-8 uppercase py-3 font-semibold drop-shadow-xl rounded-full bg-[#9DDE2A] hover:text-white text-gray-100"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="bg-white mx-6 rounded-full py-3 px-5 mt-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <img className="h-6" src={userPlus} alt="" />
            <p>Invite a friend</p>
          </div>
          <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
        </div>
      </div>
      <div className="bg-white mx-6 rounded-full py-3 px-5 mt-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <img className="h-6" src={question} alt="" />
            <p>Help</p>
          </div>
          <FaAngleRight className="text-[#92A1B3]"></FaAngleRight>
        </div>
      </div>
    </div>
  );
};

export default DriverProfileb;
