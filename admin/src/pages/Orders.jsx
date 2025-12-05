import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) fetchAllOrders();
  }, [token]);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch orders!");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order status updated!");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Orders</h2>

      {/* Loading State */}
      {loading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse border-2 p-5 rounded-md">
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* No Orders Found */}
      {!loading && orders.length === 0 && (
        <p className="text-center text-gray-500">No orders found.</p>
      )}

      {/* Orders List */}
      {!loading &&
        orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 p-5 rounded-md shadow-sm hover:shadow-md transition-all mb-4"
          >
            {/* Order Icon */}
            <img className="w-12 h-12" src={assets.parcel_icon} alt="Order" />

            {/* Order Details */}
            <div>
              {order.items.map((item, i) => (
                <p key={i} className="text-sm">
                  {item.name} x {item.quantity} <span>({item.size})</span>
                </p>
              ))}
              <p className="mt-3 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-gray-600">
                {order.address.street}, {order.address.city}
              </p>
              <p className="text-gray-600">
                {order.address.state}, {order.address.country},{" "}
                {order.address.zipcode}
              </p>
              <p className="text-gray-700">📞 {order.address.phone}</p>
            </div>

            {/* Payment & Date */}
            <div>
              <p className="text-sm">Items: {order.items.length}</p>
              <p className="text-gray-600">Method: {order.paymentMethod}</p>
              <p className="text-gray-600">
                Payment:{" "}
                <span
                  className={
                    order.payment
                      ? "text-green-600 font-semibold"
                      : "text-red-500 font-semibold"
                  }
                >
                  {order.payment ? "PAID" : "PENDING"}
                </span>
              </p>
              <p className="text-gray-600">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Price */}
            <p className="text-green-600 font-semibold">
              {currency}
              {order.amount}
            </p>

            {/* Order Status */}
            <select
              onChange={(e) => statusHandler(e, order._id)}
              className="p-2 text-sm border rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
              value={order.status}
            >
              <option value="ORDER PLACED">ORDER PLACED</option>
              <option value="PACKING">PACKING</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="OUT FOR DELIVERY">OUT FOR DELIVERY</option>
              <option value="DELIVERED">DELIVERED</option>
            </select>
          </div>
        ))}
    </div>
  );
};

export default Orders;
