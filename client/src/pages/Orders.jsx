import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByEmail } from "../redux/features/OrdersSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdError } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Orders = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const {
    userOrders: orders,
    loading,
    error,
  } = useSelector((state) => state.orders);

  const [viewDetails, setViewDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const email = currentUser?.email;

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-gray-200";
      case "confirmed":
        return "text-green-600";
      case "shipping":
        return "text-yellow-400";
      case "delivered":
        return "text-blue-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-200";
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setViewDetails(true);
  };

  const handleCloseModal = () => {
    setViewDetails(false);
    setSelectedOrder(null);
  };

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
                    <span
                      className={`font-bold border border-slate-400 p-1 mx-1 capitalize ${statusColor(
                        order.status
                      )}`}
                    >
                      {" "}
                      {order.status}
                    </span>
                  </p>
                  <div className="flex gap-2 py-2">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="text-sm font-medium bg-tprimary py-1 px-2 rounded-lg text-white hover:bg-gray-200"
                    >
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

      {viewDetails && selectedOrder && (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-50 flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              <IoMdClose size={24} />
            </button>

            <OrderDetails onClose={handleCloseModal} order={selectedOrder} />
          </div>
        </div>
      )}
    </div>
  );
};

const OrderDetails = ({ order }) => {
  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-gray-200";
      case "confirmed":
        return "text-green-600";
      case "shipping":
        return "text-yellow-400";
      case "delivered":
        return "text-blue-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-200";
    }
  };

  return (
    <div className="overflow-y-auto h-80 md:h-92">
      <h2 className="text-xl font-bold mb-4 border-b-2">Order Details</h2>
      <p className="mb-2 font-semibold border border-slate-400 p-2 my-2">
        <strong>Order ID:</strong> #{order._id}
      </p>
      <div className="border p-2 border-slate-400 my-2">
        <p className="mb-2">
          <strong>Customer:</strong> {order.username}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {order.email}
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> {order.phone}
        </p>
        <p className="mb-2">
          <strong>Total Price:</strong> ${order.totalPrice}
        </p>
        <p className={` mb-2 capitalize ${statusColor(order.status)}`}>
          <strong className="text-black">Status:</strong> {order.status}
        </p>
      </div>
      <h3 className="text-lg font-semibold mb-2">Books Purchased:</h3>
      <ul className="list-disc list-inside">
        {order.books.map((book, index) => (
          <li key={index} className="my-2">
            <span className="font-semibold font-rubik">
              {book.bookId.title}
            </span>
            :{" "}
            <span className="text-green-600 border border-slate-400 p-1">
              {book.quantity} copies
            </span>{" "}
            - ${book.bookId.newPrice} each
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
