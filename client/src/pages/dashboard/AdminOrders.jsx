import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdError } from "react-icons/md";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../redux/features/OrdersSlice";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [viewDetails, setViewDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setViewDetails(true);
  };

  const handleCloseModal = () => {
    setViewDetails(false);
    setSelectedOrder(null);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-4">
        <AiOutlineLoading3Quarters className="text-5xl animate-spin" />
        <h2 className="font-rubik text-sm">Loading</h2>
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
                className="border-b w-full h-full mb-4 pb-4 shadow-sm shadow-black rounded-md p-4"
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
                  <p className="text-gray-600">
                    Order Status:
                    <span className="font-bold border border-slate-400 p-1 mx-1 text-blue-600 capitalize">
                      {order.status}
                    </span>
                  </p>
                  <div className="flex gap-2 py-2">
                    <button
                      title="book details"
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

            <OrderDetails order={selectedOrder} />
          </div>
        </div>
      )}
    </div>
  );
};

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-gray-200";
      case "confirmed":
        return "bg-green-600";
      case "shipping":
        return "bg-yellow-400";
      case "delivered":
        return "bg-blue-600";
      default:
        return "bg-gray-200";
    }
  };

  const handleStatusChange = async (event) => {
    event.preventDefault();
    const newStatus = event.target.value;
    try {
      const result = await dispatch(
        updateOrderStatus({ orderId: order._id, status: newStatus })
      );
      if (result.payload) {
        toast.success("Order status updated successfully!");
        dispatch(getAllOrders());
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="overflow-y-auto">
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
        <p className="mb-4">
          <strong>Status:</strong>
          <select
            value={order.status}
            onChange={handleStatusChange}
            className={`w-full text-sm font-medium border border-slate-800 py-1 px-2 rounded-lg text-gray-600 hover:bg-gray-200 ${statusColor(
              order.status
            )}`}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipping">Shipping</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
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
