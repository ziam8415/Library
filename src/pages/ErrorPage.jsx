import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-900 to-black text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl text-center"
      >
        {/* Floating 404 */}
        <motion.h1
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[120px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
        >
          404
        </motion.h1>

        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>

        <p className="text-gray-300 mb-8">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition shadow-lg"
          >
            Go Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 transition"
          >
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
