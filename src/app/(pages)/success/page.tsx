"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Confetti from "react-confetti";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const SuccessPage = () => {
  const params = useSearchParams();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const session_id = params.get("session_id");
  const payment_id = params.get("payment_id");

  useEffect(() => {
    if (session_id || payment_id) {
      let retries = 0;
      const maxRetries = 5; // Number of retry attempts
      const retryDelay = 2000;
      const fetchSessionDetails = () => {
        if (!session_id && !payment_id) return;
      
        const ordersRef = collection(db, "orders");
        const conditions = [];
      
        // Dynamically add filters
        if (session_id) conditions.push(where("sessionId", "==", session_id));
        if (payment_id) conditions.push(where("paymentId", "==", payment_id));
      
        // Construct query
        const q = query(ordersRef, ...conditions);
      
        // Real-time listener
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          
          
          if (!querySnapshot.empty) {
            const orderData = querySnapshot.docs[0].data();
            setSession(orderData);
      
            if (typeof window !== "undefined" && window.fbq) {
              window.fbq("track", "Purchase", {
                content_ids: orderData?.items?.items?.map((item:any) => item.productId),
                content_name: "Order Purchase",
                value: orderData?.total,
                currency: "AED",
                num_items: orderData?.items?.items?.reduce(
                  (acc:any, item:any) => acc + item.quantity,
                  0
                ),
                contents: orderData?.items?.items?.map((item:any) => ({
                  id: item.productId,
                  quantity: item.quantity,
                })),
              });
            }
          } else {
            console.log("❌ Order not found.");
          }
          setLoading(false);
        });
      
        
        return () => unsubscribe(); // Cleanup listener when unmounted
      };

      fetchSessionDetails();
    }
  }, [session_id]);

  if (loading) {
    return (
      <div className="">
        <div className="page  pb-20 flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-1/2 max-w-md">
            {/* Success Icon */}
            <div className="w-full h-4 bg-gray-300 animate-pulse my-2 rounded"></div>
            {/* Success Message */}
            <div className="w-full h-4 bg-gray-300 animate-pulse my-2 rounded"></div>
            <div className="w-full h-6 bg-gray-300 animate-pulse my-2 rounded"></div>

            {/* Order Details */}
            <div className="bg-gray-50 border rounded-lg p-4 mb-6">
              <div className="w-full h-4 bg-gray-300 animate-pulse my-2 rounded"></div>
              <div className="w-full h-10 bg-gray-300 animate-pulse my-2 rounded"></div>
              <div className="w-full h-4 bg-gray-300 animate-pulse my-2 rounded"></div>

              <div className="w-full h-4 bg-gray-300 animate-pulse my-2 rounded"></div>
              <div className="w-full h-8 bg-gray-300 animate-pulse my-2 rounded"></div>

              <ul className="text-sm text-gray-600">
                {[1, 2, 3].map((item: any, index: number) => (
                  <li key={index} className="flex gap-x-4">
                    <div className="w-full h-10 bg-gray-300 animate-pulse my-2 rounded"></div>

                    <div className="w-full h-10 bg-gray-300 animate-pulse my-2 rounded"></div>
                  </li>
                ))}
              </ul>
              <hr className="my-3" />
              <div className="w-full h-4 bg-gray-300 animate-pulse my-2 rounded"></div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <div className="w-full h-5 bg-gray-300 animate-pulse my-2 rounded"></div>
              <div className="w-full h-5 bg-gray-300 animate-pulse my-2 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return <div className="page">Session not found or payment failed.</div>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Confetti width={2000} height={1000} />
      <div className="page pb-20 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 md:px-4  max-w-md">
          {/* Success Icon */}
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto mb-4">
            <IoIosCheckmarkCircle color="green" size={40} />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Your order has been placed successfully. Thank you for shopping with
            us!
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 border rounded-lg p-4 mb-6">
            <h2 className="text-lg text-center font-semibold text-gray-800 mb-2">
              Order Summary
            </h2>
            <p className="text-sm flex  text-gray-600">
              <span className="basis-1/2 font-bold">Order ID:</span>

              <span className="basis-1/2 text-right">HC_{session?.id}</span>
            </p>
            <p className="text-sm flex mb-2  text-gray-600">
              <span className="basis-1/2 font-bold">Payment Status: </span>

              <span className="basis-1/2 text-right capitalize">
                {session?.status}
              </span>
            </p>
            {session?.shippingFee?.length >0 ? (
              <p className="text-sm flex mb-2  text-gray-600">
                <span className="basis-1/2 font-bold">Shipping Fee: </span>

                <span className="basis-1/2 text-right capitalize">
                  {session?.shippingFee} Aed
                </span>
              </p>
            ):null}
            {session?.remainingAmount ? (
              <p className="text-sm flex mb-2  text-gray-600">
                <span className="basis-1/2 font-bold">
                  Remaining Payment Via Cod:{" "}
                </span>

                <span className="basis-1/2 text-right capitalize">
                  {session?.remainingAmount / 100} Aed
                </span>
              </p>
            ) : null}
            <p className=" text-sm flex mb-2 text-gray-600">
              <span className="basis-2/3 font-bold">Order Detail:</span>
              <span className="basis-1/3 font-bold text-right"></span>
            </p>
            <ul className="text-sm text-gray-600">
              {session?.orderDetails?.map((item: any, index: number) => (
                <li key={index} className="flex">
                  <span className="basis-2/3">
                    {item.quantity} x {item.title}{" "}
                  </span>

                  <span className="basis-1/3 text-right">
                    {" "}
                    {session.paymentMethod === "cod"
                      ? item.half_amount / 100
                      : item.unit_amount / 100}{" "}
                    Aed
                  </span>
                </li>
              ))}
            </ul>
            <hr className="my-3" />
            <p className="text-sm text-center text-gray-600 font-bold">
              <span className="font-medium">Total Amount:</span> {session.total}{" "}
              Aed
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-4">
            <Link
              href="/account/orders"
              className="px-6 py-3 sm:w-1/2 text-center bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              View Order
            </Link>
            <Link
              href="/shop/all-products"
              className="px-6 py-3 sm:w-1/2 text-center bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SuccessPage;
