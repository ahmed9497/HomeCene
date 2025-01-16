"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { CartItem, CartContextType } from "../types/types";

// Initial state
const initialCartState: CartContextType = {
  items: [],
  totalAmount: 0,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  updateQuantity: (productId: any, amount: any) => {},
  increaseQuantity: (itemId: string) => {},
  decreaseQuantity: (itemId: string) => {},
  clearCart: () => {},
};

// Create context
const CartContext = createContext<CartContextType>(initialCartState);

// Provider component
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);


  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedTotal = localStorage.getItem("totalAmount");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    if (savedTotal) {
      setTotalAmount(parseFloat(savedTotal));
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
    localStorage.setItem("totalAmount", totalAmount.toString());
  }, [items, totalAmount]);

  const addItemToCart = (item: CartItem) => {
    const itemIndex = items.findIndex((i) => i.id === item.id);
    let updatedItems;

    if (itemIndex >= 0) {
      // Update the quantity of the existing item
      updatedItems = [...items];
      updatedItems[itemIndex].quantity += item.quantity;
    } else {
      // Add the new item to the cart
      updatedItems = [...items, item];
    }

    // Calculate the total amount within this callback
    const newTotalAmount = updatedItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    setItems(updatedItems);
    // Update the total amount
    setTotalAmount(newTotalAmount);

    return updatedItems;
  };

  const removeItemFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

    const itemToRemove = items.find((item) => item.id === id);
    if (itemToRemove && itemToRemove) {
      setTotalAmount(
        (prevTotal) => prevTotal - itemToRemove.price * itemToRemove.quantity!
      );
    }
  };
  const updateQuantity = (itemId: any, newQuantity: number) => {
    
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex((i) => i.id == itemId);

      if (itemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: newQuantity,
        };
        return updatedItems;
      }
      return prevItems;
    });

    // Recalculate total amount when quantity changes
    setTotalAmount(
      items.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  };
  const increaseQuantity = (itemId: string) => {
    
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
    });

    const itemPrice = items.find((item) => item.id === itemId)?.price || 0;
    setTotalAmount((prevTotal) => prevTotal + itemPrice);
  };

  const decreaseQuantity = (itemId: string) => {
    const updatedItems = items.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    const itemToUpdate = items.find((item) => item.id === itemId);
    if (itemToUpdate && itemToUpdate.quantity > 1) {
      const itemPrice = itemToUpdate.price || 0;
      setTotalAmount((prevTotal) => prevTotal - itemPrice);
    }

    setItems(updatedItems);
  };

  const clearCart = () => {
    setItems([]);
    setTotalAmount(0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalAmount,
        addItemToCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the Cart context
export function useCart() {
  return useContext(CartContext);
}
