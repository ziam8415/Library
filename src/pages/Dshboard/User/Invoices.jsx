import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../component/Shared/LoadingSpinner";

const Invoices = () => {
  const { user } = useAuth();

  const {
    data: invoices = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["invoices", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/invoices/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">Failed to load invoices</p>
    );

  if (invoices.length === 0)
    return (
      <div className="text-center text-gray-500 py-10">
        No paid invoices found 📭
      </div>
    );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">💳 My Invoices</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="p-3 text-left">Book</th>
              <th className="p-3 text-left">Payment ID</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Paid On</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice._id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={invoice.image}
                      alt={invoice.bookName}
                      className="w-12 h-12 rounded-xl object-cover shadow-sm"
                    />
                    <span className="font-medium text-gray-800">
                      {invoice.bookName}
                    </span>
                  </div>
                </td>

                <td className="p-3 text-xs text-gray-600 break-all">
                  {invoice.transactionId || "N/A"}
                </td>

                <td className="p-3 font-medium text-green-600">
                  ৳ {invoice.price}
                </td>

                <td className="p-3">
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {invoices.map((invoice) => (
          <div
            key={invoice._id}
            className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={invoice.image}
                alt={invoice.bookName}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1 flex flex-col">
                <h4 className="font-semibold text-gray-800">
                  {invoice.bookName}
                </h4>
                <p className="text-xs text-gray-500 break-all">
                  Payment ID: {invoice.transactionId || "N/A"}
                </p>
                <p className="text-sm font-medium text-green-600 mt-1">
                  ৳ {invoice.price}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Paid On: {new Date(invoice.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invoices;
