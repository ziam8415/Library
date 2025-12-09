import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSection = () => {
  const images = [
    "https://i.ibb.co.com/ccnTcCQn/Picture5-1-e1596690386660.png",
    "https://i.ibb.co.com/Wpf0Ryfg/how-the-expensive-education-can-change-into-the-affordable-online-education.png",
    "https://i.ibb.co.com/99fr0D14/online-tutorials-concept-52683-37480.jpg",
  ];
  return (
    <div className="container mx-auto pt-20 relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        className="rounded-2xl shadow-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-[300px] md:h-[600px] object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
