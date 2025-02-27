import TopHeaderImg from "@/app/components/TopHeaderImg";
import Image from "next/image";
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className=" bg-primary bg-opacity-5">
      <TopHeaderImg title="Terms And Conditions"/>
      <div className=" mx-auto p-6">
        <div className="max-w-4xl mx-auto bg-white  rounded-lg p-8 mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Terms and Conditions
          </h1>
          <p className="text-gray-600 mb-4">
            Welcome to HomeCene! By accessing our website, you agree to the
            following Terms and Conditions, which govern your use of our website
            and services.
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Eligibility
            </h2>
            <p className="text-gray-600">
              - You must be at least <strong>18 years old</strong> to place
              orders on our website. <br />
              - Ensure that your payment methods are valid and lawful. <br />-
              We reserve the right to decline orders that appear to be for
              commercial purposes.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Account Registration
            </h2>
            <p className="text-gray-600">
              - You can shop on HomeCene as a guest or by creating an account.{" "}
              <br />
              - Ensure your personal and payment details are accurate and up to
              date. <br />- Notify us immediately if you suspect unauthorized
              access to your account.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Payment
            </h2>
            <p className="text-gray-600">
              - HomeCene accepts Visa, Mastercard, Cash on Delivery, and other
              payment options. <br />
              - Payment is required at the time of order placement. <br />- We
              reserve the right to decline orders if payment authorization
              fails.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Prices</h2>
            <p className="text-gray-600">
              - Prices are displayed in AED and may exclude additional charges.{" "}
              <br />- Foreign currency transactions are subject to your card
              issuer’s exchange rates.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Copyrights and Intellectual Property
            </h2>
            <p className="text-gray-600">
              All intellectual property rights, including content on the
              HomeCene website, belong to HOMECENE.
              The website's content is protected under copyright laws, and all
              rights are reserved.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Governing Law
            </h2>
            <p className="text-gray-600">
              These Terms and Conditions are governed by the laws of the United
              Arab Emirates. Any legal actions arising from these terms will be
              addressed in the UAE courts.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Disclaimer
            </h2>
            <p className="text-gray-600">
              HomeCene disclaims liability for special, incidental, or
              consequential damages. Our maximum liability is limited to the
              purchase price of defective or non-conforming products.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Incorrect or Damaged Products
            </h2>
            <p className="text-gray-600">
              For incorrect or damaged products, please refer to our{" "}
              <a
                href="/refund-and-return-policy"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Refund and Return Policy
              </a>
              .
            </p>
          </section>

          <p className="text-gray-600 mt-4">
            For further questions, feel free to contact us at{" "}
            <a
              href="mailto:support@homecene.com"
              className="text-blue-500 underline hover:text-blue-700"
            >
              info@homecene.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
