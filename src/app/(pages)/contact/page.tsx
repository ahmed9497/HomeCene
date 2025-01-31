"use client";
import TopHeaderImg from "@/app/components/TopHeaderImg";
import Link from "next/link";
import React from "react";
import { FieldError, useForm } from "react-hook-form";
import { FaPhone, FaPhoneAlt, FaPhoneSlash } from "react-icons/fa";
import { FaMessage, FaRegMessage } from "react-icons/fa6";

const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const handleFormSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <div className="page bg-primary bg-opacity-5 font-Poppins">
      <TopHeaderImg title="Contact Us" />
      

      <div className="container flex gap-x-20 mt-20 pb-20 sm:px-6">
        <div className="basis-1/2">
          <h1 className="text-3xl">Get In Touch With Us</h1>
          <p className="text-md mt-6">
            Send us your message, and we will get back in less than 48 hours.
          </p>
          <div className="w-full py-6">
            <div className="w-full pb-0 ">
              <form className="w-full" onSubmit={handleSubmit(handleFormSubmit)}>
                <div>
                  <input
                    id="name"
                    type="text"
                    placeholder="YOUR NAME"
                    {...register("name", { required: "Name is required" })}
                    className="bg-transparent border-b py-1 border-b-black outline-none text-sm w-full"
                  />
                  {errors.name && (
                    <p className="text-red-500">
                      {(errors.name as FieldError).message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    id="email"
                    type="email"
                    placeholder="YOUR EMAIL"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    className="mt-10 bg-transparent border-b py-1 border-b-black outline-none text-sm w-full"
                  />
                  {errors.email && (
                    <p className="text-red-500">
                      {(errors.email as FieldError).message}
                    </p>
                  )}
                </div>

                <div className="mt-20">
                  <input
                    id="message"
                    type="text"
                    placeholder="MESSAGE"
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className="bg-transparent border-b py-1 border-b-black outline-none text-sm w-full"
                  />
                  {errors.message && (
                    <p className="text-red-500">
                      {(errors.message as FieldError).message}
                    </p>
                  )}
                </div>
                <button
                  name="submit-btn"
                  type="submit"
                  className="bg-primary text-white  text-xl !mt-8 py-3  rounded w-full hover:bg-white hover:text-primary border-primary border-2 transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="order-1 sm:order-2"></div>
          </div>
        </div>
        <div className="basis-1/2">
          <h1 className="text-3xl">Get In Touch</h1>
          <p className="text-md mt-6">
          Contact information
          </p>
          <div>
          <ul className="space-y-2 mt-4">
        <li><Link href="tel:+971 55 908 6152" className="flex items-center gap-x-2 hover:text-gray-400 hover:underline"><FaPhoneAlt/>Call us on +971 55 908 6152</Link></li>
        <li><Link href="mailto:info@homecene.com" className="flex items-center gap-x-2 hover:text-gray-400 hover:underline"><FaRegMessage/>Mail us at info@homecene.com </Link></li>
       
      </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
