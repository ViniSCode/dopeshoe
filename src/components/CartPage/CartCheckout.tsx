import { motion } from "framer-motion";

interface CartCheckoutProps {
  cartSum: any,
  loading: any,
  handleCartCheckout: any
}

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

export function CartCheckout ({cartSum, loading, handleCartCheckout}: CartCheckoutProps) {
  return (
    <>
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
            disabled={loading}
            role="link"
            onClick={handleCartCheckout}
            className="bg-red-500 w-full rounded py-2 px-4 transition-filter hover:brightness-75 disabled:opacity-80"
          >
            Comprar
          </button>
        </div>
      </div>

      <div className="md:hidden mt-8 flex items-center justify-center flex-col gap-2">
        <button
          disabled={loading}
          role="link"
          onClick={handleCartCheckout}
          className="bg-red-500 w-full rounded py-2 px-4 transition-filter hover:brightness-75 disabled:opacity-80"
        >
          Comprar
        </button>
      </div>
    </>
  )
}