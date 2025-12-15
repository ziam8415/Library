import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useMemo, useState } from "react";
import LoadingSpinner from "../../component/Shared/LoadingSpinner";
import Card from "../../component/Home/Card";

const AllBooks = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

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

  // 🔍 Search + 🔃 Sort Logic
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter((book) =>
      book.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [books, search, sort]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error loading books.</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>

      {/* 🔍 Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by book name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg"
        >
          <option value="">Sort by price</option>
          <option value="low-to-high">Low → High</option>
          <option value="high-to-low">High → Low</option>
        </select>
      </div>

      {/* 📚 Books */}
      {filteredAndSortedBooks.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredAndSortedBooks.map((book) => (
            <Card key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
