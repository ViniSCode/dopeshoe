import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CgRemove } from 'react-icons/cg';
import { FiX } from 'react-icons/fi';
import { HiMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import { useCart } from '../../hooks/useCart';

export function Cart () {
const { handleSetIsCartOpen, isCartOpen, cart, handleRemoveProduct, handleUpdateAmount } = useCart();

    
const cartVariants = {
  open: {
    height:(cart.length === 0) ? "40vh" : (cart.length === 1) ? "40vh" : (cart.length === 2) ? "50vh" : (cart.length === 3) ? "60vh" :  (cart.length === 4) ? "60vh" : "60vh",
    opacity: 1
  },
  closed: {
    height: 0,
    opacity: 0,
  }
}


  return (
    <div className='max-h-[60vh]'>
      <AnimatePresence>
        <motion.div animate={isCartOpen ? "open": "closed"} variants={cartVariants} transition={{duration: 0.2}} className='fixed shadow-lg right-3 top-3 bottom-0 w-[270px] md:w-[350px] h-0 bg-gray-700 z-[300] rounded-md overflow-hidden lg:absolute'>
          <div className='w-full h-full absolute p-2'>
              <FiX size={25} className='text-white absolute right-5 top-3 z-[200] cursor-pointer' onClick={() => handleSetIsCartOpen(!isCartOpen)}/>
              <div className={`mt-10 flex flex-col gap-2 h-full pb-14 justify-between ${cart.length > 3  && 'overflow-y-scroll scrollbar-thin'}`}>
                <div className='flex flex-col gap-2'>
                  { cart.length > 0 ? 
                    (
                      cart.map((item: any) => {
                        return (
                          <div className='cursor-pointer relative bg-gray-600 p-2 border-lg w-full h-[80px] mx-auto rounded-lg flex items-center gap-2 last-of-type:mb-10' key={item.id}>
                              <div className='absolute top-2 right-2' onClick={() => handleRemoveProduct(item)}>
                                <CgRemove size={17} className='text-gray-400'/>
                              </div>
                              <div className='bg-gray-900 h-full w-full min-w-[70px] max-w-[70px] rounded-lg p-1'>
                                  <div className='relative h-full w-full inset-0'>
                                    <Image src={item.image[0].mainImage.url} alt="product image" layout='fill' objectFit={'contain'} priority={item.image[0].mainImage.url === "https://media.graphassets.com/i5RtvtrhRseDy345Wr8V"}/>
                                  </div>
                              </div>
                              <div className='overflow-hidden'>
                                <Link href={`/${item.id}`}>
                                  <div className="overflow-hidden max-w-[130px] md:max-w-[200px]">
                                    <p className='text-[15px] w-full truncate max-w-full'>
                                      <span className='mr-1 font-bold'>{item.amount}x</span><span className='text-red-600 mr-1 font-bold'>{item.brand?.brandName}</span>{item.name}
                                    </p>
                                  </div>
                                </Link>
                                <div className=' flex items-start justify-start gap-2'>
                                  <span className='flex items-center gap-1'>
                                    <p className='text-[14px] md:text-1xl font-bold'>R$</p>
                                  </span>
                                  <p className='text-[14px] md:text-1xl font-bold'>{(item.price) / 100}</p>
                                  <div>
                                        <div className="flex gap-1">
                                          <button disabled={item.amount === 1} className="bg-gray-900 rounded-md flex items-center justify-center w-[30px] h-[25px] disabled:opacity-80" onClick={() => {
                                            if (item.amount > 1) {
                                              handleUpdateAmount(item, item.amount - 1, "decrease")
                                            }
                                          }}>
                                            <HiMinusSm size={18} />
                                          </button>
                                          <button disabled={item.available === item.amount} className="bg-gray-900 rounded-lg flex items-center justify-center w-[30px] disabled:opacity-80" onClick={() => {
                                            if (item.available > item.amount) {
                                              handleUpdateAmount(item, item.amount + 1, "increase")
                                            }
                                          }}>
                                            <HiOutlinePlusSm size={18} />
                                          </button>
                                        </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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
                    <Link href="/cart">
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
    </div>
  )
}