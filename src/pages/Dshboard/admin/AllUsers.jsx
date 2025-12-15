import React from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../component/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
  const { mutateAsync, isPending } = useMutation({
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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">All Users</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
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
              <tr key={user._id} className="border-b last:border-none">
                {/* User Info */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span>{user.name}</span>
                </td>

                <td className="p-3">{user.email}</td>

                <td className="p-3 capitalize font-medium">{user.role}</td>

                <td className="p-3 text-gray-500">
                  {new Date(user.last_loggedIn).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="p-3 text-center space-x-2">
                  <button
                    disabled={
                      user.role === "librarian" || user.role === "admin"
                    }
                    onClick={() => handleRoleChange(user._id, "librarian")}
                    className="px-3 py-1 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Make Librarian
                  </button>

                  <button
                    disabled={user.role === "admin"}
                    onClick={() => handleRoleChange(user._id, "admin")}
                    className="px-3 py-1 rounded-md text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center text-gray-500 py-10">No users found</div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
