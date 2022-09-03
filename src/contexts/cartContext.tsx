import { createContext, ReactNode, useState } from "react";

interface CartContextDataProvider {
  handleSetIsCartOpen: (value: boolean) => void;
  handleSetCartItems: (value: Product[] | Product | undefined) => void;
  isCartOpen: boolean;
  cartItems: Product[] | Product | undefined;
}

interface Product {
  id: string;
  name: string;
  price: number;
  discount?: number | null | undefined;
  image: { __typename?: "Image" | undefined; mainImage: { __typename?: "Asset" | undefined; url: string; }; productImages: { __typename?: "Asset" | undefined; url: string; }[]; }[]
  brand: { 
    __typename?: "Brand" | undefined; brandName: string | null | undefined; 
  } | null | undefined
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextDataProvider>({} as CartContextDataProvider);

export function CartContextProvider ({ children }: CartContextProviderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[] | Product | undefined>();

  function handleSetIsCartOpen (value: boolean) {
    setIsCartOpen(value);
  }

  function handleSetCartItems (value: Product[] | Product | undefined) {
    setCartItems(value);
  }

  return (
    <CartContext.Provider value={{handleSetIsCartOpen, isCartOpen, handleSetCartItems, cartItems}}>
      { children }
    </CartContext.Provider>
  )
}