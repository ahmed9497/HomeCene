'use client'
import React, { useState } from 'react'

const ProductPageImage = ({product}:{product:any}) => {
    const [activeImg,setActiveImg] = useState(0);
  return (
    <div className="bg-imgBg border-primary border-opacity-30 border col-span-1 justify-center max-h-[500px] rounded-md">
    {/* <ProductMagnifier/> */}
    {/* <Image
    src={product.images.length ? product.images[0] :"/chair1.webp"}
    alt={product?.title}
    layout="contain"
    // width={100}
    height={500}
  /> */}
   { product?.images?.length > 0 &&
    <div className="flex justify-center items-center">
      <img
        src={
          product?.images?.length ? product?.images[activeImg] : "/chair1.webp"
        }
        alt={product?.title}
        className="object-contain h-[500px]"
      />
    </div>
}
    <div className="flex flex-wrap gap-x-4 mt-3">
      {product?.images?.length >0 &&
        product.images.map((i: any,index:number) => (
          <div key={index} className={`w-20 border border-opacity-30 rounded-md bg-imgBg cursor-pointer ${activeImg === index && 'border-primary'}`} onClick={()=>setActiveImg(index)}>
            <img src={product?.images[index]} className="h-auto" />
          </div>
        ))}
    </div>
  </div>
  )
}

export default ProductPageImage