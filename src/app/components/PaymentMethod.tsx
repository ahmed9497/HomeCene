import Image from "next/image";
import { useState } from "react";
import { FaInfo } from "react-icons/fa6";

const PaymentMethod: any = ({
  selectedMethod,
  setSelectedMethod,
}: {
  selectedMethod: string;
  setSelectedMethod: (id: string) => void;
}) => {
  const paymentMethods = [
    {
      id: "card",
      label: "Credit/Debit Card",
      src: "/payment-logos.png",
    },
    { id: "cod", label: "Cash on Delivery", src: "/cash-on-delivery.png" },
    // { id: "tabby", label: "Tabby",src:"/tabby.png" },
    // { id: "tamara", label: "Tamara",src:"/tamara.png" },
    // { id: "gpay", label: "Gpay",src:"/GPAY.png" },
    // { id: "apple_pay", label: "Apple Pay",src:"/applepay.webp" },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center relative justify-center border rounded-lg px-4 min-h-[150px] cursor-pointer ${
              selectedMethod === method.id
                ? "border-primary bg-primary bg-opacity-10 border-2"
                : "border-gray-300 bg-white"
            }`}
          >
            <input
              type="radio"
              name="payment_method"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => setSelectedMethod(method.id)}
              className="form-radio h-5 w-5 text-primary mr-3"
            />
            <div>
              <Image
                src={method.src}
                width={100}
                height={100}
                alt="payment-logos"
              />
            </div>
            {method.id == "cod" && (
              <div className="group absolute top-1  right-3 border p-1 flex place-content-center place-items-center rounded-full border-gray-400">
                <FaInfo size={15} className="text-gray-500 hover:text-black" />
                <div className="w-[200px] capitalize opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-10 right-0 sm:-right-20 bg-black text-white text-sm p-2 rounded-lg shadow-lg">
                  50% downpayment required
                </div>
              </div>
            )}
            <div className="text-gray-700 font-semibold absolute bottom-1 text-sm font-Poppins sm:text-lg">
              {method.label}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
