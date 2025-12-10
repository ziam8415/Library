import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../component/Shared/LoadingSpinner";
import toast from "react-hot-toast";

const Orders = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch orders where the logged-in librarian is the seller
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`orders_${user?.email}`],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-books-orders/${user?.email}`
      );
      return res.data;
    },
  });

  // Mutation to update order status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/orders/${id}`,
        { status }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Order status updated!");
      queryClient.invalidateQueries([`orders_${user?.email}`]);
    },
    onError: () => toast.error("Failed to update status"),
  });

  // Mutation to cancel order
  const cancelOrderMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${import.meta.env.VITE_API_URL}/orders/${id}`);
    },
    onSuccess: () => {
      toast.success("Order cancelled!");
      queryClient.invalidateQueries([`orders_${user?.email}`]);
    },
    onError: () => toast.error("Failed to cancel order"),
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error loading orders.</p>;

  const handleStatusChange = (orderId, newStatus) => {
    updateStatusMutation.mutate({ id: orderId, status: newStatus });
  };

  const handleCancel = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      cancelOrderMutation.mutate(orderId);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600">
                Image
              </th>
              <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600">
                Book Name
              </th>
              <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600">
                Customer
              </th>
              <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600">
                Price
              </th>
              <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="px-5 py-4">
                  <img
                    src={order.image}
                    alt={order.bookName}
                    className="w-16 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-5 py-4">{order.bookName}</td>
                <td className="px-5 py-4">
                  {order.customerName} <br />
                  <span className="text-gray-500 text-sm">
                    {order.customerEmail}
                  </span>
                </td>
                <td className="px-5 py-4">${order.price}</td>
                <td className="px-5 py-4">
                  <select
                    className="border px-2 py-1 rounded"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
