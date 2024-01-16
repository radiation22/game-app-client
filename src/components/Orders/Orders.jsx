import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const Orders = () => {
  const { user } = useContext(AuthContext);

  // const [orders, setOrders] = useState([]);

  // Define the query key
  const queryKey = ["orders"];

  // Use the useQuery hook to fetch data
  const { data: orders = [], refetch } = useQuery(queryKey, async () => {
    const url = `https://game-app-server-three.vercel.app/orders?email=${user?.email}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    // setOrders(data);
    return data;
  });

  return (
    <div>
      <h1 className="text-white text-center text-2xl py-4">
        All of your orders
      </h1>

      <div className="overflow-x-auto px-4">
        <table className="min-w-full bg-white rounded-xl">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Date </th>
              <th className="py-2 px-4 border-b">Food</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>

          {orders.map((order) => (
            <tbody key={order._id} className="text-center">
              <tr>
                <td className="py-2 px-4 border-b">John Doe</td>
                <td className="py-2 px-4 border-b">john@example.com</td>
                <td className="py-2 px-4 border-b">Admin</td>
                <td className="py-2 px-4 border-b">Admin</td>
                <td className="py-2 px-4 border-b">Admin</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                    Pending
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Orders;
