import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../component/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MyBookRow from "../../../component/Dashboard/TableRows/MyBookRow";

const MyBooks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //Fetch books added by the librarian
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["my-books", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/my-books/${user?.email}`);
      return res.data;
    },
  });

  console.log(books);

  // const books = {
  //   image: "https://i.ibb.co/0pZhcjvr/Screenshot-10.png",
  //   name: "heart",
  //   author: "ewjfk",
  //   status: "Available",
  // };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 sm:px-5 py-3 border-b text-gray-800 text-xs sm:text-sm uppercase">
              Image
            </th>
            <th className="px-3 sm:px-5 py-3 border-b text-gray-800 text-xs sm:text-sm uppercase">
              Book Name
            </th>
            <th className="px-3 sm:px-5 py-3 border-b text-gray-800 text-xs sm:text-sm uppercase">
              Author
            </th>
            <th className="px-3 sm:px-5 py-3 border-b text-gray-800 text-xs sm:text-sm uppercase">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {books.length > 0 ? (
            books.map((book) => <MyBookRow key={book._id} book={book} />)
          ) : (
            <tr>
              <td
                colSpan={4}
                className="px-3 py-5 text-center text-gray-500 text-sm"
              >
                No books added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooks;
