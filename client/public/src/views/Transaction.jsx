import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import gearLoad from "../assets/Pulse-1s-284px.svg";
import { baseUrl } from "../../api/baseUrl";

export default function Transaction() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchOrders() {
    try {
      setLoading(true);
      const { data } = await axios({
        method: "GET",
        url: baseUrl + `/payment`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setOrders(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders.length == 0) {
    return (
      <div className="flex flex-grow flex-col items-center">
        <b className="text-4xl text-accent mt-20"> You have no transaction</b>
        <div className="divider px-80"></div>
        <div className="divider px-80"></div>
      </div>
    );
  }

  return (
    <>
      <div id="PAGE-HOME" className="p-3 flex-grow">
        {loading ? (
          <div className="mt-32 flex justify-center items-center">
            <img src={gearLoad} />
          </div>
        ) : (
          <div className="overflow-x-auto p-10 flex justify-center">
            <table className="table-auto border-collapse border border-gray-300 w-full max-w-4xl text-center">
              {/* head */}
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">No</th>
                  <th className="border border-gray-300 p-2">Order ID</th>
                  <th className="border border-gray-300 p-2">Amount</th>
                  <th className="border border-gray-300 p-2">Status</th>
                  <th className="border border-gray-300 p-2">Paid Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr className="hover:bg-gray-100" key={order.id}>
                    <td className="border border-gray-300 p-2">{idx + 1}</td>
                    <td className="border border-gray-300 p-2">{order.orderId}</td>
                    <td className="border border-gray-300 p-2">{order.amount}</td>
                    <td className="border border-gray-300 p-2">{order.status}</td>
                    <td className="border border-gray-300 p-2">{order.paidDate ? new Date(order.paidDate).toLocaleDateString("id") : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
