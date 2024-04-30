import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FiSlash, FiX } from "react-icons/fi";
import { useCart } from "../../hooks/useCart";
import { CartProducts } from "./CartProducts";

export function Cart() {
  const {
    handleSetIsCartOpen,
    isCartOpen,
    cart,
    handleRemoveProduct,
    handleUpdateAmount,
  } = useCart();

  const cartVariants = {
    open: {
      height:
        cart.length === 0
          ? "200px"
          : cart.length === 1
          ? "240px"
          : cart.length === 2
          ? "320px"
          : cart.length === 3
          ? "320px"
          : cart.length === 4
          ? "350px"
          : "350px",
      opacity: 1,
    },
    closed: {
      height: 0,
      opacity: 0,
    },
  };

  return (
    <div className="max-h-[60vh]">
      <AnimatePresence>
        <motion.div
          animate={isCartOpen ? "open" : "closed"}
          variants={cartVariants}
          transition={{ duration: 0.2 }}
          className="shadow-lg right-0 w-[230px] sm:right-5 top-[-14px] bottom-0 sm:w-[270px] md:w-[350px] h-0 bg-white z-[300] rounded-md overflow-hidden absolute"
        >
          <div className="w-full h-full absolute p-2">
            <FiX
              size={23}
              className="text-black hover:opacity-50 transition-opacity absolute right-5 top-3 z-[200] cursor-pointer"
              onClick={() => handleSetIsCartOpen(!isCartOpen)}
            />
            <div
              className={`mt-10 flex flex-col gap-2 h-full pb-14 justify-between ${
                cart.length > 2 && "overflow-y-scroll scrollbar-thin"
              }`}
            >
              <div className="flex flex-col gap-2">
                {cart.length > 0 ? (
                  cart.map((item: any) => {
                    return (
                      <CartProducts
                        item={item}
                        key={item.id}
                        handleRemoveProduct={handleRemoveProduct}
                        handleUpdateAmount={handleUpdateAmount}
                      />
                    );
                  })
                ) : (
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-4">
                    <FiSlash size={22} className="text-black mx-auto" />
                    <p className="text-center text-base text-black">
                      Your cart is empty
                    </p>
                  </div>
                )}
              </div>
              {cart.length > 0 && (
                <Link href="/cart">
                  <div className="absolute bottom-0 right-0 left-0 p-2 bg-white">
                    <button className="bg-black text-white font-bold w-full rounded-md py-2 px-4 transition-filter flex items-center justify-center hover:brightness-75">
                      Finalizar
                    </button>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
