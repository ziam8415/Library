import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import LoadingSpinner from "../../component/Shared/LoadingSpinner";
import Card from "../../component/Home/Card";

const AllBooks = () => {
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

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error loading books.</p>;
  return (
    <div>
      <h1>All books</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book._id} book={book}></Card>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
