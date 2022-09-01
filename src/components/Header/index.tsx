import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { Logo } from './Logo';

export function Header () {

  return (
    <nav className="select-none max-w-[1120px] mx-auto fixed inset-0 z-50 px-9 lg:px-10 w-full h-[5rem] bg-gray-800 shadow-lg lg:bg-transparent lg:shadow-none lg:absolute">
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
          <li className='cursor-pointer'>
            <FiShoppingCart size={20}/>
          </li>
        </ul>
      </div>
    </nav>
  );
}