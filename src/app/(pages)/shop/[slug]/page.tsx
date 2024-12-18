import Product from "@/app/components/Product";
import ShopCategories from "@/app/components/ShopCategories";
import { ProductProps } from "@/app/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";

type tParams = Promise<{ slug: string[] }>;

export default async function ShopPage({ params }: { params: tParams }) {
  const products: ProductProps[] = [
    {
      id: "1",
      title: "Biamond Halo Stud Aenean",
      price: 300,
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicu lus mus. Donec quam felis, ultra cies nec, pellentesque...",
      image:
        "https://vinova-furstore.myshopify.com/cdn/shop/products/40a_360x.jpg?v=1694677930",
      discountedPrice: "$200",
      discount: false,
      rating: 4,
    },
    {
      id: "2",
      title: "Biamond Halo Stud Aenean",
      price: 300,
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicu lus mus. Donec quam felis, ultra cies nec, pellentesque...",
      image:
        "https://vinova-furstore.myshopify.com/cdn/shop/products/40a_360x.jpg?v=1694677930",
      discountedPrice: "$200",
      discount: true,
      rating: 4,
    },
    {
      id: "3",
      title: "Biamond Halo Stud Aenean",
      price: 300,
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicu lus mus. Donec quam felis, ultra cies nec, pellentesque...",
      image:
        "https://vinova-furstore.myshopify.com/cdn/shop/products/2a_1dae4acc-3f60-44d2-a5cd-d85d36709d25_360x.jpg?v=1694678246",
      discountedPrice: "$200",
      discount: false,
      rating: 4,
    },
    {
      id: "4",
      title: "Biamond Halo Stud Aenean",
      price: 300,
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicu lus mus. Donec quam felis, ultra cies nec, pellentesque...",
      image:
        "https://vinova-furstore.myshopify.com/cdn/shop/products/1a_72f2474e-7e99-45e6-96e5-ddda5fc59906_360x.jpg?v=1694678001",
      discountedPrice: "$200",
      discount: true,
      rating: 4,
    },
    {
      id: "5",
      title: "Biamond Halo Stud Aenean",
      price: 300,
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicu lus mus. Donec quam felis, ultra cies nec, pellentesque...",
      image:
        "https://vinova-furstore.myshopify.com/cdn/shop/products/3a_360x.jpg?v=1694678220",
      discountedPrice: "$200",
      discount: false,
      rating: 4,
    },
    {
      id: "6",
      title: "Biamond Halo Stud Aenean",
      price: 300,
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicu lus mus. Donec quam felis, ultra cies nec, pellentesque...",
      image:
        "https://vinova-furstore.myshopify.com/cdn/shop/products/7a_360x.jpg?v=1694678092",
      discountedPrice: "$200",
      discount: false,
      rating: 4,
    },
  ];
  const { slug } = await params;

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
            {[...products,...products].map((product, index) => (
              <div key={product.id+index}>
                <Product product={product} quickAddBtn={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
