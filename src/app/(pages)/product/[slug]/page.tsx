import Add from "@/app/components/Add";
import Image from "next/image";

import { FaAngleRight, FaHome } from "react-icons/fa";

import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import Head from "next/head";
import { Metadata } from "next";
import ProductPageImage from "@/app/components/ProductpageImage";
import ViewContentEvent from "@/app/components/ViewContentEvent";
import { TbTruckDelivery } from "react-icons/tb";
import { GoClock } from "react-icons/go";
import Link from "next/link";
import ProductSlider from "@/app/components/ProductSlider";
import CustomerReviews from "@/app/components/CustomerReviews";
import Accordion from "@/app/components/Accordion";

interface PageProps {
  params: { slug: string };
}
function stripHtml(html: any) {
  if (!html) return;
  return html.replace(/<\/?[^>]+(>|$)/g, ""); // Removes all HTML tags
}
// // Generate Metadata Dynamically
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  const cleanDescription = product?.description
    ? stripHtml(product?.description)
    : "Discover premium home decor at HomeCene.";
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: `${product.title} - HomeCene`,
    description: cleanDescription,
    openGraph: {
      title: `${product.title} | HomeCene`,
      description:
        cleanDescription ||
        "Discover premium home decor and furniture at HomeCene.",
      url: `https://www.homecene.com/product/${product.title.replaceAll(
        " ",
        "-"
      )}`,
      siteName: "HomeCene",
      images: [
        {
          url: product.images[0], // Use product image
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      // type: "product",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | HomeCene`,
      description:
        cleanDescription ||
        "Discover premium home decor and furniture at HomeCene.",
      images: [product.images[0]],
    },
  };
}
const getProductSchema = (product: any) => ({
  "@context": "https://schema.org/",
  "@type": "Product",
  name: product?.title,
  image: product?.images[0], // Ensure this is a valid URL
  description: product?.description?.replace(/<\/?p>/g, ""), // Remove HTML tags
  sku: product?.id,
  brand: {
    "@type": "Brand",
    name: "HomeCene",
  },
  offers: {
    "@type": "Offer",
    url: `https://homecene.com/product/${product.slug}`,
    priceCurrency: "AED",
    price: product?.variant[0]?.discount
      ? parseInt(product?.variant[0]?.discountedPrice[0])
      : parseInt(product?.variant[0]?.price[0]),
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: {
      "@type": "Organization",
      name: "HomeCene",
    },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "15.00",
        currency: "AED",
      },
      shippingDestination: {
        "@type": "Country",
        name: "United Arab Emirates",
      },
    },
  },
});

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
async function fetchReviews(id: string): Promise<any> {
  const reviewsCollection = collection(db, "reviews");
  const productQuery = query(
    reviewsCollection,
    where("productId", "==", id),
    where("status", "==", true)
  );
  const reviewsSnapshot = await getDocs(productQuery);
  if (reviewsSnapshot.empty) return null; // ✅ Return null if no product is found

  const reviews = reviewsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp?.seconds
      ? new Date(doc.data().timestamp.seconds * 1000).toISOString()
      : null,
  }));

  return reviews;
}

const Product = async ({ params }: any) => {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  const reviews = await fetchReviews(product.id);

  if (!product) {
    return (
      <div>
        <h1>Product Not Found</h1>
        <p>The product with slug "{slug}" does not exist.</p>
      </div>
    );
  }
  const getDescription = (description: any) => {
    if (!description) return;
    const isHTML = /<\/?[a-z][\s\S]*>/i.test(description); // Check if it contains HTML tags

    return isHTML ? (
      <div
        className="my-4 text-gray-400"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    ) : (
      <p className="my-4 text-gray-400">{description}</p>
    );
  };

  return (
    <>
      <main className="container page min-h-[900px] pb-20">
        <div className="my-10 bg-primary items-center capitalize bg-opacity-20  text-[10px] sm:text-[12px] px-2 py-1 rounded-md gap-x-1 inline-flex">
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(getProductSchema(product)),
            }}
          />
        </div>
        {/* Track FB ViewContent */}
        {/* <ViewContentEvent
          contentId={product?.id}
          contentName={product?.title}
          contentCategory={product?.category}
          value={
            product.variant[0]?.discount
              ? parseInt(product.variant[0].discountedPrice[0])
              : parseInt(product.variant[0].price[0])
          }
          currency="AED"
        /> */}

        {product?.id && (
          <ViewContentEvent
            contentId={product?.id}
            contentName={product?.title}
            contentCategory={product?.category}
            value={
              product.variant[0]?.discount
                ? parseInt(product.variant[0].discountedPrice[0])
                : parseInt(product.variant[0].price[0])
            }
            currency="AED"
          />
        )}
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

            {/* <div className="flex gap-x-10 mt-4 text-sm">
            <div className="text-black basis-1/4 font-extrabold uppercase">
              TAGS:
            </div>
            <div className="text-gray-800">Mirrors</div>
          </div> */}

            <div className="mt-1">
              <Add product={product} />
            </div>
            <div className="text-black basis-1/4 mt-10 text-sm font-extrabold uppercase">
              About Product:
            </div>

            {getDescription(product?.description)}

           

        {product?.productDetail && <Accordion content={getDescription(product?.productDetail)}/>}

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
        <div className="mt-20 sm:container">
          <CustomerReviews
            title={product.title}
            productImg={product.images[0]}
            reviews={reviews}
            productId={product?.id}
            avgRating={product?.averageRating}
            rating={product?.reviewCount}
          />
        </div>
        <div className="mt-20">
          <ProductSlider category={product.category} />
        </div>
      </main>
    </>
  );
};

export default Product;
