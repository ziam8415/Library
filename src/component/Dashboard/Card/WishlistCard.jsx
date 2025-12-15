import React from "react";
import { Link } from "react-router";
import { FiTrash2 } from "react-icons/fi";

const WishlistCard = ({ item, onRemove }) => {
  const { _id, bookId, book, createdAt } = item;

  return (
    <div>
      <div className="flex gap-4 p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
        {/* Book Image */}
        <img
          src={book.image}
          alt={book.name}
          className="w-24 h-32 object-cover rounded-lg border"
        />

        {/* Book Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">{book.name}</h3>
            <p className="text-sm text-gray-500">by {book.author}</p>
            <p className="text-emerald-600 font-bold mt-1">${book.price}</p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <Link
              to={`/book_details/${bookId}`}
              className="text-sm text-blue-600 hover:underline"
            >
              View Details
            </Link>

            <button
              onClick={() => onRemove(_id)}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
            >
              <FiTrash2 size={16} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
