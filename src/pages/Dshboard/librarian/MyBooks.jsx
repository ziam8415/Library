import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../component/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const MyBooks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["my-books", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/my-books/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">My Books</h2>

      {/* Table wrapper */}
      <div className="relative overflow-x-auto border border-gray-200 rounded-lg bg-white">
        <table className="min-w-[640px] w-full border-collapse">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Book Name</th>
              <th className="px-4 py-3 text-left">Author</th>

              {/* Sticky Action Header */}
              <th className="px-4 py-3 text-right sticky right-0 bg-gray-100">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {books.length ? (
              books.map((book) => (
                <tr key={book._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-10 h-14 rounded object-cover"
                    />
                  </td>

                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {book.name}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {book.author}
                  </td>

                  {/* Sticky Action Cell */}
                  <td className="px-4 py-3 text-right sticky right-0 bg-white">
                    <Link
                      to={`/dashboard/edit-book/${book._id}`}
                      className="inline-flex px-3 py-1.5 text-xs font-medium rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-sm text-gray-500"
                >
                  No books added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooks;
