import Add from "@/app/components/Add";
import ProductMagnifier from "@/app/components/ProductMagnifier";
import Image from "next/image";

import { FaMinus, FaPlus } from "react-icons/fa";
import { FaCcDiscover } from "react-icons/fa6";
import {
  RiDiscordLine,
  RiMastercardFill,
  RiMastercardLine,
  RiPaypalFill,
  RiPaypalLine,
  RiVisaLine,
} from "react-icons/ri";
import { SiAmericanexpress } from "react-icons/si";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import SelectSize from "@/app/components/SelectSize";
const Product = async ({ params }: { params: any }) => {
  // const product = {
  //   id: "1",
  //   title: "Biamond Halo Stud Aenean",
  //   price: 300,
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicu lus mus. Donec quam felis, ultra cies nec, pellentesque...",
  //   image:
  //     "https://vinova-furstore.myshopify.com/cdn/shop/products/40a_360x.jpg?v=1694677930",
  //   discountedPrice: "$200",
  //   discount: false,
  //   rating: 4,
  // };
  const { slug } = await params;
  console.log(slug);
  // Query Firestore to find the product by slug
  const productCollection = collection(db, "products");
  const productQuery = query(
    productCollection,
    where("title", "==", slug?.replaceAll("-", " "))
  );
  const productSnapshot = await getDocs(productQuery);
  
  if (productSnapshot.empty) {
    return (
      <div>
        <h1>Product Not Found</h1>
        <p>The product with slug "{slug}" does not exist.</p>
      </div>
    );
  }
  const product = productSnapshot.docs[0].data();
  console.log(product);

  return (
    <main className="container">
      <div className="flex my-10">Home.</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20">
        <div className="bg-gray-200 flex justify-center">
          {/* <ProductMagnifier/> */}
          <Image
            src="/chair1.webp"
            alt={product?.title}
            layout="contain"
            width={500}
            height={500}
          />
        </div>

        <div> 
          {/* {JSON.stringify(product)} */}
          <div>
            <h1 className="font-semibold  text-4xl">
              {product?.title} ({product.variant?.length} Sizes)
            </h1>
          </div>
        <SelectSize product={product}/>
          <div className="font-extrabold text-2xl font-Poppins mt-4">
            {/* ${product?.variant?.price[]} */}
          </div>
          <p className="mt-4 text-gray-400">{product?.description}</p>

          <div className="flex gap-x-10 mt-4 text-sm">
            <div className="text-black basis-1/4 font-extrabold uppercase">
              TAGS:
            </div>
            <div className="text-gray-800">Armchair</div>
          </div>
          <div className="flex gap-x-10 mt-4 text-sm">
            <div className="text-black basis-1/4 font-extrabold uppercase">
              Category:
            </div>
            <div className="text-gray-800">Armchair</div>
          </div>


          <div className="mt-10">
            <div className="text-black basis-1/4 font-extrabold uppercase">
              quantity:
            </div>
            <Add product={product} />
          </div>
          <div className="mt-10">
            <div className="text-black basis-1/4 text-sm font-extrabold uppercase">
              Guaranteed safe checkout:
            </div>
            <div className="flex items-center justify-between mt-6 sm:w-3/5">
              <div className="bg-gray-200 px-4  py-1 rounded">
                <RiVisaLine size={25} color="blue" />
              </div>
              <div className="bg-gray-200 px-4  py-1 rounded">
                <RiMastercardLine size={25} color="red" />
              </div>
              <div className="bg-gray-200 px-4  py-1 rounded">
                <SiAmericanexpress size={25} color="green" />
              </div>
              <div className="bg-gray-200 px-4  py-1 rounded">
                <RiPaypalFill size={25} color="dodgerblue" />
              </div>
              <div className="bg-gray-200 px-4  py-1 rounded">
                <FaCcDiscover size={25} color="orange" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
