import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CgRemove } from 'react-icons/cg';
import { FiShoppingCart, FiX } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { Logo } from './Logo';

export function Header () {
  const { handleSetIsCartOpen, isCartOpen, cart, handleRemoveProduct} = useCart();
  
  const cartVariants = {
    open: {
      height: (cart.length > 0) ? "60vh": "20vh",
      opacity: 1
    },
    closed: {
      height: 0,
      opacity: 0,
    }
  }

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
            <li className='cursor-pointer transition-colors hover:text-yellow-500 relative' onClick={() => handleSetIsCartOpen(true)}>
              {cart.length > 0 && <div className='rounded-full absolute bg-yellow-500 w-full h-full right-[-14px] text-[14px] top-[-14px] text-gray-900 font-bold'>{cart.length}</div>}
              <FiShoppingCart size={20}/>
            </li>
          </ul>
        </div>
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
                            <div className='cursor-pointer relative bg-gray-600 p-2 border-lg w-full h-[80px] mx-auto rounded-lg flex items-center gap-2 last-of-type:mb-10' key={item.id}>
                                <div className='absolute top-2 right-2' onClick={() => handleRemoveProduct(item)}>
                                  <CgRemove size={15} className='text-gray-400'/>
                                </div>
                                <div className='bg-gray-900 h-full w-full min-w-[70px] max-w-[70px] rounded-lg p-1'>
                                  <Link href={`/${item.id}`}>
                                    <div className='relative h-full w-full inset-0'>
                                      <Image src={item.image[0].mainImage.url} alt="product image" layout='fill' objectFit={'contain'} priority={item.image[0].mainImage.url === "https://media.graphassets.com/i5RtvtrhRseDy345Wr8V"}/>
                                    </div>
                                  </Link>
                                </div>
                                <div className='overflow-hidden'>
                                  <div className="overflow-hidden">
                                    <p className='text-[15px] w-full truncate max-w-full'>
                                      <span className='text-red-600 mr-1 font-bold'>{item.brand?.brandName}</span>{item.name}
                                    </p>
                                  </div>
                                  <div className=' flex items-start justify-start gap-2'>
                                    <span className='flex items-center gap-1'>
                                      <p className='text-[14px] md:text-1xl font-bold'>R$</p>
                                    </span>
                                    <p className='text-[14px] md:text-1xl font-bold'>{item.price}</p>
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
                      <div className='absolute bottom-0 right-0 left-0 p-2'>
                        <button className="bg-yellow-500 w-full rounded py-2 px-4 transition-filter flex items-center justify-center hover:brightness-75">
                          <p className='text-gray-900 font-bold'>Finalizar</p>
                        </button>
                      </div>
                    )
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