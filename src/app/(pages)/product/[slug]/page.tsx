import Add from "@/app/components/Add";
import ProductMagnifier from "@/app/components/ProductMagnifier";
import Image from "next/image";

import { FaAngleRight, FaHome, FaMinus, FaPlus } from "react-icons/fa";
import { FaCcDiscover } from "react-icons/fa6";
import {
  RiDiscordLine,
  RiMastercardFill,
  RiMastercardLine,
  RiPaypalFill,
  RiPaypalLine,
  RiVisaLine,
} from "react-icons/ri";
import { SiAmericanexpress } from "react-icons/si";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import SelectSize from "@/app/components/SelectSize";
import Head from "next/head";
import { Metadata } from "next";
import ProductPageImage from "@/app/components/ProductpageImage";
import ViewContentEvent from "@/app/components/ViewContentEvent";
import { TbTruckDelivery } from "react-icons/tb";
import { GoClock } from "react-icons/go";
import Link from "next/link";

interface PageProps {
  params: { slug: string };
}

// // Generate Metadata Dynamically
// export async function generateMetadata({ params }: any): Promise<Metadata> {
//   const { slug } = await params;
//   const product = await fetchProduct(slug);

//   if (!product) {
//     return {
//       title: "Product Not Found",
//       description: "The product you are looking for does not exist.",
//     };
//   }

//   return {
//     title: `${product.title} - HomeCene`,
//     description: product.description,
//     openGraph: {
//       title: `${product.title} - HomeCene`,
//       description: product.description,
//       images: [{ url: product.image }],
//     },
//   };
// }

// Function to fetch product details
async function fetchProduct(slug: string): Promise<any> {
  const productCollection = collection(db, "products");
  const productQuery = query(
    productCollection,
    where("title", "==", decodeURIComponent(slug)?.replaceAll("-", " "))
  );
  const productSnapshot = await getDocs(productQuery);
  const product = productSnapshot.docs[0]?.data();
  return product;
}

const Product = async ({ params }: any) => {
  const { slug } = await params;
  const product = await fetchProduct(slug);

  if (!product) {
    return (
      <div>
        <h1>Product Not Found</h1>
        <p>The product with slug "{slug}" does not exist.</p>
      </div>
    );
  }
  const getDescription = (description: any) => {
    const isHTML = /<\/?[a-z][\s\S]*>/i.test(description); // Check if it contains HTML tags

    return isHTML ? (
      <div className="my-4 text-gray-400"  dangerouslySetInnerHTML={{ __html: description }} />
    ) : (
      <p className="my-4 text-gray-400">{description}</p>
    );
  };

  return (
    <>
      <main className="container page min-h-[900px] pb-20">
        <div className="my-10 bg-primary items-center capitalize bg-opacity-20 text-[12px] px-2 py-1 rounded-md gap-x-1 inline-flex">
          <Link href={"/"} className="flex gap-x-1 items-center">
            <FaHome /> Home
          </Link>{" "}
          <FaAngleRight />{" "}
          <Link
            href={`/shop/${product.category}`}
            className="flex items-center"
          >
            {product.category}
          </Link>{" "}
          <FaAngleRight />
          {product.title}
        </div>
        {/* Track FB ViewContent */}
        <ViewContentEvent
          contentId={product.id}
          contentName={product.name}
          contentCategory={product.category}
          value={
            product.variant[0]?.discount
              ? parseInt(product.variant[0].discountedPrice[0])
              : parseInt(product.variant[0].price[0])
          }
          currency="AED"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
          <ProductPageImage product={product} />

          <div className="col-span-1">
            <div>
              <h1 className="font-semibold capitalize text-4xl">
                {product?.title}{" "}
                {product?.variant?.length > 1
                  ? `(${product?.variant?.length} Sizes)`
                  : ""}
              </h1>
            </div>
            {/* <SelectSize product={product}/> */}
            <div className="font-extrabold text-2xl font-Poppins mt-4">
              {/* ${product?.variant?.price[]} */}
            </div>
          
              {getDescription(product?.description)}
        

            {/* <div className="flex gap-x-10 mt-4 text-sm">
            <div className="text-black basis-1/4 font-extrabold uppercase">
              TAGS:
            </div>
            <div className="text-gray-800">Mirrors</div>
          </div> */}

            <div className="mt-1">
              <Add product={product} />
            </div>
            <div className="mt-10">
              <div className="text-black basis-1/4 text-sm font-extrabold uppercase">
                Guaranteed safe checkout:
              </div>

              <div className="flex items-center justify-between mt-2 sm:w-3/5">
                <Image
                  src="/payment-methods.png"
                  alt="payemnt-gateways"
                  // layout="responsive"
                  width={300}
                  height={300}
                  className="w-auto h-auto"
                />
              </div>
              <div className="mt-12">
                <div className="flex mb-4 gap-x-4 text-sm items-center">
                  <GoClock size={20} />
                  Orders ship within 1 to 3 business days
                </div>

                <div className="flex gap-x-4 text-sm items-center">
                  <TbTruckDelivery size={20} />
                  Hoorey ! This item ships free all over UAE
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;
