"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const slides = [
  // {
  //   id: 6,
  //   title: "Vases That Speak Elegance",
  //   description: "Artful designs to complement every corner.",
  //   img: "/vase3.jpeg",
  //   url: "/shop/vase-&-decore",
    
  // },
  // {
  //   id: 1,
  //   title: "Modern Mirrors, Classic Charm",
  //   description: "Bold reflections for contemporary living",
  //   img: "/mirror-slide.webp",
  //   url: "/shop/mirrors",
    
  // },
  // {
  //   id: 1,
  //   title: "Get up to 80% OFF on our exclusive Mirrors & Vase Collection!",
  //   description: `Ramadan Sale!`,
  //   img: "/pre-ramadan-banner.webp",
  //   url: "/shop/mirrors",
    
  // },
  {
    id: 2,
    title: "Where Art Meets Reflection",
    description: "Mirrors that do more than reflect",
    img: "/mirror-slide1.webp",
    url: "/shop/mirrors",
    
  },
  {
    id: 3,
    title: "Transform Every Corner with Radiant Lamps!",
    description: "Illuminate Your Style",
    img: "/lamp.jpeg",
    url: "/shop/lamps",
    
  },
  {
    id: 4,
    title: "Vases designed to stand out on their own!",
    description: "Breathe Life Into Spaces",
    img: "/vase.webp",
    url: "/shop/vase-&-decore",
    
  },
  // {
  //   id: 5,
  //   title: "Elegant vases to brighten your interiors!",
  //   description: "Bloom with Sophistication",
  //   img: "/vase2.jpeg",
  //   url: "/shop/vase-&-decore",
   
  // },
];

const Slider = () => {
  const [current, setCurrent] = useState(1); // Start from the first actual slide
  const [isTransitioning, setIsTransitioning] = useState(true);

  const carouselRef = useRef(null);
  const [activeTextIndex, setActiveTextIndex] = useState(1);

  const extendedSlides = [
    slides[slides.length - 1], // Clone of the last slide
    ...slides,
    slides[0], // Clone of the first slide
  ];

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-slide every 5s
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (current < extendedSlides.length - 1) {
      setCurrent((prev) => prev + 1);
      setIsTransitioning(true);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
      setIsTransitioning(true);
    }
  };

  const handleTransitionEnd = () => {

    if (current >= extendedSlides.length - 1) {
      // Jump back to the first actual slide
      setIsTransitioning(false);
      setCurrent(1);
      setActiveTextIndex(1);
    } else if (current <= 0) {
      // Jump to the last actual slide
      setIsTransitioning(false);
      setCurrent(slides.length);
      setActiveTextIndex(slides.length);
    } else {
      setActiveTextIndex(current); // Update active text when transition ends
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      // Disable transition temporarily for seamless jump
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50); // Re-enable after a short delay
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  return (
    <div className="h-[230px] relative sm:h-[600px] overflow-hidden">
      <div
        ref={carouselRef}
        className={`w-max h-full flex 
         ${isTransitioning ? "transition-transform ease-in duration-2000" : ""}
          `}
        style={{ transform: `translateX(-${current * 100}vw)`,}}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="fixed inset-0 bg-black bg-opacity-30 z-10"></div>
        {extendedSlides.map((slide, index) => (
          <div
            className={`bg-white relative w-screen h-full flex flex-col gap-2 sm:gap-16 xl:flex-row`}
            key={index}
          >
            <div
              className={`absolute z-10 inset-0 text-white bg-opacity-20 flex flex-col  gap-3 sm:gap-8 items-start pl-10 sm:pl-20 justify-center
              `}
            >
              <h2
                className={`${
                  activeTextIndex === index ? "slide-down-clip" : "opacity-0"
                } text-xl lg:text-5xl 2xl:text-6xl font-bold`}
              >
                {slide.description}
              </h2>

              <h1
                className={`${
                  activeTextIndex === index ? "slide-up-clip" : "opacity-0"
                } text:lg sm:text-5xl lg:text-6xl 2xl:text-8xl w-1/2`}
              >
                {slide.title}
              </h1>
              <Link href={slide.url} 
              className={`${
                activeTextIndex === index ? "slide-down-clip" : "opacity-0"
              }`}
              >
                
                <button className="relative px-4 py-1 sm:px-12 sm:py-3  bg-green-700 text-white font-medium rounded-sm overflow-hidden group">
                  <span className="absolute inset-0 bg-primary  scale-y-0 origin-left transition-transform duration-300 ease-out group-hover:scale-y-100"></span>
                  <span className="relative z-10 uppercase text-sm">Shop Now </span>
                </button>
              </Link>
            </div>
            
            <div className="w-full relative">
              <Image
                src={slide.img}
                alt={slide.title}
                unoptimized
                className="sm:h-[600px] w-full object-contain sm:object-cover bg-center"
                width={100}
                height={100}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute mx-auto left-1/2 -translate-x-1/2 bottom-2 sm:bottom-4 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-white cursor-pointer flex items-center justify-center ${
              current === index + 1 ? "scale-150" : ""
            }`}
            key={index}
            onClick={() => {
              setCurrent(index + 1);
              setIsTransitioning(true);
            }}
          >
            {current === index + 1 && (
              <div className="w-[6px] h-[6px] bg-primary rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
