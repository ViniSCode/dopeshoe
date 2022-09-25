import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { toast } from "react-toastify";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useCart } from "../hooks/useCart";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

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

    if (!session) {
      toast.warning("Você precisa estar logado para efetuar o checkout");
      signIn("google");
      return;
    }

    if (cart.length > 30) {
      toast.error(
        "Muitos items no carrinho, remova alguns para finalizar a compra"
      );
      setLoading(true);
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
      <div className="md:container-div">
        <Header />
        <Sidebar />
        <div className="lg:main-container-div max-w-[1120px] lg:px-7 mx-auto">
          <motion.main className="px-4 w-full mx-auto mt-[8rem] md:grid md:grid-cols-cart md:gap-10 md:items-start lg:mt-16">
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="select-none mt-16 grid grid-cols-1 w-full h-full bg-gray-700 px-4 py-4 rounded-lg shadow-lg md:mt-0"
            >
              <h2 className="text-[18px]">{cart.length} Items</h2>
              <div className="w-full h-[1px] bg-gray-200 mt-2 mb-4"></div>
              {cart.length > 0 &&
                cart.map((item) => {
                  return (
                    <div
                      className="cursor-pointer relative p-2 border-lg w-full h-[80px] mx-auto rounded-lg flex items-center justify-between"
                      key={item.id}
                    >
                      <div className="h-full w-full flex items-center gap-2">
                        <div className="bg-gray-900 h-full w-full min-w-[70px] max-w-[70px] rounded-lg p-1">
                          <div className="relative h-full w-full inset-0">
                            <Image
                              src={item.image[0].mainImage.url}
                              alt="product image"
                              layout="fill"
                              objectFit={"contain"}
                              priority={
                                item.image[0].mainImage.url ===
                                "https://media.graphassets.com/i5RtvtrhRseDy345Wr8V"
                              }
                            />
                          </div>
                        </div>
                        <div className="overflow-hidden flex flex-col gap-1 h-full w-full">
                          <Link href={`/${item.id}`}>
                            <div className="flex items-center gap-4">
                              <div className="overflow-hidden max-w-[200px] flex items-center gap-4">
                                <p className="text-[15px] w-full truncate max-w-full">
                                  <span className="mr-1 font-bold">
                                    {item.amount}x
                                  </span>
                                  <span className="text-red-600 mr-1 font-bold">
                                    {item.brand?.brandName}
                                  </span>
                                  {item.name}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 ml-auto">
                                <span className="flex items-center gap-1">
                                  <p className="text-[16px] md:text-1xl font-medium">
                                    R$
                                  </p>
                                </span>
                                <p className="text-[16px] md:text-1xl font-medium">
                                  {(item.price / 100).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </Link>
                          <div className=" flex items-start justify-start gap-2">
                            <div>
                              <div className="flex gap-1">
                                <button
                                  className="bg-gray-900 rounded-md flex items-center justify-center w-[30px] h-[25px]"
                                  onClick={() => {
                                    if (item.amount > 1) {
                                      handleUpdateAmount(
                                        item,
                                        item.amount - 1,
                                        "decrease"
                                      );
                                    }
                                    // remove item from shopping cart
                                    if (item.amount === 1) {
                                      toast.success(
                                        "Produto Removido do carrinho"
                                      );
                                      handleRemoveProduct(item);
                                    }
                                  }}
                                >
                                  <HiMinusSm size={18} />
                                </button>
                                <button
                                  disabled={item.available === item.amount}
                                  className="bg-gray-900 rounded-lg flex items-center justify-center w-[30px] disabled:opacity-80"
                                  onClick={() => {
                                    if (item.available > item.amount) {
                                      handleUpdateAmount(
                                        item,
                                        item.amount + 1,
                                        "increase"
                                      );
                                    }
                                  }}
                                >
                                  <HiOutlinePlusSm size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </motion.div>

            <div>
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="select-none mt-8 flex-wrap max-w-full mx-auto bg-gray-700 p-6 rounded-lg shadow-lg md:w-full md:mt-0"
              >
                <h2 className="text-[18px]">Order Summary</h2>
                <div className="flex items-center justify-between mt-8">
                  <p className="font-bold">Total: </p>
                  <p className="font-bold">R$ {cartSum.toFixed(2)}</p>
                </div>
              </motion.div>
              <div className="hidden md:flex mt-8 items-center justify-center flex-col gap-2">
                <button
                  role="link"
                  onClick={handleCartCheckout}
                  className="bg-red-500 w-full rounded py-2 px-4 transition-filter hover:brightness-75"
                >
                  Comprar
                </button>
              </div>
            </div>

            <div className="md:hidden mt-8 flex items-center justify-center flex-col gap-2">
              <button
                role="link"
                onClick={handleCartCheckout}
                className="bg-red-500 w-full rounded py-2 px-4 transition-filter hover:brightness-75"
              >
                Comprar
              </button>
            </div>
          </motion.main>
        </div>
      </div>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-20 select-none flex items-center justify-between mb-2 px-4 max-w-[1120px] md:mt-0 mx-auto"
      >
        <div>
          <p className="text-gray-500 underline">
            Discover All <br />
            Products
          </p>
        </div>
        <div className="flex items-center gap-4 cursor-pointer">
          <p className="text-[18px]">Next page</p>
          <BsArrowRightShort fontSize={30} />
        </div>
        <div>
          <span>{" < 1 > "}</span>
        </div>
      </motion.footer>
    </>
  );
}
