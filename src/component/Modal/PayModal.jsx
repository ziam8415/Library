import axios from "axios";
import React from "react";

const PayModal = ({ order, onClose }) => {
  if (!order) return null;

  const handlePayment = async () => {
    const paymentInfo = {
      price: order.price,
      orderId: order._id,
      customer_email: order.customerEmail,
      bookName: order.bookName,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    );

    //console.log(res.data.url);

    window.location.assign(res.data.url); // redirect to Stripe
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Confirm Your Payment
        </h2>

        {/* Order Info */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={order.image}
            alt={order.bookName}
            className="w-20 h-20 rounded object-cover border"
          />

          <div>
            <h3 className="font-medium text-lg">{order.bookName}</h3>
            <p className="text-gray-600 text-sm">Order ID: {order._id}</p>
          </div>
        </div>

        {/* Price Section */}
        <div className="bg-gray-100 p-3 rounded-md mb-4">
          <p className="text-gray-600">Price</p>
          <p className="text-xl font-bold text-blue-600">৳ {order.price}</p>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg font-semibold"
        >
          Pay Now
        </button>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="w-full mt-3 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PayModal;
