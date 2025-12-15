import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../component/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiCheckCircle,
  FiTruck,
  FiXCircle,
  FiMoreVertical,
} from "react-icons/fi";

const Orders = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [expandedId, setExpandedId] = useState(null);

  /* ================= FETCH ORDERS ================= */
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-books-orders/${user?.email}`
      );
      return res.data;
    },
  });

  /* ================= UPDATE STATUS ================= */
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) =>
      axios.patch(`${import.meta.env.VITE_API_URL}/orders/${id}`, { status }),
    onSuccess: () => {
      toast.success("Order status updated");
      queryClient.invalidateQueries(["orders", user?.email]);
    },
  });

  /* ================= CANCEL ORDER ================= */
  const cancelOrderMutation = useMutation({
    mutationFn: async (id) =>
      axios.delete(`${import.meta.env.VITE_API_URL}/orders/${id}`),
    onSuccess: () => {
      toast.success("Order cancelled");
      queryClient.invalidateQueries(["orders", user?.email]);
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load orders.</p>;

  return (
    <div className="p-4 sm:p-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">📦 Orders</h2>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Book</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length ? (
              orders.map((order, idx) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={order.image}
                      alt={order.bookName}
                      className="w-12 h-16 rounded-lg object-cover shadow-sm"
                    />
                    <span className="font-medium text-gray-800 truncate max-w-[200px]">
                      {order.bookName}
                    </span>
                  </td>
                  <td className="px-4 py-3">{order.customerName}</td>
                  <td className="px-4 py-3 font-medium">${order.price}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatusMutation.mutate({
                          id: order._id,
                          status: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() =>
                        window.confirm("Cancel this order?") &&
                        cancelOrderMutation.mutate(order._id)
                      }
                      className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600 transition flex items-center gap-1"
                    >
                      <FiXCircle /> Cancel
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-gray-500 font-medium"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {orders.length ? (
          orders.map((order, idx) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() =>
                  setExpandedId(expandedId === order._id ? null : order._id)
                }
              >
                <div className="flex items-center gap-3">
                  <img
                    src={order.image}
                    alt={order.bookName}
                    className="w-14 h-16 rounded-lg object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 truncate">
                      {order.bookName}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {order.customerName}
                    </span>
                  </div>
                </div>

                <FiMoreVertical className="text-gray-400" />
              </div>

              <AnimatePresence>
                {expandedId === order._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4 space-y-2 text-sm"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">Price:</span> ${order.price}
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Email:</span>{" "}
                      {order.customerEmail}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatusMutation.mutate({
                            id: order._id,
                            status: e.target.value,
                          })
                        }
                        className="border px-2 py-1 rounded text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                    <button
                      onClick={() =>
                        window.confirm("Cancel this order?") &&
                        cancelOrderMutation.mutate(order._id)
                      }
                      className="w-full mt-2 bg-red-500 text-white rounded py-2 flex justify-center items-center gap-1 hover:bg-red-600 transition"
                    >
                      <FiXCircle /> Cancel Order
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-10 font-medium">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
