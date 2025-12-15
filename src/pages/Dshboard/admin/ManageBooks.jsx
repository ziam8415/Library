import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../component/Shared/LoadingSpinner";
import toast from "react-hot-toast";

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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Books</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
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
              <tr key={book._id} className="border-b last:border-none">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-12 h-16 rounded object-cover border"
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

                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleStatusToggle(book)}
                    className="px-3 py-1 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {book.status === "published" ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    onClick={() => handleDelete(book._id)}
                    className="px-3 py-1 rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {books.length === 0 && (
          <div className="text-center text-gray-500 py-10">No books found</div>
        )}
      </div>
    </div>
  );
};

export default ManageBooks;
