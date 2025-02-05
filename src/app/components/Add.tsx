"use client";
import React, { FC, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ProductProps } from "../types/types";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import SelectSize from "./SelectSize";
import { FaCircle } from "react-icons/fa6";
import { HiLightBulb } from "react-icons/hi";
import { fbEvent } from "@/app/lib/fpixel";
interface AddToCartButtonProps {
  product: ProductProps;
  // btnType?:string
}

const Add: FC<AddToCartButtonProps | any> = ({ product }) => {
  const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(
    product?.variant[0]?.size || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product?.variant[0]?.colors[0] || ""
  );
  const [selectedFeature, setSelectedFeature] = useState(
    product?.variant[0]?.feature[0] || ""
  );
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);

  const handleAddToCart = () => {
    let calPrice = product.variant[activeVariant]?.discount
      ? parseInt(product.variant[activeVariant].discountedPrice[0])
      : parseInt(product.variant[activeVariant].price[0]);

    fbEvent("AddToCart", {
      content_ids: [product.id], // ID of the product added to the cart
      content_name: product.title, // Name of the product
      content_category: product.category, // Category of the product
      value: calPrice * quantity, // Total price for the quantity added to the cart
      currency: "AED", // Currency (e.g., USD, AED)
      quantity: quantity,
    });
    const p = {
      id: product.id,
      title: product.title,
      quantity: quantity,
      price: calPrice,
      image: (product?.images && product?.images[0]) || "",
      selectedSize,
      selectedColor,
      selectedFeature,
    };

    addItemToCart(p);
    toast.info("Product Added To Cart", {
      theme: "colored",
      hideProgressBar: true,
    });
    const audio = new Audio("/add-to-basket.mp3");
    audio.play().catch((err) => console.error("Failed to play sound:", err));
  };

  const handleSizeClick = (size: any, index: number) => {
    setSelectedSize(size);
    setActiveVariant(index);
    // setSelectedColor('');
    // setSelectedFeature('');
  };
  return (
    <>
      <div>
        
        <div className="font-bold flex items-center text-primary gap-x-4 my-4 text-2xl font-Poppins">
          {product?.variant && product?.variant[activeVariant]?.discount ? (
            <>
              <h2 className="text-red-500 line-through font-normal text-sm sm:text-[18px] group-hover:font-semibold">
                Aed {product?.variant[activeVariant]?.price[0]}.00
              </h2>
              <div className="h-6 w-[2px] bg-gray-300"></div>
              <h2 className="text-black  group-hover:font-semibold">
                {" "}
                Aed {product?.variant[activeVariant]?.discountedPrice}.00
              </h2>
              <div className="text-sm py-[1px] text-white rounded-full px-4 bg-red-600">
                {product?.variant[activeVariant]?.discountPercentage} OFF
              </div>
            </>
          ) : (
            <h2 className="text-primary  group-hover:font-semibold">
              Aed{" "}
              {product?.variant && product?.variant[activeVariant]?.price[0]}
            </h2>
          )}
        </div>

        {product?.variant[activeVariant]?.size && (
          <div className="flex gap-x-10 mt-4 text-sm ">
            <div className="text-black basis-1/4 font-extrabold uppercase">
              Size:
            </div>
            <div className="text-gray-800 basis-3/4">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {product?.variant?.map((variant: any, index: number) => (
                  <button
                    key={variant?.size}
                    onClick={() => handleSizeClick(variant?.size, index)}
                    className="transition-all duration-500 ease-in-out"
                    style={{
                      padding: "5px 10px",
                      minWidth: 100,
                      height: 40,
                      borderRadius: "2px",
                      border: "1px solid #ccc",
                      borderColor:
                        selectedSize === variant?.size ? "#0a5d5d" : "#ccc",
                      backgroundColor:
                        selectedSize === variant?.size ? "#0a5d5d" : "#fff",
                      color: selectedSize === variant?.size ? "#fff" : "#000",
                      cursor: "pointer",
                    }}
                  >
                    {variant?.size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {product?.variant[activeVariant]?.colors?.length ? (
          <div className="flex gap-x-10 mt-4 text-sm items-center">
            <div className="text-black basis-1/4 font-extrabold uppercase">
              Color:
            </div>
            <div className="text-gray-800 basis-3/4">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {product?.variant[activeVariant]?.colors?.map(
                  (color: string) => (
                    <div
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="flex items-center transition-all duration-500 ease-in-out rounded-full"
                    >
                      {/* {color?.toLowerCase() === "gold" && (
                        <div className="flex gap-x-2 items-center">
                          <span>Golden</span>
                          <FaCircle color={`${color}`} size={30} />
                        </div>
                      )}
                      {color?.toLowerCase() === "black" && (
                        <div className="flex gap-x-2 items-center">
                          <span>Black</span>
                          <FaCircle color={`${color}`} size={30} />
                        </div>
                      )}
                      {color?.toLowerCase() === "silver" && (
                        <div className="flex gap-x-2 items-center">
                          <span>Silver</span>{" "}
                          <FaCircle color={`${color}`} size={30} />
                        </div>
                      )} */}
                      {/* {color && (
                        <div className="flex gap-x-2 items-center">
                          <span className="capitalize">{color}</span>
                          <FaCircle color={`${color}`} className="border rounded-full border-gray-500" size={20} />
                        </div>
                      )} */}

                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className="flex transition-all gap-x-3 duration-500 ease-in-out"
                        style={{
                          padding: "10px 10px",
                          minWidth: 80,
                          borderRadius: "2px",
                          border: "1px solid #ccc",
                          backgroundColor:
                            selectedColor === color ? "#0a5d5d" : "#fff",
                          borderColor: selectedColor === color ? color : "#ccc",
                          color: selectedColor === color ? "#fff" : "#000",
                          cursor: "pointer",
                          textTransform:'capitalize'
                        }}
                      >
                        {color}{" "}
                        <FaCircle
                          color={`${color}`}
                          className="border rounded-full border-gray-500"
                          size={20}
                        />
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ) : null}
        {product?.variant[activeVariant]?.feature?.length ? (
          <div className="flex gap-x-10 mt-4 text-sm items-center">
            <div className="text-black basis-1/4 font-extrabold uppercase">
              Feature:
            </div>
            <div className="text-gray-800 basis-3/4">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {product?.variant[activeVariant]?.feature?.map(
                  (feature: string, index: number) => (
                    <button
                      key={feature}
                      onClick={() => {
                        setSelectedFeature(feature);
                        setSelectedFeatureIndex(index);
                      }}
                      className="flex  items-center gap-x-2 transition-all duration-500 ease-in-out"
                      // style={{
                      //   padding: "10px 10px",
                      //   borderRadius: "5px",
                      //   border: "1px solid #ccc",
                      //   backgroundColor: selectedFeature === feature ? "#0a5d5d" : "#fff",
                      //   color: selectedFeature === feature ? "#fff" : "#000",
                      //   cursor: "pointer",
                      // }}
                    >
                      {feature}
                      {/* LED <HiLightBulb size={30} color="gold" /> */}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex gap-x-10 mt-4 mb-4 text-sm">
          <div className="text-black basis-1/4 font-extrabold uppercase">
            Category:
          </div>
          <div className="text-gray-800 uppercase basis-3/4">
            {product?.category}
          </div>
        </div>
      </div>

      {product?.soldOut ? (
        <button
          // onClick={handleAddToCart}
          disabled
          className="bg-gray-500 mb-4 py-2 rounded w-full hover:cursor-not-allowed text-white"
        >
          Sold Out
        </button>
      ) : (
        <>
          <div className="text-black basis-1/4 font-extrabold uppercase">
            quantity:
          </div>
          <div className="flex gap-x-4 my-5">
            <div className="flex items-center border rounded px-3">
              <FaMinus
                //   color="gray"
                size={10}
                className="cursor-pointer h-full text-gray-500 hover:text-red-500 hover:scale-125"
                onClick={(e) => setQuantity(quantity - 1)}
              />
              <input
                className=" w-12 text-center focus:outline-none"
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
              />
              <FaPlus
                //   color="gray"
                size={10}
                className="cursor-pointer h-full text-gray-500 hover:text-green-500 hover:scale-125"
                onClick={(e) => setQuantity(quantity + 1)}
              />
            </div>
            <div className="grow">
              {product?.variant[activeVariant]?.soldOut ? (
                <button
                  // onClick={handleAddToCart}
                  disabled
                  className="bg-gray-500 py-2 rounded w-full hover:cursor-not-allowed text-white"
                >
                  Sold Out
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="bg-primary py-2 rounded w-full hover:bg-[#082e21] text-white"
                >
                  Add To Bag
                </button>
              )}
            </div>
          </div>

          <div>
          {!product?.variant[activeVariant]?.soldOut && (
            
                <button
                onClick={() => {
                  handleAddToCart();
                  fbEvent("InitiateCheckout", {
                    content_ids: [product.id], // ID of the product added to the cart
                    content_name: product.title, // Name of the product
                    content_category: product.category, // Category of the product
                    value: product.variant[activeVariant]?.discount
                      ? parseInt(
                          product.variant[activeVariant].discountedPrice[0]
                        )
                      : parseInt(product.variant[activeVariant].price[0]) *
                        quantity, // Total price for the quantity added to the cart
                    currency: "AED", // Currency (e.g., USD, AED)
                    quantity: quantity,
                  });
                  router.push("/checkout");
                }}
                className="bg-white py-2 rounded w-full border-2 border-primary hover:text-white hover:bg-primary text-primary"
              >
                Buy It Now
              </button>
              )}
           
          </div>
        </>
      )}
    </>
  );
};

export default Add;
