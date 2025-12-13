import { FaCheckCircle } from "react-icons/fa";
import { Link, useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center animate-fadeIn">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>
        <Link to="/dashboard/my-orders">
          <button className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
