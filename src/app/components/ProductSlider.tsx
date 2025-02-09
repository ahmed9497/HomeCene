"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Link from "next/link";

const ProductSlider = ({ category }: { category: string }) => {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef(null);
  const { recomendedProducts } = useCart();
  const [products, setProducts] = useState<any>([]);
//   console.log(products);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [totalSlides, setTotalSlides] = useState(0); // Grouping 4 per slide
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (recomendedProducts && recomendedProducts.length) {
      const products = recomendedProducts.filter(
        (i: any) => i.category === category
      );
      setProducts(products);
      // setTotalSlides(Math.ceil(products.length / slidesPerView))
      setTimeout(() => {
        setTotalSlides(Math.ceil(products.length / slidesPerView));
      }, 0);
    }
  }, [recomendedProducts, category]);
  useEffect(() => {
    if (products.length) {
      setTotalSlides(Math.ceil(products.length / slidesPerView));
    }
  }, [products, slidesPerView]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000); // Auto-slide every 3s
    return () => clearInterval(interval);
  }, [totalSlides]);
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) setSlidesPerView(1); // Mobile
      else if (window.innerWidth < 1024) setSlidesPerView(2); // Tablet
      else setSlidesPerView(3); // Desktop
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);
  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden font-Poppins">
      <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold text-center text-gray-800 my-6">
        <span className="relative">
          Perfect Matches for Your Style
          <span className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"></span>
        </span>
      </h2>
      <div
        ref={sliderRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div key={index} className="flex min-w-full gap-4 p-4">
            {products
              .slice(
                index * slidesPerView,
                index * slidesPerView + slidesPerView
              )
              .map((product: any, idx: any) => (
                <div
                  key={idx}
                  className="w-full p-2 bg-white  shadow border rounded-lg"
                >
                  <Link href={`/product/${product.title.replaceAll(" ", "-")}`}>
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-[300px] object-cover rounded-md"
                    />
                    <h1 className="mt-2 text-md text-center font-medium">
                      {product.title}
                    </h1>
                    <div className="font-bold flex items-center justify-center text-primary gap-x-4 my-4  font-Poppins">
                      {product?.variant && product?.variant[0]?.discount ? (
                        <>
                          <h2 className="text-red-500 line-through font-normal text-sm  ">
                            Aed {product?.variant[0]?.price[0]}.00
                          </h2>
                          <div className="h-6 w-[2px] bg-gray-300"></div>
                          <h2 className="text-black">
                            Aed {product?.variant[0]?.discountedPrice}.00
                          </h2>
                          <div className="text-sm py-[1px] text-white rounded-full px-4 bg-red-600">
                            {product?.variant[0]?.discountPercentage} OFF
                          </div>
                        </>
                      ) : (
                        <h2 className="text-primary  group-hover:font-semibold">
                          Aed{" "}
                          {product?.variant && product?.variant[0]?.price[0]}
                        </h2>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-primary text-white p-2 rounded-full shadow-lg"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-primary text-white p-2 rounded-full shadow-lg"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default ProductSlider;
