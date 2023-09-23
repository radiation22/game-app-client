import React, { useContext, useEffect, useState } from "react";

const ManagerDashboard = () => {
  return (
    <div className="w-full">
      <table className="w-[95%] mx-auto  border-collapse border">
        <caption className="text-lg font-bold mb-4">Manager DashBoard</caption>
        <thead>
          <tr>
            <th className=" border p-2">Trip</th>
            <th className=" border p-2">Bus No</th>
            <th className=" border p-2">Status</th>
            <th className=" border p-2">Confirm</th>
          </tr>
        </thead>
        {/* <tbody>
          {tickets?.map((ticket) => (
            <tr>
              <td className="border p-2">01</td>
              <td className="border p-2">{ticket?.startPoint}</td>
              <td className="border p-2">{ticket.destination}</td>
              <td className="border p-2">{}</td>
              <td className="border p-2">{ticket.totalCost} tk</td>
              <td className="border p-2">
                <button
                  //   onClick={() => confirmTicket(ticket?._id)}
                  className="bg-black text-white px-3 py-1 rounded"
                >
                  {ticket.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
  );
};

export default ManagerDashboard;
