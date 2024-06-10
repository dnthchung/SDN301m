import React from "react";
import bannerImage from "../assets/vn-11134210-7r98o-ltza79e2ahwf46.png"; // Update this path to the correct image path
import Slider from "react-slick";

const Banner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-200 p-8 h-auto md:h-100">
      <div className="md:w-1/2 p-4">
        <h2 className="text-3xl font-bold mb-4">Shop With Confidence</h2>
        <p className="text-lg mb-4">
          New products are added every week. Check back often to see.
        </p>
        <button className="bg-black text-white py-2 px-4 rounded">
          Shopping Now
        </button>
      </div>
      <div className="md:w-1/2 p-4">
        <Slider {...settings}>
          <div>
            <img
              src={bannerImage}
              alt="Banner"
              className="w-80 h-80 object-cover"
            />
          </div>
          <div>
            <img
              src={bannerImage}
              alt="Banner"
              className="w-80 h-80 object-cover"
            />
          </div>
          <div>
            <img
              src={bannerImage}
              alt="Banner"
              className="w-80 h-80 object-cover"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
