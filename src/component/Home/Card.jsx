import { Link } from "react-router";

const Card = ({ book }) => {
  return (
    <Link
      to={`/book_details/${book._id}`}
      className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl"
    >
      <div key={book._id} className="border rounded p-4">
        <img
          src={book.image}
          alt={book.name}
          className="w-full h-48 object-cover mb-2"
        />
        <h3 className="font-semibold">{book.name}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="text-gray-800 font-medium">${book.price}</p>
      </div>
    </Link>
  );
};

export default Card;
