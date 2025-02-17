"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/app/firebase/config"; // Replace with your Firebase config
import Link from "next/link";
import { FaAngleDoubleDown } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleAccordion = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const ordersRef = collection(db, "orders");
          const q = query(
            ordersRef,
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);

          const fetchedOrders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            orderDetails: doc.data().orderDetails,
          }));

          setExpandedOrderId(fetchedOrders[0].id);
          setOrders(fetchedOrders);
        } catch (error) {
          console.log("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return <h1 className="mt-5">No orders found.</h1>;
  }
  const formattedDate = (timestamp: any) => {
    const seconds = timestamp?.seconds;
    const nanoseconds = timestamp?.nanoseconds;
    const microseconds = nanoseconds / 1000; // Convert nanoseconds to microseconds

    // Create a Date object
    const date = new Date(seconds * 1000 + microseconds / 1000);
    return `${date.toLocaleString()}`;
  };

  return (
    // <div className="p-4 mb-10 mt-10">
    // <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //     {orders.map((order) => (
    //       <div
    //         key={order.id}
    //         className="border bg-white border-gray-200 p-4 rounded shadow-md"
    //       >
    //         <h2 className="text-xl font-semibold mb-2">
    //           Order ID: <span className="text-primary">{order.id}</span>
    //         </h2>
    //         <hr />
    //         <p className="text-gray-700 my-3 flex justify-between">
    //           <strong>Order Status:</strong>{" "}
    //           <span className="bg-[#0a5d5d1f] px-3 capitalize rounded-sm">
    //             Processing
    //           </span>
    //         </p>
    //         <p className="text-gray-700 my-3 flex justify-between">
    //           <strong>Payment Status:</strong>{" "}
    //           <span className="bg-[#0a5d5d1f] px-3 capitalize rounded-sm">
    //             {order.status}
    //           </span>
    //         </p>
    //         <p className="text-gray-700  mb-1 flex justify-between">
    //           <strong>Total:</strong>{" "}
    //           <span className="text-primary font-bold">AED {order.total}</span>
    //         </p>
    //         <hr />
    //         <h3 className="text-lg font-medium mt-2">Items:</h3>
    //         <ul className="list-none list-inside">
    //           {/* {JSON.stringify(order.items)} */}
    //           {order.items?.items?.map((item: any, index: number) => (
    //             <li key={index} className="bg-gray-200 p-2 mb-4 rounded">
    //               <div className="flex">
    //                 <div className="basis-1/2 ">{item?.title}</div>

    //                 <div className="basis-1/2 text-right">
    //                   {item?.quantity} x {item?.unit_amount / 100} AED
    //                 </div>
    //               </div>
    //               <hr className="border-black"/>
    //               <h1>Product Details:</h1>
    //               <div className="flex">
    //                 <div className="basis-1/2 ">Size</div>

    //                 <div className="basis-1/2 text-right">{item?.size}</div>
    //               </div>
    //               <div className="flex">
    //                 <div className="basis-1/2 ">Color</div>

    //                 <div className="basis-1/2 text-right">{item?.color}</div>
    //               </div>
    //               <div className="flex">
    //                 <div className="basis-1/2 ">Feature</div>

    //                 <div className="basis-1/2 text-right">{item?.feature}</div>
    //               </div>
    //             </li>
    //           ))}
    //         </ul>
    //         <hr />
    //         <p className="text-gray-700 my-3 flex justify-between">
    //           <strong>Shipping Status:</strong>{" "}
    //           <span className="bg-[#0a5d5d1f] px-3 capitalize rounded-sm">
    //             Dispatch
    //           </span>
    //         </p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="max-w-4xl min-h-[700px] mt-20 mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {orders.map((order, index) => (
        <div key={order.id} className="border rounded-lg shadow-sm bg-white">
          {/* Accordion Header */}
          <div
            className={`flex flex-wrap transition-all items-center justify-between px-4 py-3 cursor-pointer ${
              index === 0 && "bg-primary bg-opacity-20"
            }`}
            onClick={() => toggleAccordion(order.id)}
          >
            <div>
              <h3 className="text-lg font-bold mb-4">
                Order ID: HC_{order.id}
              </h3>
              <p className="text-sm flex gap-x-4  text-gray-600 mb-3">
                <span className="basis-40">Order Status:</span>
                <span className="capitalize  bg-primary bg-opacity-20 px-4 rounded-sm text-primary font-medium">
                  {/* {order.status} */} Processing
                </span>
              </p>
              <p className="text-sm flex gap-x-4  text-gray-600 mb-3">
                <span className="basis-40">Payment Status:</span>
                <span className="capitalize  bg-primary bg-opacity-20 px-4 rounded-sm text-primary font-medium">
                  {order.status}
                </span>
              </p>
              {order.remainingAmount ? (
                <p className="text-sm flex gap-x-4  text-gray-600 mb-3">
                  <span className="basis-40">Remaining Payment: </span>
                  <span className="capitalize  bg-primary bg-opacity-20 px-4 rounded-sm text-primary font-medium">
                    {order.remainingAmount / 100} Aed
                  </span>
                </p>
              ) : null}
              <p className="text-sm flex gap-x-4  text-gray-600 mb-3">
                <span className="basis-40">Payment Method:</span>
                <span className="capitalize  bg-primary bg-opacity-20 px-4 rounded-sm text-primary font-medium">
                  {order.paymentMethod === "cod"
                    ? "50%--50% COD--Card"
                    : order.paymentMethod}
                </span>
              </p>
              <p className="text-sm flex gap-x-4  text-gray-600 mb-3">
                <span className="basis-40">Order Date:</span>
                <span className="font-medium">
                  {formattedDate(order.createdAt)}
                </span>
              </p>
            </div>
            <button className="text-sm flex item-center font-medium text-blue-600">
              {expandedOrderId === order.id ? "Hide Details" : "View Details"}
              {expandedOrderId === order.id ? (
                <FaAngleUp size={20} />
              ) : (
                <FaAngleDown size={20} />
              )}
            </button>
          </div>

          {/* Accordion Body */}
          {expandedOrderId === order.id && (
            <div className="px-4 py-3 border-t transition-all">
              <h4 className="text-sm font-semibold mb-2">Order Details:</h4>
              <ul className="space-y-2 list-disc">
                {order?.orderDetails?.map((item: any, index: number) => (
                  <li
                    key={index}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <div className="flex items-center gap-x-3">
                      <img
                        src={item.images}
                        className="size-20 object-cover rounded-sm"
                      />
                      <div>
                        <Link
                          href={`/product/${item.title.replaceAll(" ", "-")}`}
                          className="cursor-pointer underline"
                        >
                          {item.title}
                        </Link>{" "}
                        (x{item.quantity})
                        <div className="flex gap-x-4">
                          <span>{item?.size}</span>
                          {item?.feature && (
                            <>
                              <div className="h-4 w-px bg-black"></div>
                              <span>{item?.feature}</span>
                            </>
                          )}
                          {item?.color && (
                            <>
                              <div className="h-4 w-px bg-black"></div>
                              <span>{item.color}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {order.paymentMethod === "cod" ? (
                      <span>
                        {item.unit_amount / 100} - {item.half_amount / 100} AED
                      </span>
                    ) : (
                      <span>{item.unit_amount / 100} AED</span>
                    )}
                  </li>
                ))}
              </ul>
              {order.paymentMethod === "cod" && (
                <>
                  <div className="mt-3 flex justify-between border-t pt-3 text-gray-800 font-medium">
                    <span>Paid Amount:</span>
                    <span className="text-green-500 font-bold">
                      {order.upfrontAmount / 100} AED
                    </span>
                  </div>
                  <div className="mt-3 flex justify-between border-t pt-3 text-gray-800 font-medium">
                    <span>Remaining Amount Via COD:</span>
                    <span className="text-red-500 font-bold">
                      {order.remainingAmount / 100} AED
                    </span>
                  </div>
                </>
              )}
              {order?.shippingFee && (
                <div className="mt-3 flex justify-between border-t pt-3 text-gray-800 font-medium">
                  <span>Shipping:</span>
                  <span className="text-primary font-bold">
                    {order.shippingFee} AED
                  </span>
                </div>
              )}
              <div className="mt-3 flex justify-between border-t pt-3 text-gray-800 font-medium">
                <span>Order Total Amount:</span>
                <span className="text-primary font-bold">
                  {order.totalAmount / 100} AED
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
