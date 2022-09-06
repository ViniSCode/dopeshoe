import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';
import { CartProduct } from '../Cart/CartProduct';
import { useCart } from '../hooks/useCart';

export function Cart () {
  const { handleSetIsCartOpen, isCartOpen, cart, handleRemoveProduct, handleUpdateAmount } = useCart();

  const cartVariants = {
    open: {
      height:(cart.length === 0) ? "25vh" : (cart.length === 1) ? "20vh" : (cart.length === 2) ? "30vh" : (cart.length === 3) ? "40vh" :  (cart.length === 4) ? "50vh" : "60vh",
      opacity: 1
    },
    closed: {
      height: 0,
      opacity: 0,
    }
  }

  return (
    <AnimatePresence>
      <motion.div animate={isCartOpen ? "open": "closed"} variants={cartVariants} transition={{duration: 0.2}} className='fixed shadow-lg right-3 top-3 bottom-0 w-[270px] md:w-[350px] h-0 bg-gray-700 z-[300] rounded-md overflow-hidden lg:absolute'>
        <div className='w-full h-full absolute p-2'>
            <FiX size={25} className='text-white absolute right-5 top-3 z-[200] cursor-pointer' onClick={() => handleSetIsCartOpen(!isCartOpen)}/>
            <div className={`mt-10 flex flex-col gap-2 h-full pb-14 justify-between ${cart.length > 3  && 'overflow-y-scroll scrollbar-thin'}`}>
              <div className='flex flex-col gap-2'>
                { cart.length > 0 ? 
                  (
                    cart.map(item => {
                      return (
                        <CartProduct item={item}/>
                      )
                    })
                  ) : (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <p className='text-center'>Carrinho vazio.</p>
                    </div>
                  )
                }
              </div>
              {
                cart.length > 0 && (
                  <Link href={`/cart`}>
                    <div className='absolute bottom-0 right-0 left-0 p-2'>
                      <button className="bg-yellow-500 w-full rounded py-2 px-4 transition-filter flex items-center justify-center hover:brightness-75">
                        <p className='text-gray-900 font-bold'>Finalizar</p>
                      </button>
                    </div>
                  </Link>
                )
              }
            </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}