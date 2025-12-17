import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useMemo, useState } from "react";
import LoadingSpinner from "../../component/Shared/LoadingSpinner";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiDollarSign,
} from "react-icons/fi";
import Card from "../../component/Home/Card";

const AllBooks = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [sortOpen, setSortOpen] = useState(false);

  const {
    data: books = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["All_Books"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
      return res.data;
    },
  });

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter((book) =>
      book.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "low-to-high") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high-to-low") filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [books, search, sort]);

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <p className="text-red-500 text-center">Failed to load books.</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 ">📚 All Books</h1>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full sm:w-1/2">
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by book name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-400 placeholder-gray-400"
          />
        </div>

        {/* Sort */}
        <div className="relative w-full text-gray-700 sm:w-1/4">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="w-full flex justify-between items-center px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition"
          >
            {sort
              ? sort === "low-to-high"
                ? "Price: Low → High"
                : "Price: High → Low"
              : "Sort by price"}
            {sortOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {sortOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button
                onClick={() => {
                  setSort("low-to-high");
                  setSortOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <FiDollarSign /> Low → High
              </button>
              <button
                onClick={() => {
                  setSort("high-to-low");
                  setSortOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <FiDollarSign /> High → Low
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Books Grid */}
      {filteredAndSortedBooks.length === 0 ? (
        <p className="text-gray-500 text-center">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedBooks.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card book={book} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
