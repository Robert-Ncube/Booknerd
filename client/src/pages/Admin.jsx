import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../redux/features/OrdersSlice";

const AdminOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>All Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h3>Order #{order._id}</h3>
          <p>User: {order.username}</p>
          <p>Total: ${order.totalPrice}</p>
          <div className="order-books">
            {order.books.map((bookItem) => (
              <div key={bookItem._id} className="book-item">
                <img
                  src={bookItem.bookId?.image}
                  alt={bookItem.bookId?.title}
                />
                <div>
                  <h4>{bookItem.bookId?.title || "Deleted Book"}</h4>
                  <p>Quantity: {bookItem.quantity}</p>
                  <p>Price: ${bookItem.bookId?.newPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
