import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiShoppingCartLight } from "react-icons/pi";
import AddToCartButton from "./AddToCartButton";
import { ProductProps } from "../types/types";

const Product:any = ({
  product,
  quickAddBtn,
}: {
  product: ProductProps;
  quickAddBtn: boolean;
}) => {
  return (
    <div
      key={product.id}
      className="group col-span-1 hover:border-primary hover:shadow-lg hover:border hover:rounded hover:p-1 hover:transition-all overflow-hidden cursor-pointer relative"
    >
      <AddToCartButton product={product} btnType="cartBtn" />
      <Link
        href={"/product/" + product?.title?.replaceAll(" ", "-")}
        className="w-full"
        key={product.id}
      >
        {product?.variant&&product?.variant[0]?.discount ? (
          <div className="absolute text-sm top-2 z-10 left-2 py-[1px] text-white rounded-sm px-2 bg-red-600">
            {product?.variant&&product?.variant[0]?.discountPercentage[0]}
          </div>
        ) : null}
        <div className="relative overflow-hidden">
          <Image
            // src={`${product?.image}`}
            src="/chair1.webp"
            alt={product?.title}
            layout="responsive"
            width={100}
            height={100}
            className="max-h-[260px] object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
          />
          {/* <Image
            src="/chair1.webp"
            alt="cat"
            layout="responsive"
            width={100}
            height={100}
            className="absolute inset-0 w-full h-full object-cover opacity-0 duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-125 transition-all "
          /> */}
        </div>
        <div className="text-center group-hover:bg-[#0a5d5d3b] group-hover:p-[2px] group-hover:rounded">
          <h1 className="font-Poppins group-hover:text-[12px] text-[14px] hover:text-primary capitalize">
            {product?.title}
            <span className="text-[12px] text-slate-500">
              &nbsp; {product?.variant?.length > 1? `(${product?.variant?.length} Sizes)` : ''} 
            </span>
          </h1>
          <div className="flex justify-center">
            {product?.variant&&product?.variant[0]?.discount ? (
              <>
                <h2 className="text-primary group-hover:text-[12px] group-hover:font-semibold"> Aed {product?.variant[0]?.discountedPrice}</h2>

                <h2 className="text-gray-300 line-through ml-3 group-hover:text-[12px] group-hover:font-semibold">
                  Aed {product?.variant[0]?.price[0]}
                </h2>
              </>
            ) : (
              <h2 className="text-primary group-hover:text-[12px] group-hover:font-semibold">Aed {product?.variant&&product?.variant[0]?.price[0]}</h2>
            )}
          </div>
          {/* <button
        // onClick={handleAddToCart}
        className="rounded-[4px] mt-2 bg-white text-[#0a5d5d] border px-5 w-full hover:bg-[#0a5d5d] transition-all ease-in delay-150 hover:text-white  py-1"
      >
        Quick Add
      </button> */}
        </div>
      </Link>
      {/* {quickAddBtn && <AddToCartButton product={product} />} */}
    </div>
  );
};

export default Product;
