import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../../component/Shared/LoadingSpinner";
import OrderModal from "../../component/Modal/OrderModal";

const BookDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`book_${id}`],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/${id}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error loading book details.</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Book Image */}
        <img
          src={book.image}
          alt={book.name}
          className="w-full md:w-1/3 object-cover rounded-lg"
        />

        {/* Book Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{book.name}</h1>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Category:</strong> {book.category}
          </p>
          <p>
            <strong>Price:</strong> ${book.price}
          </p>
          <p>
            <strong>Quantity:</strong> {book.quantity}
          </p>
          <p>
            <strong>Status:</strong> {book.status}
          </p>
          <p>{book.description}</p>

          {/* Order Now Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Order Modal */}
      {isModalOpen && (
        <OrderModal book={book} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default BookDetails;
