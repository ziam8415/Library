import { useState } from "react";
import { Link } from "react-router";

const MyBookRow = ({ book }) => {
  const [status, setStatus] = useState(book.status || "Published");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    // TODO: Call API to update book status (Publish / Unpublish)
    console.log("New Status:", e.target.value, "Book ID:", book._id);
  };

  return (
    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 transition">
      {/* Book Image */}
      <td className="px-5 py-3 text-sm">
        <img
          src={book.image}
          alt={book.name}
          className="w-16 h-20 object-cover rounded-md"
        />
      </td>

      {/* Book Name */}
      <td className="px-5 py-3 text-sm">
        <p className="text-gray-900 font-medium">{book.name}</p>
      </td>

      {/* Author */}
      <td className="px-5 py-3 text-sm">
        <p className="text-gray-700">{book.author}</p>
      </td>

      {/* Status */}
      <td className="px-5 py-3 text-sm">
        <select
          value={status}
          onChange={handleStatusChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-emerald-500 bg-white text-gray-900"
        >
          <option value="Published">Published</option>
          <option value="Unpublished">Unpublished</option>
        </select>
      </td>

      {/* Edit Button */}
      <td className="px-5 py-3 text-sm">
        <Link
          to={`/dashboard/edit-book/${book._id}`}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default MyBookRow;
