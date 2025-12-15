import React, { useState } from "react";
import LoadingSpinner from "../../../component/Shared/LoadingSpinner";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PayModal from "../../../component/Modal/PayModal";

const MyOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`orders_user_${user?.email}`],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-orders/${user?.email}`
      );
      return res.data;
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: async (id) =>
      axios.patch(`${import.meta.env.VITE_API_URL}/cancel-order/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries([`orders_user_${user?.email}`]),
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">Failed to load orders.</p>
    );

  if (orders.length === 0)
    return (
      <p className="text-center text-gray-500 py-10">
        You have no orders yet 📭
      </p>
    );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📦 My Orders</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
              <th className="px-6 py-4 text-left">Book</th>
              <th className="px-6 py-4 text-left">Order Date</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={order.image}
                    alt={order.bookName}
                    className="w-14 h-14 rounded-xl object-cover shadow-sm"
                  />
                  <span className="font-medium text-gray-800">
                    {order.bookName}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                      ${
                        order.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  {order.status === "cancelled" && (
                    <span className="text-gray-400 text-sm">Cancelled</span>
                  )}
                  {order.status === "pending" &&
                    order.paymentStatus !== "paid" && (
                      <>
                        <button
                          onClick={() => cancelOrderMutation.mutate(order._id)}
                          className="px-4 py-1.5 rounded-full text-sm bg-red-500 text-white hover:bg-red-600 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsModalOpen(true);
                          }}
                          className="px-4 py-1.5 rounded-full text-sm bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                          Pay Now
                        </button>
                      </>
                    )}
                  {order.status === "pending" &&
                    order.paymentStatus === "paid" && (
                      <span className="px-4 py-1.5 rounded-full text-sm bg-emerald-100 text-emerald-700 font-semibold">
                        Paid
                      </span>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-xl p-4 flex flex-col gap-3 hover:shadow-2xl transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={order.image}
                alt={order.bookName}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">
                  {order.bookName}
                </h4>
                <p className="text-gray-500 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
                ${
                  order.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }
                `}
              >
                {order.status}
              </span>

              <div className="flex gap-2">
                {order.status === "pending" &&
                  order.paymentStatus !== "paid" && (
                    <>
                      <button
                        onClick={() => cancelOrderMutation.mutate(order._id)}
                        className="px-3 py-1 rounded-full text-sm bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        }}
                        className="px-3 py-1 rounded-full text-sm bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        Pay Now
                      </button>
                    </>
                  )}
                {order.status === "pending" &&
                  order.paymentStatus === "paid" && (
                    <span className="px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700 font-semibold">
                      Paid
                    </span>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedOrder && (
        <PayModal order={selectedOrder} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default MyOrders;
