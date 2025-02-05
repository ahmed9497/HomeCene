'use client'
import React, { useState } from 'react'

const ProductPageImage = ({product}:{product:any}) => {
    const [activeImg,setActiveImg] = useState(0);
  return (
    <div className="col-span-1 ">
    {/* <ProductMagnifier/> */}
    {/* <Image
    src={product.images.length ? product.images[0] :"/chair1.webp"}
    alt={product?.title}
    layout="contain"
    // width={100}
    height={500}
  /> */}
  <div className="bg-imgBg max-w-[500px] p-1 border-primary border-opacity-30 border mx-auto  rounded-md">


   { product?.images?.length > 0 &&
    <div className="max-h-[610px] flex justify-center items-center">
      <img
        src={
          product?.images?.length ? product?.images[activeImg] : "/chair1.webp"
        }
        alt={product?.title}
        className="sm:object-cover max-h-[600px] object-contain h-auto sm:h-[600px] rounded-md"
      />
    </div>
}
      </div>
    <div className="flex justify-center flex-wrap gap-x-4 mt-3">
      {product?.images?.length >0 &&
        product.images.map((i: any,index:number) => (
          <div key={index} className={`w-20 border  h-[80px] p-1 rounded-sm bg-imgBg cursor-pointer ${activeImg === index && 'border-primary'}`} onClick={()=>setActiveImg(index)}>
            <img src={product?.images[index]} className="object-cover w-full h-full rounded-sm" alt={product.title}/>
          </div>
        ))}
    </div>
  </div>
  )
}

export default ProductPageImage