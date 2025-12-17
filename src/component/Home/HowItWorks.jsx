import { motion } from "framer-motion";
import { FaSearch, FaShoppingCart, FaTruck } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    title: "Find Your Book",
    desc: "Browse thousands of books across different categories.",
  },
  {
    icon: <FaShoppingCart />,
    title: "Place Order",
    desc: "Add to cart and checkout securely in minutes.",
  },
  {
    icon: <FaTruck />,
    title: "Fast Delivery",
    desc: "We deliver your books safely to your doorstep.",
  },
];

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          How <span className="text-emerald-600">BookCourier</span> Works
        </motion.h2>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-gray-50 p-7 rounded-2xl shadow-sm hover:shadow-xl transition text-center"
            >
              {/* Step number */}
              <span className="absolute top-4 right-4 text-xs font-semibold text-gray-400">
                0{index + 1}
              </span>

              {/* Icon */}
              <div
                className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xl
                              group-hover:rotate-6 group-hover:scale-110 transition"
              >
                {step.icon}
              </div>

              <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
