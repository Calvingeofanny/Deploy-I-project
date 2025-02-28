import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { rupiah } from "../helpers/rupiah";
import Swal from "sweetalert2";
import { baseUrl } from "../../api/baseUrl";

export default function Purchase() {
  const { id } = useParams();
  const [book, setBook] = useState({});

  const [loading, setLoading] = useState(true);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const { data } = await axios({
        method: "GET",
        url: baseUrl + `/pub/${id}`,
      });

      setBook(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`,
    },
  };

  async function handleBuy() {
    try {
      const { data } = await axios.get(`${baseUrl}/payment/midtrans`, config);

      console.log(data, "kiko");

      window.snap.pay(data.transaction_token, {
        onSuccess: async function () {
          console.log("Payment success, updating order status...");
          const response = await axios.patch(
            `${baseUrl}/payment/status`,
            { orderId: data.orderId },
            config
          );
          console.log("Order status update response:", response.data);
          Swal.fire({
            icon: "success",
            title: response.data.message,
          });
        },
        onPending: function () {
          Swal.fire({
            icon: "warning",
            title: "Waiting your payment!",
          });
        },
        onError: function () {
          Swal.fire({
            icon: "error",
            title: "Payment failed!",
          });
        },
        onClose: function () {
          Swal.fire({
            icon: "question",
            title: "Cancel payment?",
          });
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <>
            <div className="col-span-full text-center py-8">Loading...</div>
          </>
        ) : (
          <>
            {/* Book Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-start space-x-6">
                <img
                  src={book?.image}
                  alt={book?.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {book?.title}
                  </h1>
                  <p className="text-gray-600 mb-4">{book?.developer}</p>
                </div>
              </div>
            </div>

            {/* Proceed Button */}
            <div className="mt-8">
              <button
                onClick={handleBuy}
                type="submit"
                className="w-full cursor-pointer bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Buy
              </button>
            </div>
            {/* </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
          </>
        )}
      </div>
    </main>
  );
}
