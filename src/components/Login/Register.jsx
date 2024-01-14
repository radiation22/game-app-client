import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

import bg from "../../assets/signbg.jpg";
import logo from "../../assets/avt6.png";
import icon from "../../assets/leftarrow.png";
import { toast } from "react-toastify";
import { FaAngleRight, FaEnvelope, FaLock } from "react-icons/fa";
import userPlus from "../../assets/userplus.png";
import question from "../../assets/question.png";
import Loader from "../Loader/Loader"; // Import the Loader component

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's Sign Up or Sign In
  const [selectedFile, setSelectedFile] = useState(null); // Track the selected image file
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { createUser, updateUserProfile, signIn } = useContext(AuthContext);
  const [selectedCity, setSelectedCity] = useState("");
  const [error, setError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length === 11) {
      setPhoneNumberError(""); // No error
      return true;
    } else {
      setPhoneNumberError("Phone number must be 11 characters");
      return false;
    }
  };

  const handleCityChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === cities[0].value) {
      setSelectedCity(selectedValue);
    } else {
      // Show a pop-up or handle the error here
      toast.error("Not available now In your City. We are Coming soon.");
    }
  };

  const uploadImageToImgBB = async (imageFile) => {
    try {
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append("image", imageFile);

      // Your ImgBB API key
      const apiKey = "8c45a65277afef5acc89d1665e868e9c";

      // Make a POST request to the ImgBB API endpoint
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      // Check if the request was successful (status code 200)
      if (response.ok) {
        const data = await response.json();
        // The uploaded image URL is available in data.data.url
        return data.data.url;
      } else {
        // Handle the error if the request fails
        throw new Error("Image upload failed");
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      setError("Error uploading image:", error);
      throw error;
    }
  };

  const handleSignUp = async (data) => {
    setIsSignUpLoading(true); // Set loading to true when starting the sign-up process
    try {
      const imageUrl = await uploadImageToImgBB(selectedFile);

      const result = await createUser(data.email, data.password);
      const user = result.user;

      await handleUpdateUser(data.name, data.email, imageUrl, selectedCity);
      // saveUser(data.name, data.email, 0, phoneNumber);

      toast.success("Successfully registered");
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSignUpLoading(false); // Set loading to false when the sign-up process is complete
    }
  };

  // const saveUser = (name, email, balance, phoneNumber) => {
  //   const user = { name, email, balance, phoneNumber };
  //   fetch("https://e-wallet-server.vercel.app/addUsers", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (loading) {
  //         return <Loader></Loader>;
  //       }
  //       setCreatedUserEmail(email);
  //     });
  // };

  const handleUpdateUser = async (name, email, photoURL, city) => {
    const profile = {
      displayName: name,
      email,
      photoURL,
      city,
      // Include the uploaded image URL in the user's profile
    };

    try {
      await updateUserProfile(profile);
    } catch (error) {
      setError("Error updating user profile:", error);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div
      // style={{
      //   backgroundImage: `url(${bg})`,
      //   backgroundSize: "cover",
      //   width: "100%",
      //   backgroundRepeat: "no-repeat",
      //   height: "500px",
      // }}
      className="mb-20 pb-20"
    >
      {/* <Link to="/welcome">
        <div>
          <img className="h-12 pt-4 pl-4" src={icon} alt="" />
        </div>
      </Link> */}
      <div className="flex justify-center py-3 ">
        <img className="h-16 rounded-full" src={logo} alt="" />
      </div>
      <div className="flex justify-center w-[85%] mx-auto  items-center">
        <div
          style={{
            backgroundImage: "linear-gradient(#262642, #17ACA7)",
          }}
          className="flex w-full flex-col py-10 px-8 shadow   rounded-[25px] sm:p-10  text-gray-900"
        >
          {/* Loading indicator */}
          {isSignUpLoading && <Loader />}

          {/* Form */}
          {!isSignUpLoading && (
            <form
              onSubmit={handleSubmit(handleSignUp)}
              noValidate=""
              action=""
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div>
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Enter Your Name"
                  className="w-full pl-10 py-3 drop-shadow-xl border rounded-full bg-gradient-to-r from-[#08355C] via-[#0B1C38] to-[#9E8340] border-amber-600 focus:outline-green-500 text-white"
                />
              </div>

              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder=" Enter Your Email"
                  className="w-full pl-10 py-3 drop-shadow-xl border rounded-full bg-gradient-to-r from-[#08355C] via-[#0B1C38] to-[#9E8340] border-amber-600 focus:outline-green-500 text-white"
                  data-temp-mail-org="0"
                />

                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <FaEnvelope className="text-[#A7B4C2] ml-3"></FaEnvelope>
                </span>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder=" Password"
                  className="w-full pl-10 py-3 drop-shadow-xl border rounded-full bg-gradient-to-r from-[#08355C] via-[#0B1C38] to-[#9E8340] border-amber-600 focus:outline-green-500 text-white"
                />

                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <FaLock className="text-[#A7B4C2] ml-3"></FaLock>
                </span>
              </div>
              <div>
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                  placeholder="Enter Your Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={() => validatePhoneNumber(phoneNumber)}
                  className={`w-full pl-10 py-3 drop-shadow-xl border rounded-full bg-gradient-to-r from-[#08355C] via-[#0B1C38] to-[#9E8340] border-amber-600 focus:outline-green-500 text-white ${
                    phoneNumberError ? "border-red-500" : ""
                  }`}
                />
                {phoneNumberError && (
                  <p className="text-red-500">{phoneNumberError}</p>
                )}
              </div>

              <div>
                <input
                  type="file"
                  accept="image/*"
                  name="photo"
                  id="photo"
                  placeholder="Profile Photo"
                  onChange={handleFileChange}
                  className="w-full bg-gradient-to-r from-[#08355C] via-[#0B1C38] px-3 py-3 drop-shadow-xl  border-2 file:bg-[#C1205C] file:rounded-full file:border-0 file:text-white file:px-2 rounded-full  border-amber-600 focus:outline-green-500  text-gray-400"
                />
              </div>
              <div>
                <p className="text-red-600">{error}</p>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full border px-8 py-3 font-semibold drop-shadow-xl rounded-full bg-gradient-to-r from-[#C81D5F] to-[#151B3B] hover:text-white text-gray-100"
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}

          {/* Error message */}

          <div className="flex items-cen	pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <p className="px-6 text-sm text-center text-white">
            <i>"Already have an account? "</i>
            <Link to="/login">
              <button className="hover:underline  font-bold text-black">
                Sign In
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
