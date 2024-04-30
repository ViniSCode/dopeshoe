import { Footer } from "@/components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { getSession, signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { CartCheckout } from "../components/CartPage/CartCheckout";
import { CartItems } from "../components/CartPage/CartItems";
import { Header } from "../components/Header";
import { useCart } from "../hooks/useCart";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Cart() {
  const {
    handleSetIsCartOpen,
    isCartOpen,
    cart,
    handleRemoveProduct,
    handleUpdateAmount,
    clearCart,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const cartSum = cart.reduce((previous, current) => {
    previous += (current.price / 100) * current.amount;
    return previous;
  }, 0);

  const handleCartCheckout = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const session = await getSession();

    if (cart.length < 1) {
      toast.info("O carrinho está vazio");
      setLoading(false);
      return;
    }

    if (!session) {
      toast.warning("Você precisa estar logado para efetuar o checkout");
      signIn("google");
      return;
    }

    if (cart.length > 30) {
      toast.error(
        "Muitos items no carrinho, remova alguns para finalizar a compra"
      );
      setLoading(false);
      return;
    }

    try {
      // GET CART PRODUCTS
      const cartProducts = cart.map((product) => {
        return {
          cartProductId: product.id,
          cartAmount: product.amount,
          cartPrice: product.price,
        };
      });

      // PRODUCT CHECKOUT
      const { sessionId } = await fetch("/api/checkout/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartProducts,
          session: session,
        }),
      }).then((res) => res.json());

      //REDIRECT TO CHECKOUT
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({ sessionId });

      // CLEAR CART AFTER CHECKOUT SUCCESSFUL
      clearCart();
      setLoading(false);
    } catch (err) {
      toast.error("Erro ao finalizar a compra");
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>DopeShoe | Shopping Cart</title>
        <meta name="description" content="Shoppping Cart" />
      </Head>
      <Header />
      {cart.length > 0 ? (
        <>
          <div className="max-w-[1120px] px-5 w-full mx-auto mt-28 md:mt-32 font-medium text-[15px] text-[#717171] hover:underline">
            <Link href="/">{`Home > Cart checkout`}</Link>
          </div>
          <main className="mt-5 max-w-[1120px] px-5 w-full mx-auto md:grid md:grid-cols-cart md:gap-10 md:items-start pb-10 min-h-fit">
            <CartItems
              cart={cart}
              handleRemoveProduct={handleRemoveProduct}
              handleUpdateAmount={handleUpdateAmount}
            />
            <CartCheckout
              cartSum={cartSum}
              handleCartCheckout={handleCartCheckout}
              loading={loading}
            />
          </main>
          <div className="min-h-[40vh]"></div>
          <Footer />
        </>
      ) : (
        <>
          <main className="mt-28 md:mt-32 px-5 relative max-w-[1120px] mx-auto">
            <div className="font-medium text-[15px] text-[#717171] hover:underline">
              <Link href="/">{`Home > Cart checkout`}</Link>
            </div>
            <div className="h-[70vh] w-full flex justify-center items-center">
              <p className="font-medium text-lg text-center">
                There are no items in your bag.
              </p>
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
