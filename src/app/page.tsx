import Image from "next/image";
import Slider from "./components/Slider";
import Link from "next/link";
import Product from "./components/Product";
import BigProduct from "./components/BigProduct";
import VerticalSlider from "./components/VerticalSlider";
import {
  collection,
  getDocsFromServer,
  or,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase/config";
import Marquee from "./components/Marquee";
import SlideIn from "./components/SlideIn";
import Featured from "./components/Featured";

export const dynamic = "force-dynamic"; // Disables caching for the page
export default async function Home() {
  const productCollection = collection(db, "products");
  const featuredQuery = query(
    productCollection,
    or(
      where("featuredProduct", "==", true),
      where("newArrival", "==", true),
      where("bigProduct", "==", true)
    )
  );
  const productSnapshot = await getDocsFromServer(featuredQuery);

  const products = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc?.data()?.createdAt?.seconds
    ? new Date(doc?.data()?.createdAt.seconds * 1000).toISOString()
    : null,
  }));
  console.log(products);
  const bigProducts = products?.filter((i: any) => i.bigProduct) || [];
  const newArrival = products?.filter((i:any)=>i.newArrival);
  console.log(newArrival);
  return (
    <div className="pt-[5px]">
      <Slider />
      <Marquee />
      <main className="container">
       <Featured/>


      
        <div className="sm:mt-28 sm:mb-20 mt-16 mb-16">
          <SlideIn direction="up">
            <h1 className="text-3xl sm:text-6xl font-bold uppercase text-center">
              New Arrival
            </h1>
          </SlideIn>
        </div>

        {/* Products */}

        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-12 sm:col-span-2">
            <VerticalSlider products={bigProducts.slice(0, 2)} />
          </div>
          <div className=" grid grid-cols-2 sm:grid-cols-3 col-span-12 sm:col-span-3 gap-x-3 gap-y-5">
            {products &&
              products
                ?.filter((i: any) => i.newArrival)
                .slice(0, 6)
                .map((product: any, index: number) => (
                  <div key={product.id}>
                    <Product product={product} quickAddBtn={true} index={index}/>
                  </div>
                ))}
          </div>
        </div>

        <div className="grid grid-cols-3  pt-10 sm:pt-20">
          <div className="grid-cols-1 col-span-3 sm:col-span-2 relative  overflow-hidden">
            <SlideIn direction="left">
              <Link href={"/shop/mirrors"}>
                <Image
                  src="/Mirrors.jpeg"
                  alt="mirrors"
                  // layout="responsive"
                  width={100}
                  height={100}
                  unoptimized
                  className="hover:scale-110 duration-500 object-cover sm:h-[500px] w-full transition-all "
                />
              </Link>
            </SlideIn>
          </div>
          <div className="grid-cols-1 col-span-3 sm:col-span-1 bg-gray-100 relative overflow-hidden py-2 px-2 flex items-center">
            <SlideIn direction="right">
              <div className="flex flex-col  justify-between text-black">
                <h1 className="text-md sm:text-5xl text-center font-extrabold ">
                  Reflect Your Style! Elegant Mirrors for Every Space
                </h1>
                <Link
                  href={"/shop/mirrors"}
                  className="shop-btn text-sm text-center sm:text-4xl sm:mt-10 text-primary font-Poppins font-medium underline hover:cursor-pointer"
                >
                  Shop Now
                  <span>Shop Now</span>
                </Link>
              </div>
            </SlideIn>
          </div>
        </div>


        <div className="sm:mt-28 sm:mb-20 mt-16 mb-16">
          <SlideIn direction="up">
            <h1 className="text-3xl sm:text-6xl font-bold uppercase text-center">
              Best Selling
            </h1>
          </SlideIn>
        </div>
        <div className="grid grid-cols-5 gap-5 mt-10">
          <div className=" grid grid-cols-2 sm:grid-cols-3 col-span-12 sm:col-span-3 gap-x-3 gap-y-5">
            {products &&
              products
                ?.filter((i: any) => i.featuredProduct)
                .slice(0, 6)
                .map((product: any, index: number) => (
                  <div key={product.id}>
                    <Product product={product} quickAddBtn={true} index={index}/>
                  </div>
                ))}
          </div>
          <div className="col-span-12 sm:col-span-2">
            <VerticalSlider products={bigProducts.slice(2, 4)} />
            {/* <BigProduct product={bigProducts[3]}/> */}
          </div>
        </div>

   

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 py-4 sm:py-20">
          <div className="grid-cols-1 relative rounded overflow-hidden ">
            <SlideIn direction="right">
            <Link href={"/shop/lamps"} >
              <Image
                src="/lamp.webp"
                alt="lamps"
                unoptimized
                width={100}
                height={100}
                className="cursor-pointer hover:scale-105 object-cover h-full w-full transition-all"
              />
              </Link>
            </SlideIn>
          </div>
          <div className="flex grid-cols-1 relative rounded overflow-hidden">
            <div className="my-auto">
              <SlideIn direction="left" delay={200}>
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl font-extrabold">
                    Light Up Every Corner
                  </h1>
                  <p className="text-lg sm:text-2xl text-justify">
                    Illuminate your home with lamps that merge elegance and
                    function. Designed to complement any décor, our lamps offer
                    warm, inviting light perfect for living rooms, bedrooms, or
                    workspaces.
                  </p>
                  <p className="text-lg sm:text-xl my-3 text-gray-500">
                    Get up to 40% off
                  </p>
                  <Link href={"/shop/lamps"} className="shop-btn">
                    <span className="text">Shop Now</span>
                    <span>Shop Now</span>
                  </Link>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 py-4 sm:py-20">
          <div className="flex grid-cols-1 sm:order-1 order-2 relative rounded overflow-hidden">
            <div className="my-auto">
              <SlideIn direction="left">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl font-extrabold ">
                    Crafted for Charm
                  </h1>
                  <p className="text-lg sm:text-2xl text-left">
                    Turn empty corners into artful statements.Whether placed on
                    a table, shelf, or entryway, our vases bring charm and
                    texture to your home. Designed to stand out with or without
                    flowers.
                  </p>
                  <p className="text-xl my-3 text-gray-500">
                    Get up to 40% off
                  </p>
                  <Link href={"/shop/vase-&-decore"}>
                    <div className="shop-btn mt-4">
                      <span className="text">Shop Now</span>
                      <span>Shop Now</span>
                    </div>
                  </Link>
                </div>
              </SlideIn>
            </div>
          </div>
          <div className="grid-cols-1 relative sm:order-2 order-1 rounded overflow-hidden">
            <SlideIn direction="right">
            <Link href={"/shop/vase-&-decore"} >
              <Image
                src="/vases.jpg"
                alt="lamps"
                unoptimized
                width={100}
                height={100}
                className="hover:scale-105 object-cover h-full w-full transition-all"
              />
              </Link>
            </SlideIn>
          </div>
        </div>

        <div className="mt-4 mb-20">
          <SlideIn direction="down">
            <h1 className="text-3xl sm:text-6xl font-bold uppercase text-center">
              Our Products
            </h1>
          </SlideIn>
        </div>

        {/* Products */}

        <div className="grid grid-cols-6 gap-3">
          <div className="order-2 sm:order-1 grid grid-cols-2 col-span-12 sm:col-span-2 gap-x-3 gap-y-5">
            {products &&
              products
                ?.filter((i: any) => i.featuredProduct)
                .slice(6, 10)
                .map((product: any, index: number) => (
                  <div key={product.id}>
                    <Product product={product} quickAddBtn={false} index={index}/>
                  </div>
                ))}
          </div>

          <div className="order-1  flex items-center sm:order-2 col-span-12 sm:col-span-2">
            <BigProduct product={bigProducts[4]} />
          </div>

          <div className="order-3 sm:order-3 grid grid-cols-2 col-span-12 sm:col-span-2 gap-x-3 gap-y-5">
            {products &&
              products
                ?.filter((i: any) => i.featuredProduct)
                .slice(10, 14)
                .map((product: any, index: number) => (
                  <div key={product.id}>
                    <Product product={product} quickAddBtn={false} />
                  </div>
                ))}
          </div>
        </div>

        {/* View All */}
        <SlideIn direction="left">
          <div className="flex justify-center my-16">
            <Link
              href={"shop/all-products"}
              className="shop-btn text-center w-[170px]"
            >
              View All
              <span>View All</span>
            </Link>
          </div>
        </SlideIn>
      </main>
    </div>
  );
}
