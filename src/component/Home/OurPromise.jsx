import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const promises = [
  "Authentic & verified books",
  "Secure payments",
  "Transparent pricing",
  "Customer-first support",
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const OurPromise = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-6"
        >
          Our <span className="text-emerald-600">Promise</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10 text-sm text-gray-600"
        >
          BookCourier is built with trust, transparency, and love for books.
        </motion.p>

        {/* Promise List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {promises.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group flex items-center gap-3 bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-lg transition"
            >
              <FaCheckCircle className="text-emerald-600 text-lg group-hover:scale-110 transition" />
              <span className="text-sm text-gray-800 font-medium">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurPromise;
