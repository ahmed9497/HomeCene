"use client";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import React from "react";
import { FieldError, useForm } from "react-hook-form";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { items, totalAmount } = useCart();
  const handleFormSubmit = async (data: any) => {
    // Pass form data to the parent function (e.g., to make a checkout API request)
    console.log(data);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const { url } = await response.json();
      window.location.href = url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="grid grid-cols-2 py-6">
        <div className="p-2">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2">
            <h1 className="text-2xl font-bold">Contact</h1>
            {/* Email */}
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
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
                <p className="text-red-500">
                  {(errors.email as FieldError).message}
                </p>
              )}
            </div>

            <h1 className="text-2xl font-bold">Delivery</h1>

            {/* Full Name */}
            <div>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Full name is required" })}
                className="border p-2 rounded w-full"
              />
              {errors.name && (
                <p className="text-red-500">
                  {(errors.name as FieldError).message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                {...register("phone", { required: "Phone number is required" })}
                className="border p-2 rounded w-full"
              />
              {errors.phone && (
                <p className="text-red-500">
                  {(errors.phone as FieldError).message}
                </p>
              )}
            </div>

            {/* Address */}
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
            {/* Country */}
            <div>
              <label htmlFor="country">Country</label>
              <select
                id="country"
                {...register("country", { required: "Country is required" })}
                className="border p-2 rounded w-full"
              >
                <option value="">Select a country</option>
                <option value="United States">United Arab Emirates</option>
              </select>
              {errors.country && (
                <p className="text-red-500">
                  {(errors.country as FieldError).message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-x-3">
              {/* City */}
              <div className="">
                <label htmlFor="postalCode">City</label>
                <input
                  id="city"
                  type="text"
                  {...register("city", {
                    required: "City is required",
                    //   pattern: {
                    //     value: /^[0-9]{5}$/,
                    //     message: "Enter a valid postal code",
                    //   },
                  })}
                  className="border p-2 rounded w-full"
                />
                {errors.city && (
                  <p className="text-red-500">
                    {(errors.city as FieldError).message}
                  </p>
                )}
              </div>

              {/* State */}
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
                {errors.country && (
                  <p className="text-red-500">
                    {(errors.state as FieldError).message}
                  </p>
                )}
              </div>

              {/* Postal Code */}
              <div className="">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  id="postalCode"
                  type="text"
                  {...register("postalCode", {
                    required: "Postal code is required",
                    pattern: {
                      value: /^[0-9]{5}$/,
                      message: "Enter a valid postal code",
                    },
                  })}
                  className="border p-2 rounded w-full"
                />
                {errors.postalCode && (
                  <p className="text-red-500">
                    {(errors.postalCode as FieldError).message}
                  </p>
                )}
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-primary text-white  !mt-4 py-3 rounded w-full hover:bg-white hover:text-primary border-primary border-2 transition"
            >
              Proceed to Checkout
            </button>
          </form>
        </div>
        <div className="bg-slate-200  p-10 ">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between  rounded mb-4 items-center"
            >
              <div className="flex items-center gap-x-3">
                <div className="relative">
                  <div className="absolute bg-primary text-white -top-2 -right-1 rounded-full flex justify-center items-center size-5 text-sm">
                    {" "}
                    {item.quantity}
                  </div>

                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded size-[80px] object-cover"
                  />
                </div>
                <div>
                  <h4>{item.name}</h4>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>

              <div>
                <p>Subtotal: ${item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="h-[1px] bg-gray-400" />

          <div>
            <div className="grid grid-cols-2">
              <div>
                Subtotal .{" "}
                {items?.length > 0 &&
                  items?.reduce((prev, cur) => {
                    return prev + cur.quantity;
                  }, 0)}{" "}
                Items
              </div>
              <div className="text-right">${totalAmount}</div>
            </div>
            <div className="grid grid-cols-2">
              <div>Standard Shipping</div>
              <div className="text-right">$30</div>
            </div>
            <div className="grid grid-cols-2 text-2xl  my-6 font-extrabold">
              <div className="">Total</div>
              <div className="text-right">${totalAmount + 30}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
