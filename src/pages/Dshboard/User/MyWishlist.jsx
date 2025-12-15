import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthContext";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/wishlist/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {wishlist.length === 0 && (
        <p className="text-gray-500">No books in wishlist</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item._id} className="border rounded-lg p-4">
            <img
              src={item.book.image}
              className="h-48 w-full object-cover rounded"
            />
            <h3 className="font-semibold mt-3">{item.book.name}</h3>
            <p className="text-sm text-gray-600">{item.book.author}</p>
            <p className="font-bold mt-2">${item.book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWishlist;
