import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByEmail } from "../redux/features/OrdersSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdError } from "react-icons/md";

const Orders = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const {
    userOrders: orders,
    loading,
    error,
  } = useSelector((state) => state.orders);

  const email = currentUser?.email;

  useEffect(() => {
    if (email) {
      dispatch(getOrdersByEmail(email));
    }
  }, [dispatch, email]);

  console.log("orders:", orders);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-4">
        <AiOutlineLoading3Quarters className="text-5xl animate-spin" />
        <h2 className="font-rubik text-sm ">Loading</h2>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-4">
        <MdError size={36} className="text-red-600" />
        <h2 className="font-rubik font-semibold text-red-600">
          Error getting orders data...
        </h2>
      </div>
    );

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found!</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-4 p-2 items-center justify-center">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="border-b mb-4 pb-4 shadow-sm shadow-black rounded-md p-4"
              >
                <p className="p-1 border-2 border-secondary text-slate-800 font-bold w-10 rounded mb-1">
                  # {index + 1}
                </p>
                <h2 className="text-gray-600">
                  Customer:{" "}
                  <span className="font-bold text-xl">{order.username}</span>
                </h2>
                <p className="text-gray-600">Email: {order.email}</p>
                <p className="text-gray-600">Phone: {order.phone}</p>
                <p className="text-gray-600">
                  Total Price: ${order.totalPrice}
                </p>
                <div className="flex flex-col py-2 items-start justify-between">
                  <p className="text-gray-600">
                    Books Purchased: {order.books.length}
                  </p>
                  <p className=" text-gray-600">
                    Order Status:
                    <span className="font-bold border border-slate-400 p-1 mx-1 text-blue-600 capitalize">
                      {" "}
                      {order.status}
                    </span>
                  </p>
                  <div className="flex gap-2 py-2">
                    <button className="text-sm font-medium bg-tprimary py-1 px-2 rounded-lg text-white hover:bg-gray-200">
                      View Details
                    </button>
                    <button className="text-sm font-medium border border-slate-800 py-1 px-2 rounded-lg text-gray-600 hover:bg-gray-200">
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
