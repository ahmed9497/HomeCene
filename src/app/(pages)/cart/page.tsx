"use client";

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaDeleteLeft } from "react-icons/fa6";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
const Cart = () => {
  const router = useRouter();
  const {
    items,
    addItemToCart,
    removeItemFromCart,
    decreaseQuantity,
    increaseQuantity,
    totalAmount,
  } = useCart();
  const handleCheckout = async () => {
    router.push("/checkout");
    // try {
    //   const response = await fetch('/api/checkout', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ items }),
    //   });

    //   const { url } = await response.json();
    //   window.location.href = url; // Redirect to Stripe Checkout
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };
  return (
    <div className="container">
      <div className="font-extrabold text-3xl text-center mt-10">
        Your Shopping Cart
      </div>
      <div className="font-extrabold text-sm text-center my-10">
        Home. Your Shopping Cart
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-3">
        <div className="col-span-1 sm:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between  relative bg-gray-200 rounded  items-start sm:items-center px-3 py-2"
            >
              <div
                onClick={() => removeItemFromCart(item.id)}
                className="absolute  -top-2 -right-1 size-7 bg-white border hover:bg-red-100 cursor-pointer rounded-full flex justify-center items-center"
              >
                <IoClose size={25} color="red" />
              </div>

              <div className="flex sm:items-center gap-x-3 flex-wrap">
                <div>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={80}
                    className="rounded"
                  />
                </div>
                <div>
                  <h4>{item.name}</h4>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="border my-2 border-black bg-white rounded-sm basis-full sm:hidden px-3 flex items-center justify-between">
                    <div>
                      <button onClick={() => decreaseQuantity(item.id)}>
                        <FaMinus size={10} className="hover:text-red-500" />
                      </button>
                    </div>
                    <div>{item.quantity}</div>
                    <div>
                      <button onClick={() => increaseQuantity(item.id)}>
                        <FaPlus size={10} className="hover:text-green-500" />
                      </button>
                    </div>
                  </div>
                <div className="sm:hidden">
                <p>Subtotal: ${item.price * item.quantity}</p>
              </div>
                </div>
              </div>

              <div className="border rounded-sm bg-white border-black hidden sm:basis-2/12 px-3 sm:flex items-center justify-between">
                <div>
                  <button onClick={() => decreaseQuantity(item.id)}>
                    <FaMinus size={10} className="hover:text-red-500" />
                  </button>
                </div>
                <div>{item.quantity}</div>
                <div>
                  <button onClick={() => increaseQuantity(item.id)}>
                    <FaPlus size={10} className="hover:text-green-500" />
                  </button>
                </div>
              </div>

              <div className="hidden sm:flex">
                <p>Subtotal: ${item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-1 bg-gray-100 p-5 rounded">
          <h1 className="text-3xl">Summary</h1>

          <hr className="bg-black" />

          <div className="flex my-6 justify-between">
            <div>Total Items:</div>
            <div>
              {items?.length > 0 &&
                items?.reduce((prev, cur) => {
                  return prev + cur.quantity;
                }, 0)}{" "}
              Items
            </div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="flex justify-between">
              <div>Total Amount:</div>
              <div>${totalAmount}</div>
            </div>
            <div className="flex my-4 justify-between">
              <div>Standard Shipping: </div>
              <div>$50</div>
            </div>
            <hr />
            <div className="flex mt-4 justify-between">
              <div>Total Price:</div>
              <div className="text-gray-500 font-bold">${totalAmount + 50}</div>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-primary w-full py-3 text-lg capitalize font-Poppins hover:bg-white hover:text-primary hover:border-2 border-primary  rounded text-white mt-10"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
