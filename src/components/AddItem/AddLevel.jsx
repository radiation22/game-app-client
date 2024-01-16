import React, { useContext, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddLevel = () => {
  const { handleSubmit, control, reset, register } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [deliveryChargeOption, setDeliveryChargeOption] = useState("free");
  const [selectLevel, setSelectLevel] = useState("1");
  const navigate = useNavigate();

  const uploadImageToImgBB = async (imageFile) => {
    try {
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append("image", imageFile);

      // Your ImgBB API key
      const apiKey = "8ddaa6c8df804bd79444e3f5ea2c7fd5";

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
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = async (data) => {
    const imageUrl = await uploadImageToImgBB(selectedFile);
    console.log(data);
    const activity = [data.title];
    const zone = [data.zone];
    const price = data.price;

    const product = {
      selectLevel,
      activity,
      zone,
      price,
      imageUrl,
      date: new Date().toLocaleDateString(),
    };

    fetch("https://game-app-server-three.vercel.app/addLevel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Added Successfully");
          navigate("/");
        }
      });
  };
  return (
    <div>
      <h2 className="text-center text-white text-3xl font-bold">Add Levels</h2>
      <div>
        <div className="container mx-auto p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="deliveryChargeOption"
                className="block font-medium text-white"
              >
                Select Level No
              </label>
              <select
                id="deliveryChargeOption"
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                value={selectLevel}
                onChange={(e) => setSelectLevel(e.target.value)}
              >
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="4">Level 4</option>
                <option value="5">Level 5</option>
                <option value="6">Level 6</option>
                <option value="7">Level 7</option>
                <option value="8">Level 8</option>
                <option value="9">Level 9</option>
                <option value="10">Level 10</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium text-white">
                Zone Name
              </label>
              <Controller
                name="zone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    required
                    {...field}
                    type="text"
                    id="title"
                    className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Enter title"
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium text-white">
                Activity Name
              </label>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    required
                    {...field}
                    type="text"
                    id="title"
                    className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Enter title"
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block font-medium text-white">
                Total Income
              </label>
              <Controller
                name="price"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    required
                    {...field}
                    type="number"
                    id="price"
                    className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Enter price"
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="photo" className="block font-medium text-white">
                Photo
              </label>
              <Controller
                name="photo"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <input
                    required
                    {...field}
                    type="file"
                    id="photo"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                  />
                )}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
              >
                Add Level
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLevel;
