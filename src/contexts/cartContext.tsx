import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CartContextDataProvider {
  handleSetIsCartOpen: (value: boolean) => void;
  isCartOpen: boolean;
  handleAddProduct: (value: Product, amount: number) => void;
  handleUpdateAmount: (value: Product, amount: number, type: string) => void;
  handleRemoveProduct: (value: Product) => void;
  clearCart: () => void;
  cart: Cart[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  available: number;
  discount?: number | null | undefined;
  image: {
    __typename?: "Image" | undefined;
    mainImage: { __typename?: "Asset" | undefined; url: string };
    productImages: { __typename?: "Asset" | undefined; url: string }[];
  }[];
  brand?:
    | {
        __typename?: "Brand" | undefined;
        brandName: string | null | undefined;
      }
    | null
    | undefined;
}

export interface Cart {
  id: string;
  name: string;
  price: number;
  available: number;
  discount?: number | null | undefined;
  image: {
    __typename?: "Image" | undefined;
    mainImage: { __typename?: "Asset" | undefined; url: string };
    productImages: { __typename?: "Asset" | undefined; url: string }[];
  }[];
  brand?:
    | {
        __typename?: "Brand" | undefined;
        brandName: string | null | undefined;
      }
    | null
    | undefined;
  amount: number;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextDataProvider>(
  {} as CartContextDataProvider
);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const initialState: Cart[] = [];
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    let storedCart;
    if (typeof window !== "undefined") {
      storedCart = localStorage.getItem("@dopeshoe:cart");

      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);

  function handleSetIsCartOpen(value: boolean) {
    setIsCartOpen(value);
  }

  function handleAddProduct(value: Product, amount: number) {
    try {
      const productAlreadyInCart = cart.find(
        (product) => product.id === value.id
      );

      if (!productAlreadyInCart) {
        if (value.available >= amount) {
          setCart([...cart, { ...value, amount }]);

          if (typeof window !== "undefined") {
            localStorage.setItem(
              "@dopeshoe:cart",
              JSON.stringify([...cart, { ...value, amount }])
            );
          }
        }
      }

      if (productAlreadyInCart) {
        if (
          value.available >= amount &&
          value.available >= productAlreadyInCart.amount + amount
        ) {
          const updatedCart = cart.map((cartItem) =>
            cartItem.id === value.id
              ? {
                  ...cartItem,
                  amount: Number(cartItem.amount) + amount,
                }
              : cartItem
          );

          setCart(updatedCart);
          if (typeof window !== "undefined") {
            localStorage.setItem("@dopeshoe:cart", JSON.stringify(updatedCart));
          }
          return;
        } else {
          toast.error("Quantidade solicitada fora de esoque");
        }
      }
    } catch {}
  }

  function handleRemoveProduct(value: Product) {
    try {
      const updateRemoveProducts = cart.filter(
        (product) => product.id !== value.id
      );

      //cart is empty
      if (updateRemoveProducts === undefined) {
        setCart([]);

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "@dopeshoe:cart",
            JSON.stringify(updateRemoveProducts)
          );
        }
      }
      if (updateRemoveProducts) {
        setCart(updateRemoveProducts);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "@dopeshoe:cart",
            JSON.stringify(updateRemoveProducts)
          );
        }
      }
    } catch {
      toast.error("Falha ao remover produto");
    }
  }

  function handleUpdateAmount(value: Product, amount: number, type: string) {
    try {
      const productAlreadyInCart = cart.find(
        (product) => product.id === value.id
      );

      if (type === "increase") {
        if (productAlreadyInCart) {
          if (value.available >= amount) {
            const updatedCart = cart.map((cartItem) =>
              cartItem.id === value.id
                ? {
                    ...cartItem,
                    amount: Number(amount),
                  }
                : cartItem
            );

            setCart(updatedCart);
            if (typeof window !== "undefined") {
              localStorage.setItem(
                "@dopeshoe:cart",
                JSON.stringify(updatedCart)
              );
            }
            return;
          } else {
            toast.error("Quantidade solicitada fora de esoque");
          }
        }
      } else {
        if (productAlreadyInCart) {
          if (amount > 0) {
            const updatedCart = cart.map((cartItem) =>
              cartItem.id === value.id
                ? {
                    ...cartItem,
                    amount: Number(amount),
                  }
                : cartItem
            );

            setCart(updatedCart);
            if (typeof window !== "undefined") {
              localStorage.setItem(
                "@dopeshoe:cart",
                JSON.stringify(updatedCart)
              );
            }
            return;
          } else {
            toast.error("Algo deu errado");
          }
        }
      }
    } catch {
      toast.error("Algo deu errado");
    }
  }

  function clearCart() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("@dopeshoe:cart");
    }
    
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        handleSetIsCartOpen,
        isCartOpen,
        handleAddProduct,
        cart,
        handleRemoveProduct,
        handleUpdateAmount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
