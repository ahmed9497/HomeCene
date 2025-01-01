// components/AddToCartButton.tsx
"use client";

import { FC } from "react";
import { useCart } from "../context/CartContext";
import { ProductProps } from "../types/types";
import { PiShoppingCartLight } from "react-icons/pi";
import { toast } from "react-toastify";

interface AddToCartButtonProps {
  product: ProductProps;
  btnType?: string;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ product, btnType }) => {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    const p = {
      id: product.id,
      title: product.title,
      quantity: 1,
      price: parseInt(product.variant[0].price[0]),
      image: product.image,
    };
    addItemToCart(p);
    toast.info("Product Added To Cart", {
      theme: "colored",
      hideProgressBar: true,
    });
    const audio = new Audio('/add-to-basket.mp3');
    audio.play().catch((err) => console.error('Failed to play sound:', err));
  };
  if (btnType === "cartBtn") {
    return (
      <div
        className="absolute border shadow-lg group-hover:block border-primary transition-all delay-100 duration-300 ease-linear
    rounded-full p-2 right-2 top-2 z-10 bg-primary scale-0 group-hover:scale-100 text-white hover:text-primary hover:bg-white"
        onClick={handleAddToCart}
      >
        {/* <div className="fixed z-10 bottom-full mb-2  left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Quick Add
        </div> */}
        <PiShoppingCartLight size={20} />
      </div>
    );
  } else {
    return (
      <button
        onClick={handleAddToCart}
        className="rounded-[4px] mt-2 bg-white text-[#0a5d5d] border px-5 w-full hover:bg-[#0a5d5d] transition-all ease-in delay-150 hover:text-white  py-1"
      >
        Quick Add
      </button>
    );
  }
};

export default AddToCartButton;
