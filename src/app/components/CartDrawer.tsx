"use client"; // Required for Next.js App Router

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaCross, FaMinus, FaPlus } from "react-icons/fa6";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  };
  return (
    <>
      {/* Cart Button */}
      {/* <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-black text-white p-2 rounded-full shadow-lg"
      >
        <FaShoppingCart size={24} />
      </button> */}
      <button
        className="text-lg relative group size-10 rounded-full flex justify-center items-center hover:bg-[#0a5d5d1f]"
        onClick={() => setIsOpen(true)}
      >
        <IoCartOutline size={25} className="z-10" />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Cart Drawer */}
      <div
        className={`fixed right-0 top-2 h-[calc(100%-16px)] z-20 rounded-2xl w-[500px]  bg-white shadow-xl p-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0 right-4" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-600"
        >
          <IoClose size={30} color="red" />
        </button>

        <h2 className="text-xl font-semibold mb-4">My Cart</h2>

        {/* Cart Items */}
        <div className="space-y-4">
        {items && items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded h-[500px] bg-gradient-to-br from-green-100 to-purple-200">
          <Image
            src={"/empty-cart.svg"}
            alt="Empty Cart"
            width={300}
            height={300}
          />
          <h2 className="text-2xl font-bold text-gray-700 mt-4 font-Poppins">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mt-2">
            Looks like you haven’t added anything to your cart yet.
          </p>
          <Link
            href={"/shop/all-products"}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 py-3">
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

                <div className="flex basis-full sm:basis-2/5 sm:items-center gap-x-3 ">
                  {item?.image && (
                    <div className="w-auto">
                      <Image
                        src={item?.image}
                        alt={item.title}
                        width={120}
                        height={100}
                        className="rounded w-auto h-[100px] object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="capitalize text-[14px]">{item.title}</h4>
                    <p className="text-gray-600 text-[12px]">
                      Aed {item.price}
                    </p>
                    <div className="flex gap-x-3">
                      {item?.selectedSize && (
                        <>
                          <p className="text-gray-600 text-[12px]">
                            {item?.selectedSize}
                          </p>
                          <div className="h-4 w-[1px] bg-black transition"></div>
                        </>
                      )}
                      {item?.selectedColor && (
                        <p className="text-gray-600 text-[12px]">
                          {item?.selectedColor}
                        </p>
                      )}
                      {item?.selectedFeature && (
                        <>
                          <div className="h-4 w-[1px] bg-black transition"></div>
                          <p className="text-gray-600 text-[12px]">
                            {item?.selectedFeature}
                          </p>
                        </>
                      )}
                    </div>
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
                      <p>Subtotal: Aed {item.price * item.quantity}</p>
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
                  <p>Subtotal: Aed {item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="col-span-1 bg-gray-100 p-5 rounded">
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
                <div>Aed {totalAmount}</div>
              </div>
              {totalAmount > 100 ? (
                <div className="flex my-4 justify-between">
                  <div>Shipping: </div>
                  <div>Free</div>
                </div>
              ) : (
                <div className="flex my-4 justify-between">
                  <div>Standard Shipping: </div>
                  <div>Aed {process.env.NEXT_PUBLIC_SHIPPING_CHARGES}</div>
                </div>
              )}
              <hr />
              <div className="flex mt-4 justify-between">
                <div>Total Price:</div>
                <div className="text-gray-500 font-bold">
                  Aed{" "}
                  {totalAmount > 100
                    ? totalAmount
                    : totalAmount +
                      parseInt(process.env.NEXT_PUBLIC_SHIPPING_CHARGES!)}
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-primary w-full py-3 text-lg capitalize font-Poppins hover:bg-white hover:text-primary hover:border-2 border-primary  rounded text-white mt-10"
            >
              Continue
            </button>
          </div> */}
        </div>
      )}
        </div>

        {/* Checkout Button */}
        <button className="w-full mt-6 bg-black text-white py-2 rounded-md">
          Checkout
        </button>
      </div>
    </>
  );
};

export default CartDrawer;
