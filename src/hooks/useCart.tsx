import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";

export function useCart () {
  const { handleSetIsCartOpen, isCartOpen, handleAddProduct, cart, handleRemoveProduct, handleUpdateAmount } = useContext(CartContext);

  return {
    handleSetIsCartOpen, 
    isCartOpen, 
    handleAddProduct, 
    handleRemoveProduct,
    handleUpdateAmount,
    cart
  }
}