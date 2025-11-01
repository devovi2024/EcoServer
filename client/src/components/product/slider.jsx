import React, { useEffect } from "react";
import ProductStore from "../../store/ProductStore";
import SliderSkeleton from "../../skeleton/sliderSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
  const { SliderList, SliderListRequest } = ProductStore();

  useEffect(() => {
    if (!SliderList) {
      SliderListRequest();
    }
  }, [SliderList, SliderListRequest]);

  if (!SliderList || SliderList.length === 0) {
    return <SliderSkeleton />;
  }

  return (
    <section className="w-full bg-gray-50 py-2">
      <div className="container mx-auto px-1 max-w-4xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={8}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
        >
          {SliderList.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition duration-300">
                <div className="md:w-1/2 p-2 flex flex-col justify-center">
                  <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mb-2 text-xs md:text-sm">
                    {item.shortDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-600 font-semibold text-base md:text-lg">
                      ${item.price}
                    </span>
                    <button className="bg-indigo-500 text-white px-2 py-1 rounded text-xs md:text-sm hover:bg-indigo-600 transition">
                      Buy Now
                    </button>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <img
                    src={item.img1}
                    alt={item.title}
                    className="w-full h-32 md:h-40 object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Slider;
