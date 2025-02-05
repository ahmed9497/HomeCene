import Image from "next/image";
import React from "react";
import { PiShoppingCartLight } from "react-icons/pi";
import AddToCartButton from "./AddToCartButton";

const BigProduct = ({ product }: { product: any }) => {
  return (
    <div className="group">
      <div className=" rounded-sm relative overflow-hidden cursor-pointer">
        
        <AddToCartButton product={product} btnType="cartBtn" />
        <div className="z-10 absolute text-sm top-2 left-2 py-[1px] text-white rounded-sm px-2 bg-red-600">
          {product?.variant && product?.variant[0]?.discountPercentage[0]}
        </div>
        {product?.images?.length > 0 && (
          <Image
            src={product?.images[0]}
            unoptimized
            alt={product?.title}
            quality={100}
            // layout="responsive"
            width={100}
            height={100}
            sizes="100%"
            className="w-full bg-gray-100 h-[500px] object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
          />
        )}
        {product?.images?.length > 0 && (
          <Image
            src={
              product?.images?.length >= 2
                ? product?.images[1]
                : product?.images[0]
            }
            unoptimized
            alt={product?.title}
            // layout="responsive"
            width={100}
            height={100}
            className="absolute inset-0 w-full h-[500px] object-cover opacity-0 duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-125 transition-all "
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

              <h2 className="text-red-500 line-through ml-3 group-hover:text-[12px] group-hover:text-slate-500 group-hover:font-semibold">
                Aed {product?.variant[0]?.price[0]}
              </h2>
            </>
          ) : (
            <h2 className="text-primary group-hover:text-[12px] group-hover:font-semibold">
              Aed {product?.variant && product?.variant[0]?.price[0]}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default BigProduct;
