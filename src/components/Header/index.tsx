import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FiShoppingCart, FiX } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { Logo } from './Logo';

const cart = {
  open: {
    height: "60vh",
    opacity: 1
  },
  closed: {
    height: 0,
    opacity: 0,
  }
}

const cartVariants = {
  open: {
    x: 0,
    opacity: 1
  },
  closed: {
    x: "50px",
    opacity: 0,
  }
};

export function Header () {
  const { handleSetIsCartOpen, isCartOpen } = useCart();

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
            <li className='cursor-pointer transition-colors hover:text-yellow-500' onClick={() => handleSetIsCartOpen(true)}>
              <FiShoppingCart size={20}/>
            </li>
          </ul>
        </div>
        <AnimatePresence>
          <motion.div animate={isCartOpen ? "open": "closed"} variants={cart} transition={{duration: 0.2}} className='fixed shadow-lg right-3 top-3 bottom-0 w-[250px] h-0 bg-gray-600 z-[250] rounded-md overflow-hidden lg:absolute'>
            <div className='w-full h-full absolute p-6'>
                <FiX size={25} className='text-white absolute right-5 top-3 cursor-pointer' onClick={() => handleSetIsCartOpen(!isCartOpen)}/>
                <div className='mt-10'>
                  klsdfjssfksaf
                </div>
            </div>
          </motion.div>
        </AnimatePresence>
        {isCartOpen && (<div className='w-full h-full inset-0 fixed z-[200]' onClick={() => handleSetIsCartOpen(false)}></div>)}
      </nav>
    </header>
  );
}