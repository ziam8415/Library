import React, { useContext, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

import LoadingSpinner from "../../component/Shared/LoadingSpinner";
import OrderModal from "../../component/Modal/OrderModal";
import { AuthContext } from "../../providers/AuthContext";
import ReviewModal from "../../component/Modal/ReviewModal";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  // 1️⃣ Fetch book
  const { data: book, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/${id}`
      );
      return res.data;
    },
  });

  // 2️⃣ Fetch user wishlist
  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/wishlist/user/${user.email}`
      );
      return res.data;
    },
  });

  // 3️⃣ Check if this book is wishlisted
  const isWishlisted = useMemo(() => {
    return wishlist.some((item) => item.bookId === id);
  }, [wishlist, id]);

  // 4️⃣ Add to wishlist
  const handleAddToWishlist = async () => {
    if (!user) {
      return toast.error("Please login first");
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/wishlist`, {
        userEmail: user.email,
        bookId: book._id,
        book: {
          name: book.name,
          author: book.author,
          price: book.price,
          image: book.image,
        },
        createdAt: Date.now(),
      });

      toast.success("Added to wishlist ❤️");

      // ✅ refresh wishlist
      queryClient.invalidateQueries(["wishlist", user.email]);
    } catch (error) {
      toast.error("Already in wishlist");
    }
  };

  // 5️⃣ Fetch reviews for this book
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/reviews/book/${id}`
      );
      return res.data;
    },
  });

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Book Image */}
        <img
          src={book.image}
          alt={book.name}
          className="rounded-xl shadow-lg w-full h-[450px] object-cover"
        />

        {/* Book Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{book.name}</h1>

          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Category:</strong> {book.category}
          </p>
          <p>
            <strong>Quantity:</strong> {book.quantity}
          </p>

          <p className="text-2xl font-semibold text-emerald-600">
            ${book.price}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setShowOrderModal(true)}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg"
            >
              Order Now
            </button>

            <button
              onClick={handleAddToWishlist}
              disabled={isWishlisted}
              className={`px-6 py-2 rounded-lg transition ${
                isWishlisted
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "border border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              {isWishlisted ? "❤️ Wishlisted" : "🤍 Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <OrderModal
          book={book}
          onClose={() => setShowOrderModal(false)}
          onSuccessOrder={(order) => {
            setLastOrder(order);
            setShowReviewModal(true);
          }}
        />
      )}

      {showReviewModal && lastOrder && (
        <ReviewModal
          book={book}
          user={user}
          orderId={lastOrder._id}
          onClose={() => setShowReviewModal(false)}
        />
      )}

      {/* review */}
      {/* Reviews Section */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h2>

        {reviews.length > 0 && (
          <p className="mb-4 text-gray-600">
            ⭐ Average Rating: {averageRating} / 5
          </p>
        )}

        {reviewsLoading && <p>Loading reviews...</p>}

        {reviews.length === 0 && !reviewsLoading && (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-semibold">{review.userName}</h4>
                <span className="text-yellow-500 font-medium">
                  ⭐ {review.rating}
                </span>
              </div>

              <p className="text-gray-700">{review.comment}</p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
