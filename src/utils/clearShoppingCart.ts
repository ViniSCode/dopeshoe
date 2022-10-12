import { useCart } from "../hooks/useCart";

export function clearShoppingCart () {
  const { clearCart } = useCart();

  clearCart();
}