import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiShoppingCartLight } from "react-icons/pi";
import AddToCartButton from "./AddToCartButton";
import { ProductProps } from "../types/types";

const Product = ({
  product,
  quickAddBtn,
}: {
  product: ProductProps;
  quickAddBtn: boolean;
}) => {
  return (
    <div
      key={product.id}
      className="group col-span-1 overflow-hidden cursor-pointer relative"
    >
      <Link
        href={"/product/" + product.name.replaceAll(" ", "-")}
        className="w-full"
        key={product.id}
      >
        <div
          className="absolute border  group-hover:block border-primary transition-all delay-100 duration-300 ease-linear
    rounded-full p-2 right-2 top-2 bg-primary scale-0 group-hover:scale-100 "
        >
          <PiShoppingCartLight size={20} color="white" />
        </div>
        {product?.discount ? (
          <div className="absolute text-sm top-2 left-2 py-[1px] text-white rounded-sm px-2 bg-red-600">
            -54%
          </div>
        ) : null}
        <div>
          <Image
            src={`${product.image}`}
            alt={product.name}
            layout="responsive"
            width={100}
            height={100}
            className="max-h-[260px] object-cover"
          />
        </div>
        <div className="text-center">
          <h1 className="font-Poppins">{product.name}</h1>
          <div className="flex justify-center">
            {product?.discount ? (
              <>
                <h2 className="text-primary">{product.discountedPrice}</h2>

                <h2 className="text-gray-300 line-through ml-3">
                  {product.price}
                </h2>
              </>
            ) : (
              <h2 className="text-primary">{product.price}</h2>
            )}
          </div>
        </div>
      </Link>
      {quickAddBtn && <AddToCartButton {...product} />}
    </div>
  );
};

export default Product;
