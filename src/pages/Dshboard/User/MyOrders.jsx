import React from "react";
import LoadingSpinner from "../../../component/Shared/LoadingSpinner";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const MyOrders = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all orders of this user
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

  // Cancel order mutation
  const cancelOrderMutation = useMutation({
    mutationFn: async (id) => {
      return axios.patch(`${import.meta.env.VITE_API_URL}/cancel-order/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`orders_user_${user?.email}`]);
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error loading orders.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Book</th>
            <th className="p-3">Order Date</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="p-3 flex items-center gap-3">
                <img src={order.image} className="w-12 h-12 rounded" />
                {order.bookName}
              </td>

              <td className="p-3">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td className="p-3 capitalize">{order.status}</td>

              {/* ACTION BUTTONS */}
              <td className="p-3 text-center">
                {/* Cancel Button (only if pending) */}
                {order.status === "pending" && (
                  <button
                    onClick={() => cancelOrderMutation.mutate(order._id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md mr-2"
                  >
                    Cancel
                  </button>
                )}

                {/* Pay Now Button (only if pending) */}
                {order.status === "pending" && (
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                    Pay Now
                  </button>
                )}

                {/* When cancelled → show nothing */}
                {order.status === "cancelled" && (
                  <span className="text-gray-400">No actions</span>
                )}

                {/* When shipped/delivered → no cancel, but maybe show "Track" later */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
