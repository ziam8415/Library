import React from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../component/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiUser, FiShield } from "react-icons/fi";
import { motion } from "framer-motion";

const AllUsers = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  /* -------- FETCH USERS -------- */
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user`);
      return res.data;
    },
  });

  /* -------- UPDATE ROLE -------- */
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, role }) =>
      axiosSecure.patch(`/users/role/${id}`, { role }),
    onSuccess: () => {
      toast.success("User role updated");
      queryClient.invalidateQueries(["all-users"]);
    },
    onError: () => {
      toast.error("Failed to update role");
    },
  });

  const handleRoleChange = async (id, role) => {
    await mutateAsync({ id, role });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load users</p>;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        👥 All Users
      </h2>

      {/* ---------- Desktop Table ---------- */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Last Login</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={user.image || "https://i.ibb.co/2FsfXqM/user.png"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                  />
                  {user.name || <FiUser />}
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold capitalize
                    ${
                      user.role === "admin"
                        ? "bg-emerald-100 text-emerald-700"
                        : user.role === "librarian"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3 text-gray-500">
                  {user.last_loggedIn
                    ? new Date(user.last_loggedIn).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="p-3 text-center space-x-1 flex justify-center sm:justify-start flex-wrap gap-1">
                  <button
                    disabled={
                      user.role === "librarian" || user.role === "admin"
                    }
                    onClick={() => handleRoleChange(user._id, "librarian")}
                    className="px-3 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm flex items-center gap-1"
                  >
                    <FiShield /> Librarian
                  </button>
                  <button
                    disabled={user.role === "admin"}
                    onClick={() => handleRoleChange(user._id, "admin")}
                    className="px-3 py-1 rounded-full text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm flex items-center gap-1"
                  >
                    <FiShield /> Admin
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile Cards ---------- */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.image || "https://i.ibb.co/2FsfXqM/user.png"}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover shadow-sm"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {user.name || <FiUser />}
                </h3>
                <p className="text-gray-500 text-sm break-words">
                  {user.email}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                ${
                  user.role === "admin"
                    ? "bg-emerald-100 text-emerald-700"
                    : user.role === "librarian"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {user.role}
              </span>
            </div>
            <div className="flex justify-between flex-wrap gap-2">
              <button
                disabled={user.role === "librarian" || user.role === "admin"}
                onClick={() => handleRoleChange(user._id, "librarian")}
                className="flex-1 text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-full text-sm flex items-center justify-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FiShield /> Librarian
              </button>
              <button
                disabled={user.role === "admin"}
                onClick={() => handleRoleChange(user._id, "admin")}
                className="flex-1 text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-full text-sm flex items-center justify-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FiShield /> Admin
              </button>
            </div>
            <p className="text-gray-500 text-sm">
              Last Login:{" "}
              {user.last_loggedIn
                ? new Date(user.last_loggedIn).toLocaleDateString()
                : "N/A"}
            </p>
          </motion.div>
        ))}

        {users.length === 0 && (
          <p className="text-center text-gray-500 py-10">No users found</p>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
