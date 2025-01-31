import Image from "next/image";
import { useState } from "react";

const PaymentMethod:any = ({selectedMethod, setSelectedMethod}:{selectedMethod:string,setSelectedMethod:(id:string)=>void}) => {


  const paymentMethods = [
    { id: "credit_card", label: "Credit/Debit Card",src:"/payment-logos.png" },
    { id: "cod", label: "Cash on Delivery",src:"/cash-on-delivery.png" },
    { id: "tabby", label: "Tabby",src:"/tabby.png" },
    { id: "tamara", label: "Tamara",src:"/tamara.png" },
    { id: "gpay", label: "Gpay",src:"/GPAY.png" },
    { id: "apple_pay", label: "Apple Pay",src:"/applepay.webp" },
  ];

  return (
    <div className="w-full">
   
      <div className="grid grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center relative justify-center border rounded-lg px-4 min-h-[150px] cursor-pointer ${
              selectedMethod === method.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-white"
            }`}
          >
            <input
              type="radio"
              name="payment_method"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => setSelectedMethod(method.id)}
              className="form-radio h-5 w-5 text-blue-500 mr-3"
            />
            <div>
            <Image src={method.src} width={100} height={100} alt="payment-logos"/>
            </div>
            <div className="text-gray-700 font-semibold absolute bottom-1 text-sm font-Poppins sm:text-lg">{method.label}</div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
