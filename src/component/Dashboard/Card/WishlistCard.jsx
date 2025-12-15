import { motion } from "framer-motion";
import { Link } from "react-router";
import { FiTrash2 } from "react-icons/fi";

const WishlistCard = ({ item, onRemove }) => {
  const { _id, bookId, book } = item;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="flex gap-5 p-5">
        {/* Book Image */}
        <img
          src={book.image}
          alt={book.name}
          className="w-24 h-36 object-cover rounded-xl shadow-sm"
        />

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 leading-snug">
              {book.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">by {book.author}</p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-emerald-600">
              ${book.price}
            </span>

            <div className="flex items-center gap-4">
              <Link
                to={`/book_details/${bookId}`}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                View
              </Link>

              <button
                onClick={() => onRemove(_id)}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition"
              >
                <FiTrash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WishlistCard;
