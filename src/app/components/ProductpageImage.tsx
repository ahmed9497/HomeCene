'use client'
import React, { useState } from 'react'
import { FaPlay} from 'react-icons/fa6';

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
      {product?.images[activeImg]?.endsWith(".mp4") ||
            product?.images[activeImg]?.endsWith(".webm") ? (
              <video
                src={product?.images[activeImg]}
                controls
                // preload='none'
                autoPlay
                poster={product?.images[0]}
                className="max-h-[600px] object-contain h-auto sm:h-[600px] rounded-md"
              />
            ) : (
      <img
        src={
          product?.images?.length ? product?.images[activeImg] : "/chair1.webp"
        }
        alt={product?.title}
        className="sm:object-cover max-h-[600px] object-contain h-auto sm:h-[600px] rounded-md"
      />
      )
}
    </div>
}
      </div>
    <div className="flex justify-center flex-wrap gap-x-4 mt-3">
      {product?.images?.length >0 &&
        product.images.map((i: any,index:number) => {
          const isVideo = i.endsWith(".mp4") || i.endsWith(".webm");

          return isVideo ? (
            <div
              key={index}
              className={`w-20 border relative h-[80px] p-1 rounded-sm bg-imgBg cursor-pointer ${
                activeImg === index ? "border-primary" :"opacity-50"
              }`}
              onClick={() => setActiveImg(index)}
            >
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 size-[40px] flex place-content-center place-items-center -translate-y-1/2 bg-white rounded-full'>
                <FaPlay size={20} />
              </div>
              <video
                key={index}
                muted
                // autoPlay
                poster={product?.images[0]}
                preload='none'
                className="w-full h-full rounded-lg"
              >
                <source src={product?.images[index]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
          <div key={index} className={`w-20 border  h-[80px] p-1 rounded-sm bg-imgBg cursor-pointer ${activeImg === index ? 'border-primary' :'opacity-50'}`} onClick={()=>setActiveImg(index)}>
            <img src={product?.images[index]} className="object-cover w-full h-full rounded-sm" alt={product.title}/>
          </div>
          )
        }
        )}
    </div>
  </div>
  )
}

export default ProductPageImage