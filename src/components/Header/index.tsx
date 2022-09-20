import { signIn, useSession } from "next-auth/react";
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { Cart } from '../Cart';
import { Logo } from './Logo';

export function Header () {
  const { handleSetIsCartOpen, isCartOpen, cart, handleRemoveProduct, handleUpdateAmount } = useCart();
  const {data: session} = useSession();

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
           {
            session ? (
              <li className='hidden lg:block transition-colors hover:text-yellow-500 cursor-pointer'>
                <Link href='/profile'>
                  <div className="rounded-full p-[3px] relative bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
                    {session.user?.image ? (
                      <img src={session.user!.image!} className="rounded-full h-8 w-8" />
                    ) : (session.user?.name)}
                  </div>
                </Link>
              </li>
            )
            : (
              <li 
                onClick={() => signIn('google')}
                className='hidden lg:block transition-colors hover:text-yellow-500 cursor-pointer'
              >
                <button>
                  Login
                </button>
              </li>
            )
            }
            <li className='cursor-pointer transition-colors hover:text-yellow-500 relative' onClick={() => handleSetIsCartOpen(true)}>
              {cart.length > 0 && <div className='rounded-full absolute bg-yellow-500 w-full right-[-14px] text-[14px] top-[-14px] text-gray-900 font-bold'>{cart.length}</div>}
              <FiShoppingCart size={20}/>
            </li>
          </ul>
        </div>

        <Cart />
        {isCartOpen && (<div className='w-full h-full inset-0 fixed z-[200]' onClick={() => handleSetIsCartOpen(false)}></div>)}
      </nav>
    </header>
  );
}
