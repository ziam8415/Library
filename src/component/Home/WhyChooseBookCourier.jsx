import { motion } from "framer-motion";
import { FaTruck, FaBookOpen, FaShieldAlt, FaTags } from "react-icons/fa";

const features = [
  {
    icon: <FaBookOpen size={20} />,
    title: "Wide Book Collection",
    desc: "From academic to fiction — discover books for every reader, all in one place.",
    color: "emerald",
  },
  {
    icon: <FaTags size={20} />,
    title: "Affordable Prices",
    desc: "Competitive pricing with regular offers — great books without breaking your budget.",
    color: "blue",
  },
  {
    icon: <FaTruck size={20} />,
    title: "Fast & Reliable Delivery",
    desc: "Your books are packed with care and delivered safely to your doorstep.",
    color: "purple",
  },
  {
    icon: <FaShieldAlt size={20} />,
    title: "Trusted & Secure",
    desc: "Secure payments, verified sellers, and customer-first support you can rely on.",
    color: "orange",
  },
];

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const WhyChooseBookCourier = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold">
            Why Choose <span className="text-emerald-600">Book Courier</span>
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            We make buying books easy, affordable, and reliable — so you can
            focus on reading, not worrying.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={card}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl transition"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full bg-${item.color}-100 text-${item.color}-600 mb-5 
                group-hover:scale-110 group-hover:rotate-6 transition`}
              >
                {item.icon}
              </div>

              <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseBookCourier;
