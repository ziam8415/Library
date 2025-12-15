import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../component/Shared/LoadingSpinner";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import WishlistCard from "../../../component/Dashboard/Card/WishlistCard";
import { AnimatePresence } from "framer-motion";

const MyWishlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/wishlist/user/${user.email}`
      );
      return res.data;
    },
  });

  const handleRemove = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/wishlist/${id}?email=${user.email}`
      );

      toast.success("Removed from wishlist");
      queryClient.invalidateQueries(["wishlist", user.email]);
    } catch (error) {
      toast.error("Failed to remove");
      console.error(error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (wishlist.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10">
        Your wishlist is empty 💔
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      <AnimatePresence>
        {wishlist.map((item) => (
          <WishlistCard key={item._id} item={item} onRemove={handleRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MyWishlist;
