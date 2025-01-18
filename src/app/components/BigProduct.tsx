import Image from 'next/image'
import React from 'react'
import { PiShoppingCartLight } from 'react-icons/pi'

const BigProduct = () => {
  return (
    <div>
    <div className="group relative overflow-hidden cursor-pointer">
    <div
        className="absolute border shadow-lg z-10 group-hover:block border-primary transition-all delay-100 duration-300 ease-linear
    rounded-full p-2 right-2 top-2 bg-primary scale-0 group-hover:scale-100 text-white hover:text-primary hover:bg-white"
      >
        <PiShoppingCartLight size={20}  />
      </div>

      <div className="z-10 absolute text-sm top-2 left-2 py-[1px] text-white rounded-sm px-2 bg-red-600">
        -54%
      </div>

      <Image
        src="/lady.jpeg"
        alt="cat"
        layout="responsive"
        width={100}
        height={100}
        className="w-full bg-gray-100 h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
      />
      <Image
        src="/decor.png"
        alt="cat"
        layout="responsive"
        width={100}
        height={100}
        className="absolute inset-0 w-full h-full object-cover opacity-0 duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-125 transition-all "
      />
    </div>
    <div className="text-center my-3">
      <h1 className="font-Poppins">Biamond Halo Stud Aenean</h1>
      <h2 className="text-primary">Aed 900</h2>
    </div>
    </div>
  )
}

export default BigProduct