import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useCart } from '../../hooks/useCart';
import { Logo } from './Logo';
const cartVariants = {
  open: {
    height: "60vh",
    opacity: 1
  },
  closed: {
    height: 0,
    opacity: 0,
  }
}

export function Header () {
  const { handleSetIsCartOpen, isCartOpen, cart} = useCart();
  
  return (
    <header>
      <nav className="select-none max-w-[1120px] mx-auto fixed inset-0 z-50 px-9 lg:px-10 w-full h-[5rem] bg-gray-800 shadow-lg lg:bg-transparent lg:shadow-none lg:relative">
        <div className="text-center pt-4 flex justify-between items-center w-full mx-auto relative ">
          <span className='lg:hidden'></span>
          <span>
            <Logo />
          </span>
          <ul className='flex gap-8 items-center'>
            <li className='hidden lg:block transition-colors hover:text-yellow-500 cursor-pointer'>
              <Link href="/">
                All
              </Link>
            </li>
            <li className='hidden lg:block transition-colors hover:text-yellow-500 cursor-pointer'>
              <Link href="/">
                Brands
              </Link>
            </li>
            <li className='hidden lg:block transition-colors hover:text-yellow-500 cursor-pointer'>
              <Link href="/">
              Contact
              </Link>
            </li>
            <li className='hidden lg:block transition-colors hover:text-yellow-500 cursor-pointer'>
              <Link href="/">
                Favorites
              </Link>
            </li>
            <li className='cursor-pointer transition-colors hover:text-yellow-500 relative' onClick={() => {
              if (cart.length > 0 ) {
                handleSetIsCartOpen(true)
              } else {
                toast.info("Nenhum item no carrinho")
              }
            }}>
              {cart && <div className='rounded-full absolute bg-yellow-500 w-full h-full right-[-14px] text-[14px] top-[-14px] text-gray-900 font-bold'>{cart.length}</div>}
              <FiShoppingCart size={20}/>
            </li>
          </ul>
        </div>
        <AnimatePresence>
          <motion.div animate={isCartOpen ? "open": "closed"} variants={cartVariants} transition={{duration: 0.2}} className='fixed shadow-lg right-3 top-3 bottom-0 w-[260px] md:w-[350px] h-0 bg-gray-700 z-[300] rounded-md overflow-hidden lg:absolute'>
            <div className='w-full h-full absolute p-2'>
                <FiX size={25} className='text-white absolute right-5 top-3 cursor-pointer' onClick={() => handleSetIsCartOpen(!isCartOpen)}/>
                <div className={`mt-10 flex flex-col gap-2 h-full pb-14 ${cart.length > 6  && 'overflow-y-scroll scrollbar-thumb-gray-400 scrollbar'}`}>
                  { cart && 
                    cart.map(item => {
                      return (
                        <Link href={`/${item.id}`} key={item.id}>
                          <div className='cursor-pointer bg-gray-600 p-2 border-lg w-full h-[80px] mx-auto rounded-lg flex items-start gap-2'>
                            <div className='bg-gray-900 h-full w-full min-w-[70px] max-w-[70px] rounded-lg p-1'>
                              <div className='relative h-full w-full inset-0'>
                                <Image src={item.image[0].mainImage.url} alt="product image" layout='fill' objectFit={'contain'} priority={item.image[0].mainImage.url === "https://media.graphassets.com/i5RtvtrhRseDy345Wr8V"}/>
                              </div>
                            </div>
                            <div className='overflow-hidden'>
                              <div className="overflow-hidden">
                                <p className='text-[16px] w-full truncate max-w-full'>
                                <span className='text-red-600 mr-1 font-bold'>{item.brand?.brandName}</span>{item.name}
                                </p>
                              </div>
                              <div className='mt-1 flex items-start justify-start gap-2'>
                                <span className='flex items-center gap-1'>
                                  <p className='text-[14px] md:text-1xl font-bold'>R$</p>
                                </span>
                                <p className='text-[14px] md:text-1xl font-bold'>{item.price}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })
                  }
                </div>
            </div>
          </motion.div>
        </AnimatePresence>
        {isCartOpen && (<div className='w-full h-full inset-0 fixed z-[200]' onClick={() => handleSetIsCartOpen(false)}></div>)}
      </nav>
    </header>
  );
}