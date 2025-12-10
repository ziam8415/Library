import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Card from "./Card";

const LatestBooks = () => {
  const {
    data: books = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latest-books"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/latest`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error loading books.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {books.map((book) => (
        <Card key={book._id} book={book}></Card>
      ))}
    </div>
  );
};

export default LatestBooks;
