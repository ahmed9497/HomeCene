"use client";
import React, { FC, useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { HiLightBulb } from "react-icons/hi";

const SelectSize: FC<any> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(
    product?.variant[0]?.size || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product?.variant[0]?.colors[0] || ""
  );
  const [selectedFeature, setSelectedFeature] = useState(
    product?.variant[0]?.feature[0] || ""
  );
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);

  // Handle size selection
  const handleSizeClick = (size: any, index: number) => {
    setSelectedSize(size);
    setActiveVariant(index);
    // setSelectedColor('');
    // setSelectedFeature('');
  };
  return (
    <div>
      <div className="font-bold text-primary text-2xl font-Poppins mt-4">
        Aed {product?.variant[activeVariant]?.price[selectedFeatureIndex]}.00
      </div>
      <div className="flex gap-x-10 mt-4 text-sm ">
        <div className="text-black basis-1/4 font-extrabold uppercase">
          Size:
        </div>
        <div className="text-gray-800 basis-3/4">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {product?.variant?.map((variant: any, index: number) => (
              <button
                key={variant?.size}
                onClick={() => handleSizeClick(variant?.size, index)}
                className="transition-all duration-500 ease-in-out"
                style={{
                  padding: "10px 10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  backgroundColor:
                    selectedSize === variant?.size ? "#0a5d5d" : "#fff",
                  color: selectedSize === variant?.size ? "#fff" : "#000",
                  cursor: "pointer",
                }}
              >
                {variant?.size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {product?.variant[activeVariant]?.colors?.length ? (
        <div className="flex gap-x-10 mt-4 text-sm items-center">
          <div className="text-black basis-1/4 font-extrabold uppercase">
            Color:
          </div>
          <div className="text-gray-800 basis-3/4">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {product?.variant[activeVariant]?.colors?.map((color: string) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="flex items-center transition-all duration-500 ease-in-out rounded-full"
                >
                  {color?.toLowerCase() === "gold" && (
                    <div className="flex gap-x-2 items-center">
                      <span>Golden</span>
                      <FaCircle color={`${color}`} size={30} />
                    </div>
                  )}
                  {color?.toLowerCase() === "black" && (
                    <div className="flex gap-x-2 items-center">
                      <span>Black</span>
                      <FaCircle color={`${color}`} size={30} />
                    </div>
                  )}
                  {color?.toLowerCase() === "silver" && (
                    <div className="flex gap-x-2 items-center">
                      <span>Silver</span>{" "}
                      <FaCircle color={`${color}`} size={30} />
                    </div>
                  )}
                </div>
                //   <button
                //     key={color}
                //     onClick={() => setSelectedColor(color)}
                //     className="transition-all duration-500 ease-in-out"
                //     style={{
                //       padding: "10px 10px",
                //       borderRadius: "5px",
                //       border: "1px solid #ccc",
                //       backgroundColor: selectedColor === color ? "#0a5d5d" : "#fff",
                //       color: selectedColor === color ? "#fff" : "#000",
                //       cursor: "pointer",
                //     }}
                //   >
                //     {color}
                //   </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {product?.variant[activeVariant]?.feature?.length ? (
        <div className="flex gap-x-10 mt-4 text-sm items-center">
          <div className="text-black basis-1/4 font-extrabold uppercase">
            Feature:
          </div>
          <div className="text-gray-800 basis-3/4">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {product?.variant[activeVariant]?.feature?.map(
                (feature: string, index: number) => (
                  <button
                    key={feature}
                    onClick={() => {
                      setSelectedFeature(feature);
                      setSelectedFeatureIndex(index);
                    }}
                    className="flex  items-center gap-x-2 transition-all duration-500 ease-in-out"
                    // style={{
                    //   padding: "10px 10px",
                    //   borderRadius: "5px",
                    //   border: "1px solid #ccc",
                    //   backgroundColor: selectedFeature === feature ? "#0a5d5d" : "#fff",
                    //   color: selectedFeature === feature ? "#fff" : "#000",
                    //   cursor: "pointer",
                    // }}
                  >
                    {/* {feature} */}
                    LED <HiLightBulb size={30} color="gold" />
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SelectSize;
