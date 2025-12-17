import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Card from "./Card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

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
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load latest books.
      </p>
    );

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold">
            Latest <span className="text-emerald-600">Arrivals</span>
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Explore the newest books added to BookCourier — fresh stories,
            updated editions, and must-read titles just for you.
          </p>
        </motion.div>

        {/* Books Grid */}
        {books.length === 0 ? (
          <p className="text-center text-gray-500">
            No latest books available right now.
          </p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {books.map((book) => (
              <motion.div key={book._id} variants={itemVariants}>
                <Card book={book} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LatestBooks;
