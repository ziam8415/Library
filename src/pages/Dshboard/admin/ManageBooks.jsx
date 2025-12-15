import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../component/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import { FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  /* ---------------- FETCH BOOKS ---------------- */
  const {
    data: books = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["manage-books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });

  /* ---------------- UPDATE STATUS ---------------- */
  const statusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/books/status/${id}`, { status }),
    onSuccess: () => {
      toast.success("Book status updated");
      queryClient.invalidateQueries(["manage-books"]);
    },
    onError: () => toast.error("Failed to update status"),
  });

  /* ---------------- DELETE BOOK ---------------- */
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/books/${id}`),
    onSuccess: () => {
      toast.success("Book and related orders deleted");
      queryClient.invalidateQueries(["manage-books"]);
    },
    onError: () => toast.error("Delete failed"),
  });

  const handleStatusToggle = (book) => {
    const newStatus = book.status === "published" ? "unpublished" : "published";
    statusMutation.mutate({ id: book._id, status: newStatus });
  };

  const handleDelete = (id) => {
    if (!confirm("This will delete the book AND all related orders. Continue?"))
      return;
    deleteMutation.mutate(id);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load books</p>;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📚 Manage Books</h2>

      {/* -------- Desktop Table -------- */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Book</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Seller</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <motion.tr
                key={book._id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-12 h-16 rounded object-cover border shadow-sm"
                  />
                  <span className="font-medium">{book.name}</span>
                </td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">
                  <p className="font-medium">{book.seller?.name}</p>
                  <p className="text-gray-500 text-xs">{book.seller?.email}</p>
                </td>
                <td className="p-3">৳ {book.price}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      book.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                <td className="p-3 text-center space-x-2 flex justify-center flex-wrap gap-1">
                  <button
                    onClick={() => handleStatusToggle(book)}
                    className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 text-xs sm:text-sm"
                  >
                    {book.status === "published" ? <FiEyeOff /> : <FiEye />}
                    {book.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 text-xs sm:text-sm"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* -------- Mobile Cards -------- */}
      <div className="md:hidden space-y-4">
        {books.map((book) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={book.image}
                alt={book.name}
                className="w-16 h-20 rounded object-cover shadow-sm"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{book.name}</h3>
                <p className="text-gray-500 text-sm">{book.author}</p>
                <p className="text-gray-500 text-xs">
                  Seller: {book.seller?.name || "N/A"}
                </p>
                <p className="text-gray-500 text-xs">{book.seller?.email}</p>
                <p className="font-medium mt-1">৳ {book.price}</p>
              </div>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-2 mt-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  book.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {book.status}
              </span>
              <div className="flex flex-1 justify-end gap-2 flex-wrap">
                <button
                  onClick={() => handleStatusToggle(book)}
                  className="flex-1 flex justify-center items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-full text-sm"
                >
                  {book.status === "published" ? <FiEyeOff /> : <FiEye />}
                  {book.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="flex-1 flex justify-center items-center gap-1 text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-full text-sm"
                >
                  <FiTrash2 />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {books.length === 0 && (
          <p className="text-center text-gray-500 py-10">No books found</p>
        )}
      </div>
    </div>
  );
};

export default ManageBooks;
