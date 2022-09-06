import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';


export function NavItems () {
  const { handleSetIsCartOpen, cart } = useCart();

  return (
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
  )
}