

import Image from "next/image";
import Slider from "./components/Slider";
import { GoRocket } from "react-icons/go";
import Link from "next/link";
import Product from "./components/Product";
import BigProduct from "./components/BigProduct";
import { GiReturnArrow, GiTakeMyMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import VerticalSlider from "./components/VerticalSlider";
import { collection, getDocs, getDocsFromServer, or, query, where } from "firebase/firestore";
import { db } from "./firebase/config";




export const dynamic = "force-dynamic";// Disables caching for the page
export default async function  Home() {
  const productCollection = collection(db, "products");
  const featuredQuery = query(productCollection,or( where("featuredProduct", "==", true),where("newArrival", "==", true),where("bigProduct", "==", true)));
  const productSnapshot = await getDocsFromServer(featuredQuery);

  const products = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
// console.log(products);
const bigProducts = products?.filter((i:any)=>i.bigProduct) || [];
// const newArrival = products?.filter((i:any)=>i.newArrival);
// console.log(bigProducts);
  return (
    <div className="page">
      <Slider />
      <main className="container">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 pt-10 sm:pt-20">
          {/* <div className="grid-cols-1 relative rounded overflow-hidden">
            <Image
              src="/category1.webp"
              alt="cat"
              layout="responsive"
              width={100}
              height={100}
              className="hover:scale-105 transition-all"
            />
            <div className="absolute top-1/4 left-3 flex flex-col">
              <h1 className="text-4xl font-extrabold">New Plants</h1>
              <p className="text-xl my-3">Get up to 40% off</p>
              <button className="hover:bg-[#0a5d5d] w-[150px] rounded-[2px] text-lg bg-[#2c2c2c] text-white px-2 py-2">
                SHOP NOW
              </button>
            </div>
          </div> */}
          <div className="grid-cols-1 relative rounded overflow-hidden">
            {" "}
            <Image
              src="/category2.webp"
              alt="lamps"
              unoptimized
              width={100}
              height={100}
              className="hover:scale-105 object-cover h-full w-full transition-all"
            />
            <div className="absolute top-1/4 left-3 flex flex-col">
              <h1 className="text-4xl font-extrabold text-white">CHAIN LAMP</h1>
              <p className="text-xl my-3 text-gray-500">Get up to 40% off</p>
              <Link href={'/shop/lamps'} className="hover:bg-[#0a5d5d] text-center w-[150px] rounded-[2px] text-lg bg-[#fff] text-black px-2 py-2">
                SHOP NOW
              </Link>
            </div>
          </div>
          <div className="grid-cols-1 relative rounded overflow-hidden">
           
            <Image
              src="/category3.webp"
              alt="wooden decor"
              unoptimized
              width={100}
              height={100}
              className="hover:scale-105 object-cover h-full w-full transition-all"
            />
            <div className="absolute top-1/4 left-3 flex flex-col">
              <h1 className="text-4xl font-extrabold">Wooden Decor</h1>
              <p className="text-xl my-3">Get up to 40% off</p>
              <Link href={'/shop/wooden-decore'} className="hover:bg-[#0a5d5d] text-center w-[150px] rounded-[2px] text-lg bg-[#2c2c2c] text-white px-2 py-2">
                SHOP NOW
              </Link>
            </div>
            
          </div>
        </div>

        {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-16">
        
            <div  className={`text-center grid-cols-1 p-3 border `}>
              <div className="flex justify-center">
                <GoRocket size={40} color="red" />
              </div>
              <h2 className="text-sm sm:text-[16px] mt-1">Extra Shipping</h2>
            </div>
            <div  className={`text-center grid-cols-1 p-3 border `}>
              <div className="flex justify-center">
                <GiReturnArrow size={40} color="green" />
              </div>
              <h2 className="text-sm sm:text-[16px] mt-1">Return Policy</h2>
            </div>
            <div  className={`text-center grid-cols-1 p-3 border `}>
              <div className="flex justify-center">
                <RiSecurePaymentLine size={40} color="light-blue" />
              </div>
              <h2 className="text-sm sm:text-[16px] mt-1">Secure Payments</h2>
            </div>
            <div  className={`text-center grid-cols-1 p-3 border `}>
              <div className="flex justify-center">
                <GiTakeMyMoney size={40} color="purple" />
              </div>
              <h2 className="text-sm sm:text-[16px] mt-1">Money Back Guarantee</h2>
            </div>
          
        </div> */}

        <div className="mt-28 mb-20">
          <h1 className="text-3xl sm:text-6xl font-bold uppercase text-center">
            New Arrival
          </h1>
        </div>

        {/* Products */}

        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-12 sm:col-span-2">
            <VerticalSlider products={bigProducts.slice(0,2)}/>
            
          </div>
          <div className=" grid grid-cols-2 sm:grid-cols-3 col-span-12 sm:col-span-3 gap-x-3 gap-y-5">
            {products&& products?.filter((i:any)=>i.newArrival).slice(0,6).map((product:any, index:number) => (
              <div key={product.id}>
                <Product product={product} quickAddBtn={true} />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-5 mt-10">
          <div className=" grid grid-cols-2 sm:grid-cols-3 col-span-12 sm:col-span-3 gap-x-3 gap-y-5">
            {products&& products?.filter((i:any)=>i.newArrival).slice(6,12).map((product:any, index:number) => (
              <div key={product.id}>
                <Product product={product} quickAddBtn={true} />
              </div>
            ))}
          </div>
          <div className="col-span-12 sm:col-span-2">
          <VerticalSlider products={bigProducts.slice(2,4)}/>
          {/* <BigProduct product={bigProducts[3]}/> */}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 py-20">
          <div className="grid-cols-1 relative rounded overflow-hidden">
            <Link href={'/shop/mirrors'}>
            <Image
              src="/Mirrors.jpeg"
              alt="mirrors"
              // layout="responsive"
              width={100}
              height={100}
              unoptimized
              className="hover:scale-110 duration-500 object-cover h-full w-full transition-all "
            />
            <div className="absolute top-1/4 left-3 flex flex-col text-white">
              <h1 className="text-4xl font-extrabold">Mirrors</h1>
              <p className="text-xl my-3 underline">Discover Now</p>
              {/* <button className="hover:bg-[#0a5d5d] w-[150px] rounded-[2px] text-lg bg-[#2c2c2c] text-white px-2 py-2">
                SHOP NOW
              </button> */}
            </div>
            </Link>
          </div>
          <div className="grid-cols-1 relative rounded overflow-hidden">
          <Link href={'/shop/vase-&-decore'}>
            <Image
              src="/sidetable.webp"
              alt="vase&decor"
              unoptimized
              width={100}
              height={100}
              className="hover:scale-110 object-cover h-full w-full transition-all duration-500"
            />
            <div className="absolute top-1/4 left-3 flex flex-col">
              <h1 className="text-4xl font-extrabold ">Vase & Decor</h1>
              <p className="text-xl my-3 text-gray-500 underline">
                Discover Now
              </p>
              {/* <button className="hover:bg-[#0a5d5d] w-[150px] rounded-[2px] text-lg bg-[#fff] text-black px-2 py-2">
                SHOP NOW
              </button> */}
            </div>
            </Link>
          </div>
        </div>

        <div className="mt-4 mb-20">
          <h1 className="text-3xl sm:text-6xl font-bold uppercase text-center">
            Our Products
          </h1>
        </div>

        {/* Products */}

        <div className="grid grid-cols-6 gap-3">
          <div className="order-2 sm:order-1 grid grid-cols-2 col-span-12 sm:col-span-2 gap-x-3 gap-y-5">
            {products&& products?.filter((i:any)=>i.featuredProduct).slice(0, 4).map((product:any, index:number) => (
              <div key={product.id}>
                <Product product={product} quickAddBtn={false} />
              </div>
            ))}
          </div>


          <div className="order-1  flex items-center sm:order-2 col-span-12 sm:col-span-2">
            <BigProduct product={bigProducts[4]}/>
          </div>


          <div className="order-3 sm:order-3 grid grid-cols-2 col-span-12 sm:col-span-2 gap-x-3 gap-y-5">
          {products&& products?.filter((i:any)=>i.featuredProduct).slice(4,8).map((product:any, index:number) => (
              <div key={product.id}>
                <Product product={product} quickAddBtn={false} />
              </div>
            ))}
          </div>
        </div>

        {/* View All */}

        <div className="flex justify-center my-16">
          <Link href={'shop/all-products'} className="hover:bg-[#0a5d5d] text-center hover:text-white w-[170px] transition-all duration-200 border-2 rounded-[2px] text-lg bg-white text-[#0a5d5d] border-[#0a5d5d] px-5 py-2">
            View All
          </Link>
        </div>
      </main>
    </div>
  );
}
