"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config"; // Replace with your Firebase config

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
          const q = query(ordersRef, where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);

          const fetchedOrders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            orderDetails: JSON.parse(doc.data().orderDetails)
          }));
          console.log(fetchedOrders);
          setExpandedOrderId(fetchedOrders[0].id);
          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
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
  const formattedDate = (timestamp:any) => {
    const seconds = timestamp.seconds;
    const nanoseconds = timestamp.nanoseconds;
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
    <div className="max-w-4xl mx-auto p-4 space-y-4">
       <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

    {orders.map((order) => (
      <div
        key={order.id}
        className="border rounded-lg shadow-sm bg-white"
      >
        {/* Accordion Header */}
        <div
          className="flex items-center justify-between px-4 py-3 cursor-pointer"
          onClick={() => toggleAccordion(order.id)}
        >
          <div>
            <h3 className="text-lg font-bold">Order ID: HC_{order.id}</h3>
            <p className="text-sm text-gray-600">
              Status: <span className="font-medium">{order.status}</span>
            </p>
            <p className="text-sm text-gray-600">
              Order Date: <span className="font-medium">{formattedDate(order.createdAt)}</span>
            </p>
          </div>
          <button className="text-sm font-medium text-blue-600">
            {expandedOrderId === order.id ? "Hide Details" : "View Details"}
          </button>
        </div>

        {/* Accordion Body */}
        {expandedOrderId === order.id && (
          <div className="px-4 py-3 border-t">
            <h4 className="text-sm font-semibold mb-2">Order Details:</h4>
            <ul className="space-y-2">
              {order.items?.items?.map((item: any, index: number) => (
                <li
                  key={index}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>{item.title} (x{item.quantity})</span>
                  <span>{(item.unit_amount / 100).toFixed(2)} AED</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t pt-3 text-gray-800 font-medium">
              <span>Total:</span>
              <span>{order.total} AED</span>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>

  );
};

export default OrdersPage;
