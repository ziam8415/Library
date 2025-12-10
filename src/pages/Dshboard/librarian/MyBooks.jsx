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
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Books</h2>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Image
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Book Name
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Author
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Status
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
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
                      colSpan={5}
                      className="px-5 py-5 border-b border-gray-200 text-center text-gray-500"
                    >
                      No books added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooks;
