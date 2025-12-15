import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ReviewModal = ({ book, user, orderId, onClose }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmitReview = async () => {
    console.log(book._id, comment);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, {
        bookId: book._id,
        bookName: book.name,
        userName: user.displayName,
        userEmail: user.email,
        rating,
        comment,
        createdAt: Date.now(),
      });

      toast.success("Review submitted ❤️");
      onClose();
    } catch {
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add a Review</h2>

        <div className="mb-3">
          <label className="block font-medium mb-1">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 && "s"}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmitReview}
            className="flex-1 bg-emerald-600 text-white py-2 rounded-lg"
          >
            Submit Review
          </button>
          <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
