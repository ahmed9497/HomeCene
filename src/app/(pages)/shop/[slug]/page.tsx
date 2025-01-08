import Product from "@/app/components/Product";
import ShopCategories from "@/app/components/ShopCategories";
import { db } from "@/app/firebase/config";
import { ProductProps } from "@/app/types/types";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";

type tParams = Promise<{ slug: string }>;

async function fetchProducts(
  slug = "all-product",
  cursor = null,
  pageSize = 6
) {
  const productCollection = collection(db, "products");
  let productQuery;
  if (slug === "all-products") {
    productQuery = cursor
      ? query(
          productCollection,
          orderBy("slug"),
          orderBy("id"),
          startAfter(cursor),
          limit(pageSize)
        )
      : query(
          productCollection,
          orderBy("slug", "asc"),
          orderBy("id"),
          limit(pageSize)
        );
  } else {
    productQuery = cursor
      ? query(
          productCollection,
          where("category", "==", slug.replaceAll("-"," ")),
          orderBy("slug"),
          orderBy("id"),
          startAfter(cursor),
          limit(pageSize)
        )
      : query(
          productCollection,
          where("category", "==", slug.replaceAll("-"," ")),
          orderBy("slug", "asc"),
          orderBy("id"),
          limit(pageSize)
        );
  }
  const snapshot = await getDocs(productQuery);
  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lastVisible: any = products[products.length - 1] || null;

  return { products, lastVisible };
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: tParams;
  searchParams: any;
}) {
  const { slug } = await params;
  console.log(slug);
  const { cursor, page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const pageSize = 10;

  const { products, lastVisible } = await fetchProducts(slug, cursor, pageSize);
  const nextPageCursor = lastVisible
    ? encodeURIComponent(lastVisible.slug)
    : null;
  const onPageChange = (page: number) => {
    console.log(page);
  };
  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-x-16">
        <div className="cols-span-2 p-4">
          <div className=" gap-x-3 flex items-center text-xl font-bold uppercase">
            <IoMenu size={30} />
            Categories
          </div>
          <ShopCategories />
        </div>
        <div className="col-span-3  p-4">
          <div className="mt-16 grid grid-cols-4 gap-5">
            {products &&
              products.map((product, index) => (
                <div key={product.id + index}>
                  <Product product={product} quickAddBtn={true} />
                </div>
              ))}
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            {page > 1 && (
              <a
                href={`?page=${+currentPage - 1}`}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded w-[100px] text-center"
              >
                Previous
              </a>
            )}
            {nextPageCursor && (
              <a
                href={`?page=${+currentPage + 1}&cursor=${nextPageCursor}`}
                className="px-4 py-2 bg-black  hover:bg-primary text-white rounded w-[100px] text-center"
              >
                Next
              </a>
            )}
          </div>
          {/* <Pagination onPageChange={onPageChange}/> */}
        </div>
      </div>
    </div>
  );
}
// 'use Client'
// const Pagination: React.FC<any> = ({ currentPage=1, totalPages=10, onPageChange }) => {

//   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="flex items-center justify-center space-x-2 mt-4">
//       {/* Previous Button */}
//       <button
//         // onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`px-4 py-2 rounded-md ${
//           currentPage === 1
//             ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//             : "bg-gray-800 text-white hover:bg-gray-700"
//         }`}
//       >
//         Previous
//       </button>

//       {/* Page Numbers */}
//       {pageNumbers.map((page) => (
//         <button
//           key={page}
//           // onClick={() => onPageChange(page)}
//           className={`px-4 py-2 rounded-md ${
//             currentPage === page
//               ? "bg-blue-500 text-white font-bold"
//               : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//           }`}
//         >
//           {page}
//         </button>
//       ))}

//       {/* Next Button */}
//       <button
//         // onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`px-4 py-2 rounded-md ${
//           currentPage === totalPages
//             ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//             : "bg-gray-800 text-white hover:bg-gray-700"
//         }`}
//       >
//         Next
//       </button>

//     </div>
//   );
// };
