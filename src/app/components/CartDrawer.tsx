"use client"; // Required for Next.js App Router

import { useRouter } from "next/navigation";

import { FaArrowRight } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import AnimatedText from "./AnimatedText";

const CartDrawer = ({isOpen, setIsOpen,icon}:{isOpen:any, setIsOpen:any,icon:any}) => {
  
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
       
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "initiate_checkout",
      ecommerce: {
        currency:"AED",
        value: +totalAmount,
        items:  items.map((item)=>{
          return(
            {
              item_name: item.title,
              item_id: item.id,
              value:item.price, 
              quantity:item.quantity
            }
          )
        })
        
        
      },
    })
    setIsOpen(false)
    router.push("/checkout");
  };
  const handleCart = async () => {
    setIsOpen(false)
    router.push("/cart");
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
     {!isOpen && !icon &&
      <button
        className="text-lg relative group size-10 flex rounded-full justify-center items-center hover:bg-[#0a5d5d1f]"
        onClick={() => setIsOpen(true)}
      >
        <IoCartOutline size={25} className="z-10" />
      </button>
}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center sm:justify-end transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      >

      {/* Cart Drawer */}
      <div
        className={`fixed top-2 h-[calc(100%-16px)] z-[100] rounded-2xl w-[calc(100%-40px)] sm:w-[500px]  bg-white shadow-xl p-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-600"
        >
          <IoClose size={30} color="red" />
        </button>

        <h2 className="text-xl font-semibold mb-4">My Cart</h2>
          <div className="absolute w-full left-0">
            
            <AnimatedText/>
            </div>
        {/* Cart Items */}
        <div className="mt-12 space-y-4 h-[calc(100%-42px)]">
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
                className="mt-4 bg-primary bg-opacity-80 hover:bg-opacity-100 text-white px-6 py-3 rounded-lg shadow-md"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col h-[calc(100%-42px)]  gap-5 py-3">
              <div className="flex-1 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between mb-3  relative bg-slate-200 rounded  items-start sm:items-center px-3 py-2"
                  >
                    <div
                      onClick={() => removeItemFromCart(item.id)}
                      className="absolute  top-1/2  -translate-y-1/2 right-1 size-7 bg-white text-black border hover:bg-red-100 cursor-pointer rounded-full flex justify-center items-center"
                    >
                      <MdDeleteForever size={20} color="red" />
                    </div>

                    <div className="flex basis-full  sm:items-center gap-x-3 ">
                      {item?.image && (
                        <div className="w-[100px] basis-[100px]">
                          <Image
                            src={item?.image}
                            alt={item.title}
                            width={100}
                            height={100}
                            className="rounded w-[100px] h-[100px] object-cover"
                          />
                        </div>
                      )}
                      <div className="basis-full">
                        <h4 className="capitalize text-[14px] text-black">{item.title}</h4>
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
                          {/* <div className="border my-2 border-black bg-white rounded-sm basis-full sm:hidden px-3 flex items-center justify-between">
                            <div>
                              <button onClick={() => decreaseQuantity(item.id)}>
                                <FaMinus
                                  size={10}
                                  className="hover:text-red-500"
                                />
                              </button>
                            </div>
                            <div>{item.quantity}</div>
                            <div>
                              <button onClick={() => increaseQuantity(item.id)}>
                                <FaPlus
                                  size={10}
                                  className="hover:text-green-500"
                                />
                              </button>
                            </div>
                          </div> */}

                          {/* <div className="sm:hidden">
                            <p>Subtotal: Aed {item.price * item.quantity}</p>
                          </div> */}
                        </div>
                        <div className="border my-3 rounded-sm bg-white border-black  w-40 px-3 flex items-center justify-between">
                          <div>
                            <button onClick={() => decreaseQuantity(item.id)}>
                              <FaMinus
                                size={10}
                                className="hover:text-red-500"
                              />
                            </button>
                          </div>
                          <div>{item.quantity}</div>
                          <div>
                            <button onClick={() => increaseQuantity(item.id)}>
                              <FaPlus
                                size={10}
                                className="hover:text-green-500"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="flex text-black text-[14px]">
                          <p>Subtotal: Aed {item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-52">
                <div className="p-3 ">
                  <div className="flex justify-between">
                    <div>
                      Total (
                      {items?.length > 0 &&
                        items?.reduce((prev, cur) => {
                          return prev + cur.quantity;
                        }, 0)}
                      ) Items
                    </div>
                    <div>Aed {totalAmount}</div>
                  </div>
                  {totalAmount > 100 ? (
                    <div className="flex my-2 justify-between">
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
                    <div>Total Amount:</div>
                    <div className="text-gray-500 font-bold">
                      Aed{" "}
                      {totalAmount > 100
                        ? totalAmount
                        : totalAmount +
                          parseInt(process.env.NEXT_PUBLIC_SHIPPING_CHARGES!)}
                    </div>
                  </div>
                </div>
                {/* <button
                  onClick={handleCart}
                  className="bg-black flex gap-x-2 items-center justify-center w-full py-1 text-md capitalize font-Poppins hover:bg-white hover:text-primary hover:border-2 border-primary  rounded text-white mt-1"
                >
                  View Cart 
                </button> */}
                <button
                  onClick={handleCheckout}
                  className="bg-black animate-slide-left-right flex gap-x-2 items-center justify-center w-full py-2 text-md capitalize font-Poppins hover:bg-white hover:text-primary hover:border-2 border-primary  rounded text-white mt-1"
                >
                  Checkout <FaArrowRight className="animate-slide-left-right"/>
                </button>
                <div className="flex justify-center mt-2"><img src="/drawer-payment.png" className="w-2/3 " alt="payment-methods"/></div>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default CartDrawer;
