"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Transform Your Space with Stunning Mirrors!",
    description: "Reflect Your Style",
    img: "/mirror-slide.jpg",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: " Elevate Your Home with Stunning Vases & Décor!",
    description: "Artful Touches for Every Space",
    img: "/mirror-slide1.jpg",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Transform Every Corner with Radiant Lamps!",
    description: "Illuminate Your Style",
    img: "/lamp-slide.jpg",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="h-[calc(100vh-150px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} relative w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            {/* <div className="absolute z-10 bg-black h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-primary text-white py-3 px-4 ">
                  SHOP NOW
                </button>
              </Link>
            </div> */}
              <div className="absolute z-10 inset-0 bg-black text-center text-white bg-opacity-20 flex flex-col  gap-8 items-center justify-center">
              <h2 className="text-xl lg:text-5xl 2xl:text-6xl">
                {slide.description}
              </h2>
              
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-medium">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-primary text-white py-3 px-4 ">
                  SHOP NOW
                </button>
              </Link>
  </div>
            {/* IMAGE CONTAINER */}
            <div className="h-1/2 xl:w-full xl:h-full relative">
              <Image
                src={slide.img}
                alt=""
                // fill
                // layout="responsive"
                // width={100}
                // height={100}
                // sizes="100%"
                // className="object-cover bg-center"
                layout="responsive"
  width={16}
  height={9} // Aspect ratio
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
