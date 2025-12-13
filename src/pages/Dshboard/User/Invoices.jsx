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
  if (isError) return <p className="text-red-500">Failed to load invoices</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Invoices</h2>

      {invoices.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No paid invoices found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Book</th>
                <th className="p-3 text-left">Payment ID</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Paid On</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice._id} className="border-b last:border-none">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={invoice.image}
                        alt={invoice.bookName}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <span>{invoice.bookName}</span>
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
      )}
    </div>
  );
};

export default Invoices;
