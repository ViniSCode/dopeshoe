import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { toast } from "react-toastify";

interface CartItemsProps {
  cart: any;
  handleUpdateAmount: any;
  handleRemoveProduct: any;
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

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export function CartItems({
  cart,
  handleUpdateAmount,
  handleRemoveProduct,
}: CartItemsProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="select-none mt-16 grid grid-cols-1 w-full h-full bg-gray-700 px-4 py-4 rounded-lg shadow-lg md:mt-0"
    >
      <h2 className="text-[18px]">{cart.length} Items</h2>
      <div className="w-full h-[1px] bg-gray-200 mt-2 mb-4"></div>
      {cart.length > 0 &&
        cart.map((item: any) => {
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
                      quality={2}
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
                          <span className="mr-1 font-bold">{item.amount}x</span>
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
                          className="indent-[-9999em] uppercase bg-gray-900 rounded-md flex items-center justify-center w-[30px] h-[25px]"
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
                              toast.success("Produto Removido do carrinho");
                              handleRemoveProduct(item);
                            }
                          }}
                        >
                          Decrease
                          <HiMinusSm size={18} />
                        </button>
                        <button
                          disabled={item.available === item.amount}
                          className="indent-[-9999em] uppercase bg-gray-900 rounded-lg flex items-center justify-center w-[30px] disabled:opacity-80"
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
                          Increase
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
  );
}
