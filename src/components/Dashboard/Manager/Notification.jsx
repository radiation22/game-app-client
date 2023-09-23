import React from "react";

const Notification = () => {
  return (
    <div>
      <div className="text-white text-center h-screen py-8 bg-[#951317]">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>[Manager]</p>
        <p className="text-xl mt-4">Good Afternoon Mr. Moslem</p>

        <div className="bg-[#FA0F11] space-y-3 mt-20 rounded-lg mx-4 my-5 text-white text-center p-5">
          <h1 className="text-lg uppercase">
            For this trip you have to Receive
          </h1>
          <h1 className="text-3xl font-bold">675 BDT</h1>
          <p>Total</p>
        </div>
        <hr className="mx-5 py-4" />
        <div className="space-y-3">
          <p className="text-lg">Summary for this trip</p>
          <div className="flex justify-around uppercase mt-5">
            <p className="border-l-4 ps-3 border-[#D3415B]">Total Passenger</p>
            <p>50</p>
          </div>
          <div className="flex justify-around uppercase">
            <p className="border-l-4 ps-3 border-[#D3415B]">
              Total Destination
            </p>
            <p>12</p>
          </div>
          <div className="flex justify-around uppercase">
            <p className="border-l-4 ps-3 border-[#D3415B]">Total Ticket</p>
            <p>40</p>
          </div>
        </div>
        <button className="px-4 bg-gradient-to-r from-red-600 to-red-600 uppercase py-2 rounded-lg my-10">
          Received From SUP-2
        </button>
      </div>
    </div>
  );
};

export default Notification;
