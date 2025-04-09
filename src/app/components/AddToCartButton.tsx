// components/AddToCartButton.tsx
"use client";

import { FC } from "react";
import { useCart } from "../context/CartContext";
import { ProductProps } from "../types/types";
import { PiShoppingCartLight } from "react-icons/pi";
import { toast } from "react-toastify";
import { fbEvent } from "../lib/fpixel";

interface AddToCartButtonProps {
  product: ProductProps;
  btnType?: string;
  classes?: string;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ product, btnType,classes }) => {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    let calPrice = product.variant[0]?.discount
      ? parseInt(product.variant[0].discountedPrice[0])
      : parseInt(product.variant[0].price[0]);

    // fbEvent("AddToCart", {
    //   content_ids: [product.id], // ID of the product added to the cart
    //   content_name: product.title, // Name of the product
    //   content_category: product.category, // Category of the product
    //   value: calPrice * 1, // Total price for the quantity added to the cart
    //   currency: "AED", // Currency (e.g., USD, AED)
    //   quantity: 1,
    // });

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        value: calPrice, 
        currency: "AED",
        items: [
          {
            item_name: product.title,
            item_id: product.id,
            price: calPrice,
            value: calPrice,
            quantity:1,
          },
        ],
      },
    })
    const p:any = {    
      id: product.id,
      title: product.title,
      category:product.category,
      quantity: 1,
      price: product.variant[0]?.discount ?parseInt(product.variant[0].discountedPrice[0]) :parseInt(product.variant[0].price[0]),
      image: product?.images[0] ||"",
      selectedSize:product.variant[0]?.size||"",
      selectedColor:product.variant[0]?.colors&&product.variant[0]?.colors[0] ||"",
      selectedFeature:product.variant[0]?.feature&&product.variant[0]?.feature[0]||""
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
        className={`${classes?classes:'right-2 scale-0'} absolute border shadow-lg group-hover:block border-white transition-all delay-100 duration-300 ease-linear
    rounded-full p-2  top-2 z-10 bg-primary  hover:border-primary group-hover:scale-100 text-white hover:text-primary hover:bg-white`}
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
