"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
// import Confetti from "react-confetti";


const SuccessPage = () => {
 
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
          setSession(stripeSession);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching session details:", error);
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
    <div className="flex page flex-col gap-6 items-center justify-center h-[calc(100vh-180px)]">
      {/* <Confetti width={2000} height={1000} /> */}
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
    </div>
    </Suspense>
  );
};

export default SuccessPage;
