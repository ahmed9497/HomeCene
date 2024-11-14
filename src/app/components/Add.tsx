"use client";
import React, { FC, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ProductProps } from "../types/types";
import { useCart } from "../context/CartContext";

const Add: FC<ProductProps> = ({id, name,price}) => {
  const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const product = { id, name, quantity, price }; 
    addItemToCart(product);
  };


  return (
    <>
      <div className="flex gap-x-4 my-5">
        <div className="flex items-center border rounded px-3">
          <FaMinus
            //   color="gray"
            size={10}
            className="cursor-pointer h-full text-gray-500 hover:text-red-500"
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
            className="cursor-pointer h-full text-gray-500 hover:text-green-500"
            onClick={(e) => setQuantity(quantity + 1)}
          />
        </div>
        <div className="grow">
          <button
            onClick={handleAddToCart}
            className="bg-primary py-2 rounded w-full hover:bg-[#082e21] text-white"
          >
            Add To Bag
          </button>
        </div>
      </div>
      <div>
        <button className="bg-white py-2 rounded w-full border-2 border-primary hover:text-white hover:bg-primary text-primary">
          Buy It Now
        </button>
      </div>
    </>
  );
};

export default Add;
