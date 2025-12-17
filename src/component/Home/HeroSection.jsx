import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSection = () => {
  const slides = [
    {
      image: "https://i.ibb.co/ccDM45Tq/download-3.jpg",
      title: "Discover Your Next Adventure",
      subtitle: "Browse thousands of books and find your perfect read.",
      cta: "Explore Books",
    },
    {
      image:
        "https://i.ibb.co/Wpf0Ryfg/how-the-expensive-education-can-change-into-the-affordable-online-education.png",
      title: "Expand Your Knowledge",
      subtitle: "From fiction to academic, we've got you covered.",
      cta: "Start Reading",
    },
    {
      image:
        "https://i.ibb.co/99fr0D14/online-tutorials-concept-52683-37480.jpg",
      title: "Books Delivered To Your Doorstep",
      subtitle: "Fast, reliable, and secure delivery for all orders.",
      cta: "Order Now",
    },
  ];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden pt-2 max-h-[400px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="rounded-2xl shadow-xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative max-h-[400px]">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[400px] object-cover rounded-2xl"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center px-4 max-w-[90%]"
              >
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                  {slide.title}
                </h1>
                <p className="text-xs md:text-sm lg:text-base text-gray-200 mb-4">
                  {slide.subtitle}
                </p>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 md:px-6 md:py-2 rounded-lg transition text-sm md:text-base">
                  {slide.cta}
                </button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
