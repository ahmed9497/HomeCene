import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiShoppingCartLight } from "react-icons/pi";
import AddToCartButton from "./AddToCartButton";
import { ProductProps } from "../types/types";


const getProductSchema = (product:any) => ({
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": product?.title,
  "image": product?.images[0], // Ensure this is a valid URL
  "description": product?.description?.replace(/<\/?p>/g, ""), // Remove HTML tags
  "sku": product?.id,
  "brand": {
    "@type": "Brand",
    "name": "HomeCene"
  },
  "offers": {
    "@type": "Offer",
    "url": `https://homecene.com/product/${product.slug}`,
    "priceCurrency": "AED",
    "price": product?.variant[0]?.discount
    ? parseInt(product?.variant[0]?.discountedPrice[0])
    : parseInt(product?.variant[0]?.price[0]),
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "Organization",
      "name": "HomeCene"
    }
  }
});
const Product: any = ({
  product,
}: {
  product: ProductProps;
}) => {
 
  return (
    <div
      key={product.id}
      className="group  rounded-sm col-span-1 hover:border-primary hover:shadow-lg hover:border hover:rounded hover:p-1 hover:transition-all overflow-hidden cursor-pointer relative"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getProductSchema(product)) }}
      />
      
      <AddToCartButton product={product} btnType="cartBtn" />
      <div className=" min-h-64 w-full">
      <a
        href={"/product/" + product?.title?.replaceAll(" ", "-")}
        // className="w-full h-full"
        key={product.id}
      >
        {product?.variant && product?.variant[0]?.discount ? (
          <div className="absolute text-sm top-2 z-10 left-2 py-[1px] text-white rounded-sm px-2 bg-red-600">
            {product?.variant && product?.variant[0]?.discountPercentage[0]}
          </div>
        ) : null}
        <div className="relative overflow-hidden max-h-[320px] h-[320px] rounded-sm bg-imgBg flex items-center">
         {product?.images?.length > 0 &&
          <Image
            // src={`${product?.image}`}
            unoptimized
            src={
             product?.images[0]
            }
            alt={product?.title}
            // layout="responsive"
            quality={100}
            width={100}
            height={100}
            className="max-h-[320px] h-full w-full object-cover  transition-opacity duration-700 ease-in-out group-hover:opacity-0"
          />}
           {product?.images?.length > 0 && (
            <Image
              src={
                product?.images?.length >= 2 ?product?.images[1] : product?.images[0]
              }
              unoptimized
              alt={product?.title}
              // layout="responsive"
              quality={100}
              width={100}
              height={100}
              className="absolute max-h-[320px] h-full w-full  object-cover opacity-0 duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-125 transition-all "
            />
          )}
        </div>
        <div className="text-center mt-2 group-hover:bg-[#0a5d5d3b] group-hover:p-[2px] group-hover:rounded">
          <h1 className="font-Poppins group-hover:text-[12px] text-[14px] hover:text-primary capitalize">
            {product?.title}
            <span className="text-[12px] text-slate-500">
              &nbsp;{" "}
              {product?.variant?.length > 1
                ? `(${product?.variant?.length} Sizes)`
                : ""}
            </span>
          </h1>
          <div className="flex justify-center font-Poppins">
            {product?.variant && product?.variant[0]?.discount ? (
              <>
                <h2 className="text-primary group-hover:text-[12px] font-semibold">
                  {" "}
                  Aed {product?.variant[0]?.discountedPrice}
                </h2>

                <h2 className="text-red-500 line-through ml-3 group-hover:text-[12px] group-hover:text-red-500 group-hover:font-semibold">
                  Aed {product?.variant[0]?.price[0]}
                </h2>
              </>
            ) : (
              <h2 className="text-primary group-hover:text-[12px] font-semibold">
                Aed {product?.variant && product?.variant[0]?.price[0]}
              </h2>
            )}
          </div>
          {/* <button
        // onClick={handleAddToCart}
        className="rounded-[4px] mt-2 bg-white text-[#0a5d5d] border px-5 w-full hover:bg-[#0a5d5d] transition-all ease-in delay-150 hover:text-white  py-1"
      >
        Quick Add
      </button> */}
        </div>
      </a>

      {/* {quickAddBtn && <AddToCartButton product={product} />} */}
    </div>
    </div>
  );
};

export default Product;
