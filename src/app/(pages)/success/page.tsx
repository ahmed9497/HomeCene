"use client";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Confetti from "react-confetti";


const SuccessPage = ({searchParams}:{searchParams:any}) => {

  const params = useSearchParams()
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const session_id = params.get("session_id");
  console.log(session_id)
  useEffect(() => {
       
    if (session_id) {
      const fetchSessionDetails = async () => {
        try {
          const response = await fetch("/api/session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ session_id: session_id }),
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch session details");
          }
          const { stripeSession } = await response.json();
          console.log(stripeSession)
          setSession(stripeSession);
          setLoading(false);
          if (typeof window !== "undefined" && window.fbq) {
            // Track the Purchase event
            window.fbq("track", "Purchase", {
              content_ids: stripeSession?.line_items?.data.map((item: any) => item.id), // Array of product IDs
              content_name: "Order Purchase", // Description of the purchase
              value: stripeSession?.amount_total / 100, // Total amount of the order
              currency: "AED", // Currency of the transaction
              num_items: stripeSession.line_items?.data.reduce((acc: number, item: any) => acc + item.quantity, 0), // Total number of items purchased
              contents: stripeSession?.line_items?.data.map((item: any) => ({
                id: item.id,
                quantity: item.quantity,
              })), // Details of items purchased
            });
          }
        } catch (error) {
          console.log("Error fetching session details:", error);
          setLoading(false);
        }
      };

      fetchSessionDetails();
    }
  }, [session_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Session not found or payment failed.</div>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
    {/* <div className="flex page flex-col gap-6 items-center justify-center h-[calc(100vh-180px)]">
       <Confetti width={2000} height={1000} /> 
      <h1 className="text-6xl text-green-700">Successful</h1>
      <h2 className="text-xl font-medium">
        Thank you for your purchase, {session.customer_email}!
      </h2>
      <h2>Order Details</h2>

      <ul>
        {session?.line_items?.data?.map((item: any, index: number) => (
          <li key={index}>
            {item.quantity} x {item.description} - {item.amount_total / 100}{" "}
            {session.currency.toUpperCase()}
          </li>
        ))}
      </ul>

      <p>
        Payment Status: {session.payment_status === "paid" ? "Paid" : "Failed"}
      </p>

      <p>Your session ID: {session.id}</p>
    </div> */}
 <Confetti width={2000} height={1000} /> 
    <div className="flex flex-col items-center text-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8  max-w-md">
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
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Order Summary
          </h2>
          {/* <p className="text-sm text-gray-600">
            <span className="font-bold">Order ID:</span> #123456789
          </p> */}
          <p className="text-sm text-gray-600">
            <span className="font-bold">Order Detail:</span> 
          </p>
            <ul className="text-sm text-gray-600">
        {session?.line_items?.data?.map((item: any, index: number) => (
          <li key={index}>
            {item.quantity} x {item.description} - {item.amount_total / 100}{" "}
            {session.currency.toUpperCase()}
          </li>
        ))}

      </ul>
      <hr className="my-3"/>
          <p className="text-sm text-gray-600 font-bold">
            <span className="font-medium">Total Amount:</span> {session.amount_total/100} Aed
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
