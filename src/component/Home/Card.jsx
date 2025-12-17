import { Link } from "react-router";
import { FaUser, FaTag } from "react-icons/fa";

const Card = ({ book }) => {
  return (
    <Link
      to={`/book_details/${book._id}`}
      className="
        group block
        bg-white rounded-lg
        shadow-sm hover:shadow-lg
        transition-all duration-300
      "
    >
      {/* Image */}
      <div className="h-36 overflow-hidden rounded-t-lg">
        <img
          src={book.image}
          alt={book.name}
          className="
            w-full h-full object-cover
            group-hover:scale-105
            transition-transform duration-300
          "
        />
      </div>

      {/* Content */}
      <div className="p-3 space-y-1">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {book.name}
        </h3>

        <div className="flex justify-between">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <FaUser className="text-gray-400 text-xs" />
            {book.author}
          </p>

          <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
            <FaTag className="text-xs" />৳ {book.price}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
