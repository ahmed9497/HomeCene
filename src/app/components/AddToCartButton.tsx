// components/AddToCartButton.tsx
"use client";

import { FC } from "react";
import { useCart } from "../context/CartContext";
import { ProductProps } from "../types/types";

// interface AddToCartButtonProps {
//   product: number;
// }

const AddToCartButton: FC<ProductProps> = ({ id, name, price }) => {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    const product = { id, name, quantity: 1, price }; // Example
    addItemToCart(product);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="rounded-[4px]  bg-white text-[#0a5d5d] border px-5 w-full hover:bg-[#0a5d5d] transition-all ease-in delay-150 hover:text-white  py-1"
    >
      Quick Add
    </button>
  );
};

export default AddToCartButton;
