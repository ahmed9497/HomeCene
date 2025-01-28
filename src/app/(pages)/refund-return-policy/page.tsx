import TopHeaderImg from "@/app/components/TopHeaderImg";
import Image from "next/image";
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className=" page bg-primary bg-opacity-5">
      <TopHeaderImg title="Refund and Return Policy" />
      <div className=" mx-auto p-6">
        <div className="max-w-4xl mx-auto bg-white  rounded-lg p-8 mb-10">
          <h1 className="text-3xl font-semibold mb-6">
            Refund and Return Policy
          </h1>

          <h2 className="text-2xl font-medium mt-6 mb-3">Returns</h2>
          <p className="mb-4">
            At Homecene, we offer <strong>FREE carriage</strong> on all eligible
            items for return. Please check the return eligibility for each
            product on its description page. Upon receiving your item(s), we
            encourage you to inspect them carefully and follow any specific
            instructions provided for placing and assembling your furniture.
          </p>
          <p className="mb-4">
            Please note that not all products currently include assembly
            instructions. We are actively working to provide assembly brochures
            with all future product lines. In the meantime, our customer service
            team is available to assist with any assembly-related queries.
          </p>
          <p className="mb-4">
            If you place an order with a specific delivery timeframe and request
            delivery on an earlier date, or if you choose to cancel the order
            within this period, please note that the order will not be eligible
            for cancellation or refund. However, you may cancel your order
            within <strong>24 hours</strong> of placement.
          </p>
          <p className="mb-4">
            Information about return eligibility is provided on the product
            description page. Please review it carefully before placing your
            order to ensure a smooth shopping experience.
          </p>

          <h2 className="text-2xl font-medium mt-6 mb-3">Return Timescale</h2>
          <p className="mb-4">
            Returns can be requested within <strong>2–3 days</strong> of
            receiving your order. To initiate a return, contact our customer
            care team with your order details and the reason for return. Returns
            requested beyond this timeframe may not be processed.
          </p>
          <p className="mb-4">
            Once approved, items will be picked up from your address and
            returned to our warehouse within <strong>2–3 working days</strong>.
          </p>

          <h2 className="text-2xl font-medium mt-6 mb-3">Refund Timescale</h2>
          <p className="mb-4">
            Refunds or store credits are issued after the returned item is
            received and verified at our warehouse.
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>
              For payments made via www.Homecene.com using cards or installment
              methods, refunds will be processed to the same card within{" "}
              <strong>5–7 working days</strong>.
            </li>
            <li>
              For Cash on Delivery or POS payments, refunds will be issued as
              store credit, which can be used for future purchases.
            </li>
          </ul>
          <p className="mb-4">
            We aim to process all refunds promptly, typically within{" "}
            <strong>2–3 working days</strong> of verifying the returned item.
          </p>

          <h2 className="text-2xl font-medium mt-6 mb-3">
            Returning Damaged Items
          </h2>
          <p className="mb-4">
            Inspect your item upon delivery. Any damage or defects must be
            reported <strong>on the same day</strong>. Damaged items must be
            returned in their original packaging to qualify for replacement. If
            you are unable to inspect the item on the day of delivery, please
            contact us to schedule a suitable time for inspection.
          </p>
          <p className="mb-4">
            Items damaged due to improper handling or failure to follow
            instructions will not be eligible for a refund or replacement.
          </p>

          <h2 className="text-2xl font-medium mt-6 mb-3">
            If You Are Unhappy with the Quality
          </h2>
          <p className="mb-4">
            If you are dissatisfied with the quality of your item, we will
            collect it and provide a full refund or replacement. If the same
            issue occurs repeatedly, we will not attempt a second replacement.
            Instead, we will initiate a return and issue a refund or store
            credit at no cost to you.
          </p>

          <h2 className="text-2xl font-medium mt-6 mb-3">Disclaimers</h2>
          <p className="mb-4">
            Our delivery and collection services are provided to your doorstep.
            While our drivers may assist in disposing of packaging upon request,
            some partner couriers may not offer this service. We recommend
            retaining the packaging until you are certain the item meets your
            requirements.
          </p>
          <p className="mb-4">
            Homecene disclaims liability for any incidental or consequential
            damages, including property damage, personal injury, or other losses
            arising from the use of its products. The maximum liability is
            limited to the purchase price of the product.
          </p>

          <h2 className="text-2xl font-medium mt-6 mb-3">Damage Reporting</h2>
          <p className="mb-4">
            For swift resolution, please follow these guidelines:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>
              Submit clear photos or videos of the damaged item, particularly if
              it arrived in a damaged box.
            </li>
            <li>
              If the damage involves a wall-mounted item (e.g., mirrors or wall
              art), include:
              <ul className="list-disc ml-6">
                <li>A clear front and back photo or video of the item</li>
                <li>Photos or videos of the mounting hook and wall screw</li>
                <li>A photo or video of the entire wall</li>
              </ul>
            </li>
          </ul>
          <p className="mb-4">
            These images must be provided on the same day the damage is
            identified. Failure to do so may result in rejection of the claim.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
