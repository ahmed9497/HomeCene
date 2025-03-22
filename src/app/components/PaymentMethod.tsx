import Image from "next/image";
import { useState } from "react";
import { FaInfo } from "react-icons/fa6";
import TabbyCheckout from "./TabbyCheckout";

const PaymentMethod: any = ({
  selectedMethod,
  setSelectedMethod,
  setDirectPayment,
  totalAmount,
  error,
}: {
  selectedMethod: string;
  totalAmount: any;
  error: string;
  setSelectedMethod: (id: string) => void;
  setDirectPayment: (val: boolean) => void;
}) => {
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

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4">
        {/* {paymentMethods.map((method) => (
          <div key={method.id} className={`${method.id === "tabby" ? 'col-span-2' : ''} `}>
            {method.id === "tabby" ? (
              <div >
                <div
                  key={method.id}
                  className={`flex   items-center relative justify-center border rounded-lg min-h-[250px] cursor-pointer ${
                    selectedMethod === method.id
                      ? "border-primary bg-primary bg-opacity-10 border-2"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <label
                    key={method.id}
                    className={`flex w-full flex-col items-center relative justify-center rounded-lg px-4 min-h-[150px] cursor-pointer }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment_method"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={(e) => {
                         
                          setSelectedMethod(method.id)}
                        }
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
                    </div>
                    
                    {method.id == "tabby" && (
                      <TabbyCheckout totalAmount={totalAmount} />
                    )}
                  </label>
                </div>
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
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
                  onChange={() => {
                   
                    if(method.id==='card'){
                      setDirectPayment(true);
                    }
                    setSelectedMethod(method.id)
                  }}
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
                {method.id == "cod" && selectedMethod === method.id && (
                  <div className="group absolute top-1  right-3 border p-1 flex place-content-center place-items-center rounded-full border-gray-400">
                    <FaInfo
                      size={15}
                      className="text-gray-500 hover:text-black"
                    />
                    <div className="w-[200px] capitalize group-hover:opacity-100 transition-opacity duration-300 absolute -top-10 right-0 sm:-right-20 bg-black text-white text-sm p-2 rounded-lg shadow-lg">
                      50% downpayment required
                    </div>
                  </div>
                )}
                <div className="text-gray-700 font-semibold absolute bottom-1 text-sm font-Poppins sm:text-lg">
                  {method.label}
                </div>
                {method.id == "tabby" && (
                  <TabbyCheckout totalAmount={totalAmount} />
                )}
              </label>
            )}
          </div>
        ))} */}

        <div className="space-y-2">
          {/* Credit/Debit Card */}
          {/* <div className="border rounded-lg p-3 cursor-pointer transition hover:bg-gray-100"> */}
          <label className={`flex flex-col space-x-2 border rounded-lg p-2 cursor-pointer transition hover:bg-gray-100
          ${selectedMethod === "card" && 'border-primary border-2'}`}>
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
                    src={'/p-logos.png'}
                    width={150}
                    height={90}
                    alt="payment-logos"
                  />
                </div>
            </div>


          </label>
         
          <label className={`flex flex-col  space-x-2 border rounded-lg p-2 cursor-pointer transition hover:bg-gray-100
          ${selectedMethod === "tabby" && 'border-primary border-2'}`}>
            <div className="justify-between items-center flex">
            <div className="flex gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="tabby"
                checked={selectedMethod === "tabby"}
                onChange={() => setSelectedMethod("tabby")}
                className="accent-blue-500"
              />
              <span>Tabby (Buy Now, Pay Later)</span>
              </div>
              <div>
                  <Image
                    src={'/tabby.png'}
                    width={80}
                    height={90}
                    alt="payment-logos"
                  />
                </div>
            </div>

            {/* Show Tabby Info Below on Selection */}
            {selectedMethod === "tabby" && (
              <div className="mt-3 p-3 border rounded-md bg-white shadow-sm transition-all animate-fadeIn">
                {/* <h3 className="text-sm font-semibold mb-2">
                  Tabby - Buy Now, Pay Later
                </h3> */}
                <p className="text-sm text-gray-600">
                  Pay in 4 easy installments with Tabby. No interest, no hidden
                  fees.
                </p>
                <TabbyCheckout totalAmount={totalAmount} />
              </div>
            )}
          </label>
          {/* </div> */}

          {/* Cash on Delivery */}
          {/* <div className="border rounded-lg p-3 cursor-pointer transition hover:bg-gray-100"> */}
          <label className={`flex flex-col  space-x-2 border rounded-lg p-2 cursor-pointer transition hover:bg-gray-100 
            ${selectedMethod === "cod" && 'border-primary border-2'}`}>
            <div className="justify-between items-center flex">
            <div className="flex gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={selectedMethod === "cod"}
                onChange={() => setSelectedMethod("cod")}
                className="accent-blue-500"
              />
              <span>Cash on Delivery</span>
              </div>
              <div>
                  <Image
                    src={'/cash-on-delivery.png'}
                    width={50}
                    height={90}
                    alt="payment-logos"
                  />
                </div>
            </div>
            {/* Show COD Info Below on Selection */}
            {selectedMethod === "cod" && (
              <div className="mt-3 p-3 border rounded-md bg-white shadow-sm animate-fadeIn">
                <h3 className="text-sm font-semibold mb-2">Cash on Delivery
                  <span className="text-red-500 capitalize">&nbsp; (with 50% down payment)</span>
                </h3>
                <p className="text-sm text-gray-600">
                  Pay 50% when you receive your order. Please keep the exact amount
                  ready.
                </p>
              </div>
            )}
          </label>

 {/* Apple/Google Pay */}

          <label className={`flex flex-col  space-x-2 border rounded-lg p-2 cursor-pointer transition hover:bg-gray-100 
            ${selectedMethod === "cod" && 'border-primary border-2'}`}>
            <div className="justify-between items-center flex">
            <div className="flex gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={selectedMethod === "wallet"}
                onChange={() => setSelectedMethod("wallet")}
                className="accent-blue-500"
              />
              <span>Apple Pay | Google Pay</span>
              </div>
              <div>
                  <Image
                    src={'/apple-google-pay.png'}
                    width={100}
                    height={90}
                    alt="payment-logos"
                  />
                </div>
            </div>
            {/* Show COD Info Below on Selection */}
            {selectedMethod === "wallet" && (
              <div className="mt-3 p-3 border rounded-md bg-white shadow-sm animate-fadeIn">
              <h3 className="text-sm font-semibold mb-2">Apple Pay / Google Pay</h3>
              <p className="text-sm text-gray-600">
                Use Apple Pay or Google Pay for a fast and secure checkout.
              </p>
              {/* Payment Request Button for Google Pay & Apple Pay */}
             
            </div>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
