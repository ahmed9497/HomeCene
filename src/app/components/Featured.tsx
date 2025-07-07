import React from 'react'
import SlideIn from './SlideIn'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { GoRocket } from 'react-icons/go'

const Featured = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 sm:gap-3 pt-5 sm:py-8">
    <div
      className={`flex flex-col justify-center rounded-sm text-center sm:grid-cols-1 p-1 sm:p-3 sm:border `}
    >
      <SlideIn direction="up">
        <div className="flex justify-center">
          <GoRocket color="red" className="size-[25px] sm:size-10" />
        </div>
        <h2 className="text-[10px] sm:text-[16px] mt-1">Free Shipping</h2>
      </SlideIn>
    </div>
    <div
      className={`flex flex-col justify-center rounded-sm text-center sm:grid-cols-1 p-1 sm:p-3 border-x sm:border `}
    >
      <SlideIn direction="down">
        <div className="flex justify-center">
          <img src="/tabby.png" className="w-10 sm:w-24" />
        </div>
        <h2 className="text-[10px] sm:text-[16px] mt-1">
          Split Payment With Tabby
        </h2>
      </SlideIn>
    </div>
    <div
      className={`flex flex-col justify-center rounded-sm text-center sm:grid-cols-1 p-1 sm:p-3 sm:border `}
    >
      <SlideIn direction="up">
        <div className="flex justify-center">
          <RiSecurePaymentLine
            color="light-blue"
            className="size-[25px] sm:size-10"
          />
        </div>
        <h2 className="text-[10px] sm:text-[16px] mt-1">
          Secure Payments
        </h2>
      </SlideIn>
    </div>
    
  </div>
  )
}

export default Featured