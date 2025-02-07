import Product from "@/app/components/Product";
import ShopCategories from "@/app/components/ShopCategories";
import { db } from "@/app/firebase/config";
import { ProductProps } from "@/app/types/types";
import {
  collection,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

type tParams = Promise<{ slug: string }>;

async function fetchProducts(
  slug = "all-product",
  cursor = null,
  id = null,
  direction = "next",
  pageSize = 6
) {
  const productCollection = collection(db, "products");
  let productQuery;
  if (slug === "all-products") {
    productQuery = cursor
      ? query(
          productCollection,
          where("status", "==", true),
          orderBy("slug"),
          orderBy("id"),
          direction === "next" ? startAfter(cursor, id) : endBefore(cursor),
          direction === "next" ? limit(pageSize) : limitToLast(pageSize)
        )
      : query(
          productCollection,
          where("status", "==", true),
          orderBy("slug"),
          orderBy("id"),
          limit(pageSize)
        );
  } else {
    productQuery = cursor
      ? query(
          productCollection,
          where(
            "category",
            "==",
            decodeURIComponent(slug)?.replaceAll("-", " ")
          ),
          where("status", "==", true),
          orderBy("slug"),
          orderBy("id"),
          direction === "next" ? startAfter(cursor) : endBefore(cursor),
          direction === "next" ? limit(pageSize) : limitToLast(pageSize)
        )
      : query(
          productCollection,
          where(
            "category",
            "==",
            decodeURIComponent(slug)?.replaceAll("-", " ")
          ),
          where("status", "==", true),
          orderBy("slug"),
          orderBy("id"),
          limit(pageSize)
        );
  }
  const snapshot = await getDocs(productQuery);
  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lastVisible = snapshot.docs[snapshot.docs.length - 1];
  const lastCursor = lastVisible
    ? [lastVisible.data().slug, lastVisible.data().id]
    : null;

  const firstVisible = snapshot.docs[0];
  const firstCursor = firstVisible
    ? [firstVisible.data().slug, firstVisible.data().id]
    : null;

  return { products, firstCursor, lastCursor };
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: tParams;
  searchParams: any;
}) {
  const { slug } = await params;

  const { cursor, page, id, direction = "next" } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const pageSize = 30;
  const { products, firstCursor, lastCursor } = await fetchProducts(
    slug,
    cursor,
    id,
    direction,
    pageSize
  );

  const nextPageCursor = lastCursor;
 
  const prevPageCursor = firstCursor;

  return (
    <div className="container pb-20 page">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-16">
        <div className="col-span-1 sm:cols-span-2  pt-4 sm:p-4">
          <div className="sticky top-[80px]">
          <div className=" gap-x-3 flex items-center text-xl font-bold uppercase">
            <IoMenu size={30} />
            Categories
          </div>
          <ShopCategories />
          </div>
        </div>
        <div className="cols-span-1 sm:col-span-3  sm:p-4">
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-5">
            {products &&
              products.map((product, index) => (
                <div key={product.id + index}>
                  <Product product={product} quickAddBtn={true} />
                </div>
              ))}
          </div>

          <div className="my-16 flex justify-center space-x-4">
            {page > 1 && prevPageCursor && (
              <a
                href={`?page=${+currentPage - 1}&cursor=${
                  prevPageCursor[0]
                }&id=${prevPageCursor[1]}&direction=previous`}
                className="flex items-center justify-center gap-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded w-[150px] text-center"
              >
                <FaAngleLeft color="black"/> Previous 
              </a>
            )}
            {nextPageCursor && !(products.length < 28) &&(
              <a 
                href={`?page=${+currentPage + 1}&cursor=${
                  nextPageCursor[0]
                }&id=${nextPageCursor[1]}&direction=next`}
                className="flex items-center justify-center gap-x-2 px-4 py-2 bg-black  hover:bg-primary text-white rounded w-[150px] text-center"
              >
                Next <FaAngleRight color="white"/>
              </a>
            )}

            {!prevPageCursor && !nextPageCursor &&
               <div className="bg-white p-8 rounded-2xl  flex flex-col items-center">
               {/* Empty Checkout Illustration */}
               <Image src={'/no-data.svg'} alt="Empty Cart" width={300} height={300} />
               {/* Message */}
              
               <p className="text-gray-500 mt-2 text-center max-w-md">
                 No more products in this categories!
               </p>
               {/* Continue Shopping Button */}
               <Link href={'/shop/all-products'} className="mt-6 px-6 py-3 bg-primary text-white rounded shadow-md hover:bg-green-700 transition">
                 Explore More Products
               </Link>
             </div>
            
            }
          </div>
        </div>
      </div>
    </div>
  );
}
