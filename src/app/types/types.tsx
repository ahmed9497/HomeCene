// types/cart.ts
export interface CartItem {
    selectedColor?: string;
    selectedFeature?: string;
    selectedSize?: string;
    id: string;
    title: string;
    price: number;
    quantity: number;
    image:string;
    category?:string;
  }
  
  export interface CartContextType {
    items: CartItem[];
    totalAmount: number;
    recomendedProducts:[];
    addItemToCart: (item: CartItem) => void;
    removeItemFromCart: (id: string) => void;
    increaseQuantity: (itemId: string) => void;
    decreaseQuantity: (itemId: string) => void;
    updateQuantity: (productId:any,amount:any) => void;
    clearCart: () => void;
  }
  
  export interface ProductProps {
    id?: string;
    title: string;
    category?: string;
    price: number;
    description:string;
    image:string;
    discountedPrice:string;
    discount?:boolean;
    rating:number;
    variant?:any;
    images:string[];
    soldOut:boolean;
    createdAt?:any
  }