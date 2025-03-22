import PaymentMethod from "@/app/components/PaymentMethod";
import TabbyCheckout from "@/app/components/TabbyCheckout";
import { useCart } from "@/app/context/CartContext";
import { generateStrongPassword } from "@/app/utils/helper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "@/app/firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const paymentMethods = [
  {
    id: "card",
    label: "Credit/Debit Card",
    src: "/payment-logos.png",
  },
  { id: "cod", label: "Cash on Delivery", src: "/cash-on-delivery.png" },
  { id: "tabby", label: "Tabby", src: "/tabby.png" },
  // { id: "tamara", label: "Tamara",src:"/tamara.png" },
  // { id: "gpay", label: "Gpay",src:"/GPAY.png" },
  // { id: "apple_pay", label: "Apple Pay",src:"/applepay.webp" },
];
const shippingCharges = process.env.NEXT_PUBLIC_SHIPPING_CHARGES!;

export default function CheckoutForm({
  user,
  isDisable,
  directPayment,
  setDirectPayment,
  selectedMethod,
  setSelectedMethod,
  profile,
  paymentIntentId,
}: {
  user: any;
  isDisable: boolean;
  directPayment: boolean;
  selectedMethod: string;
  setDirectPayment: (val: boolean) => void;
  setSelectedMethod: (val: string) => void;
  profile: any;
  paymentIntentId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { items, totalAmount } = useCart();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      address: "",
      country: "UAE",
      state: null,
    },
  });

  useEffect(() => {
    if (profile&&Object.keys(profile)?.length >0) {
      setValue("name", profile?.name);
      setValue("email", profile?.email);
      setValue("phone", profile?.phone);
      setValue("address", profile?.address);
      setValue("country", profile?.country);
      setValue("state", profile?.state);
    }
  }, [profile]);

  const handleFormSubmit = async (data: any, event: any) => {
    console.log(data);
    event.preventDefault();

    setLoading(true);
    if (!user?.uid) {
      const password = generateStrongPassword(16);
      const userCredential: any = await createUserWithEmailAndPassword(
        auth,
        data.email,
        password
      );

      const user = userCredential.user;

      data.userId = user.uid;

      await setDoc(doc(db, "users", user.uid), {
        ...data,
        createdAt: new Date(),
      });
    } else {
      data.userId = profile?.userId;
    }

    if (!stripe || !elements) return;

    // const lineItems:any = [
    //     ...items.map((item: any) => ({
    //       price_data: {
    //         currency: "aed",
    //         product_data: {
    //           name: item.title,
    //           images: [item?.image],
    //         },
    //         unit_amount:
    //           selectedMethod === "cod"
    //             ? Math.round(parseFloat(item.price) * 100 * 0.5)
    //             : Math.round(parseFloat(item.price) * 100),
    //       },
    //       quantity: parseInt(item.quantity),
    //     })),
    //   ];
    //   const  totalOrderAmount = totalAmount ;
    //   totalOrderAmount < 100 &&
    //     lineItems.push({
    //       price_data: {
    //         currency: "aed",
    //         product_data: {
    //           name: "Shipping Charges",
    //           description: "Flat shipping rate",
    //         },
    //         unit_amount: Math.round(parseFloat(shippingCharges) * 100),
    //       },
    //       quantity: 1,
    //     });

    //   let productItems = items.map((item: any) => ({
    //     title: item.title,
    //     size: item?.selectedSize || "",
    //     feature: item?.selectedFeature || "",
    //     color: item?.selectedColor || "",
    //     quantity: item.quantity,
    //     // description: item?.description,
    //     images: item?.image,
    //     unit_amount: Math.round(parseFloat(item.price) * 100), // Full Price
    //     half_amount:
    //       selectedMethod === "cod"
    //         ? Math.round(parseFloat(item.price) * 100 * 0.5)
    //         : Math.round(parseFloat(item.price) * 100), // 50% for COD, 100% for others
    //     productId: item.id,
    //   }));

    //   const total = productItems.reduce(
    //     (acc: any, item: any) => acc + item.unit_amount * item.quantity,
    //     0
    //   );
    //   const upfrontAmount =
    //     selectedMethod === "cod"
    //       ? productItems.reduce(
    //           (acc: any, item: any) => acc + item.half_amount * item.quantity,
    //           0
    //         ) // 50% for COD
    //       : productItems.reduce(
    //           (acc: any, item: any) => acc + item.unit_amount * item.quantity,
    //           0
    //         );
    //   const remainingAmount = totalAmount - upfrontAmount;

    //   const orderMetadata = {
    //     ...data,
    //     status: "pending",
    //     paymentMethod: selectedMethod,
    //     orderDetails: productItems,
    //     totalAmount:total, // Full Amount
    //     upfrontAmount, // 100% for other methods
    //     remainingAmount,
    //     shippingFee: totalOrderAmount < 100 ? shippingCharges : 0,
    //     createdAt: serverTimestamp(),
    //   };
    // const orderRef = await addDoc(collection(db, "orders"), orderMetadata);
    const response = await fetch("/api/update-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentIntentId: paymentIntentId,
        items,
        data,
        totalAmount,
        selectedMethod,
      }),
    });

    const result = await response.json();
    console.log("Payment status:", result);
    console.log(paymentIntentId, "--------paymentIntentId--------");
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: "http://localhost:3000/success",
      },
    });

    if (error) {
      console.log("Payment failed:", error.message);
      toast.error(error?.message||"Something went wrong.Payment Failed!!",{autoClose:false})
      setLoading(false);
    } else {
      //   const response = await fetch("/api/update-intent", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ paymentIntentId: paymentIntent.id,items,data,totalAmount,selectedMethod }),
      //   });

      //   const result = await response.json();
      console.log("Payment status:", paymentIntent);
      setLoading(false);
      if (paymentIntent.status === "succeeded") {
        router.push(`/success?payment_id=${paymentIntent.id}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <h1 className="text-2xl mt-3 font-bold">Contact</h1>

      <div>
        <div className="flex justify-between">
          <label htmlFor="email">Email</label>
          {!user?.uid && (
            <Link href={"/auth/login"} className="underline">
              Login
            </Link>
          )}
        </div>
        <input
          id="email"
          type="email"
          disabled={isDisable}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
          className="border p-2 rounded w-full"
        />
        {errors.email && (
          <p className="text-red-500">{(errors.email as FieldError).message}</p>
        )}
      </div>

      <h1 className="text-2xl font-bold">Delivery</h1>

      <div>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Full name is required" })}
          className="border p-2 rounded w-full"
        />
        {errors.name && (
          <p className="text-red-500">{(errors.name as FieldError).message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
          })}
          className="border p-2 rounded w-full"
        />
        {errors.phone && (
          <p className="text-red-500">{(errors.phone as FieldError).message}</p>
        )}
      </div>

      <div>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          {...register("address", { required: "Address is required" })}
          className="border p-2 rounded w-full"
        />
        {errors.address && (
          <p className="text-red-500">
            {(errors.address as FieldError).message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-3">
        <div>
          <label htmlFor="country">Country</label>
          <select
            id="country"
            {...register("country", {
              required: "Country is required",
            })}
            className="border p-2 rounded w-full"
            disabled
          >
            <option value="UAE">United Arab Emirates</option>
          </select>
          {errors.country && (
            <p className="text-red-500">
              {(errors.country as FieldError).message}
            </p>
          )}
        </div>

        <div className="">
          <label htmlFor="state">State</label>
          <select
            id="state"
            {...register("state", { required: "State is required" })}
            className="border p-2 rounded w-full"
          >
            <option value="">Select a state</option>
            <option value="Abu Dhabi">Abu Dhabi</option>
            <option value="Dubai">Dubai</option>
            <option value="Sharjah">Sharjah</option>
            <option value="Ajman">Ajman</option>
            <option value="Umm Al Quwain">Umm Al Quwain</option>
            <option value="Fujairah">Fujairah</option>
            <option value="Ras Al Khaimah">Ras Al Khaimah</option>
          </select>
          {errors.state && (
            <p className="text-red-500">
              {(errors.state as FieldError).message}
            </p>
          )}
        </div>
      </div>

      <h1 className="text-2xl font-bold">Payment Methods:</h1>
      <div></div>

      <div className="space-y-2">
        <label
          className={`flex flex-col space-x-2 border rounded-lg p-3 cursor-pointer transition hover:bg-gray-100
        ${selectedMethod === "card" && "border-primary border-2"}`}
        >
          <div className="justify-between items-center flex">
            <div className="flex gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={selectedMethod === "card"}
                onChange={() => {
                  setDirectPayment(true);
                  setSelectedMethod("card");
                }}
                className="accent-blue-500"
              />
              <span>Credit/Debit Card</span>
            </div>
            <div>
              <Image
                src={"/p-logos.png"}
                width={150}
                height={90}
                alt="payment-logos"
              />
            </div>
          </div>

          {selectedMethod === "card" && (
            <div className="mt-3 p-3 border rounded-md bg-white shadow-sm transition-all animate-fadeIn">
              <h3 className="text-sm font-semibold mb-2">Enter Card Details</h3>
              <PaymentElement />
            </div>
          )}
        </label>

        <label className="flex flex-col  space-x-2 border rounded-lg p-2 cursor-pointer transition hover:bg-gray-100">
          <div className="justify-between items-center flex">
            <div className="flex gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="tabby"
                checked={selectedMethod === "tabby"}
                onChange={() => {
                  setDirectPayment(false);
                  setSelectedMethod("tabby");
                }}
                className="accent-blue-500"
              />
              <span>Tabby (Buy Now, Pay Later)</span>
            </div>
            <div>
              <Image
                src={"/tabby.png"}
                width={80}
                height={90}
                alt="payment-logos"
              />
            </div>
          </div>
        </label>

        <label
          className={`flex flex-col  space-x-2 border rounded-lg p-2 cursor-pointer transition hover:bg-gray-100">
        ${selectedMethod === "cod" && "border-primary border-2"}`}
        >
          <div className="justify-between items-center flex">
            <div className="flex gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={selectedMethod === "cod"}
                onChange={() => {
                  setDirectPayment(false);
                  setSelectedMethod("cod");
                }}
                className="accent-blue-500"
              />
              <span>Cash on Delivery</span>
            </div>
            <div>
              <Image
                src={"/cash-on-delivery.png"}
                width={50}
                height={90}
                alt="payment-logos"
              />
            </div>
          </div>
        </label>

        {/* Apple/Google Pay */}

        <label
          className={`flex flex-col  space-x-2 border rounded-lg p-2 cursor-pointer transition hover:bg-gray-100 
            ${selectedMethod === "cod" && "border-primary border-2"}`}
        >
          <div className="justify-between items-center flex">
            <div className="flex gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={selectedMethod === "wallet"}
                onChange={() => { 
                    setDirectPayment(false);
                    setSelectedMethod("wallet")}
                }
                className="accent-blue-500"
              />
              <span>Apple Pay | Google Pay</span>
            </div>
            <div>
              <Image
                src={"/apple-google-pay.png"}
                width={100}
                height={90}
                alt="payment-logos"
              />
            </div>
          </div>
          {/* Show COD Info Below on Selection */}
          {selectedMethod === "wallet" && (
            <div className="mt-3 p-3 border rounded-md bg-white shadow-sm animate-fadeIn">
              <h3 className="text-sm font-semibold mb-2">
                Apple Pay / Google Pay
              </h3>
              <p className="text-sm text-gray-600">
                Use Apple Pay or Google Pay for a fast and secure checkout.
              </p>
              {/* Payment Request Button for Google Pay & Apple Pay */}
            </div>
          )}
        </label>
      </div>

      <button
        disabled={!stripe || loading}
        name="submit-btn"
        type="submit"
        className="bg-primary text-white flex justify-center gap-x-2 items-center text-xl !mt-8 py-3  rounded w-full  border-primary border-2 transition"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          <>Pay ${totalAmount} Aed</>
        )}
      </button>
    </form>
  );
}
