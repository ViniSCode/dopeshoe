import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";

export function useCart () {
  const { handleSetIsCartOpen, isCartOpen, handleSetCartItems, cartItems } = useContext(CartContext);

  return {
    handleSetIsCartOpen, 
    isCartOpen, 
    handleSetCartItems, 
    cartItems
  }
}