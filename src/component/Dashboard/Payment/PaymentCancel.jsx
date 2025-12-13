import { FaTimesCircle } from "react-icons/fa";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center animate-fadeIn">
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />

        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Canceled
        </h2>

        <p className="text-gray-600 mb-6">
          Your transaction was canceled. No payment was completed.
        </p>

        <button className="w-full bg-red-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-red-700 transition">
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
