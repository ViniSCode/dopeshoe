import Link from 'next/link';
import { useState } from 'react';
import { AiOutlinePhone } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { GiRunningShoe } from 'react-icons/gi';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { SiNike } from 'react-icons/si';
import { Logo } from './Logo';

export function Header () {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const menuItems = [
    {
      icon: <GiRunningShoe size={22}/>,
      href: '/',
      name: 'All'
    },
    {
      icon: <SiNike size={22}/>,
      href: '/brands',
      name: 'Brands'
    },
    {
      icon: <AiOutlinePhone size={22}/>,
      href: '/contact',
      name: 'Contact'
    },
    {
      icon: <MdOutlineFavoriteBorder size={22}/>,
      href: '/favorites',
      name: 'Favorites'
    },
  ]
  return (
    <div className="max-w-[1120px] mx-auto relative z-50">
      <div className="text-center pt-7 flex items-center justify-center max-w-[1120px] mx-auto relative ">
        <span className='ml-auto'>
          <Logo />
        </span>
        <span className='ml-auto'>
          <FiShoppingCart />
        </span>
      </div>
      <section className="flex gap-6 absolute inset-0 w-[100%]">
        <div className={`bg-gray-700 pt-4 min-h-screen ${isMenuActive ? 'w-60' : 'w-0'} duration-300 text-white`}>
          <div className={`mt-[5px] p-4 flex justify-end absolute ${isMenuActive ? 'ml-44' : ''} duration-500`}>
            <HiMenuAlt3 size={26} className='cursor-pointer' onClick={() => setIsMenuActive(!isMenuActive)}/>
          </div>
          <div className='mt-24 flex flex-col gap-10 absolute pl-5'>
          {menuItems.map(item => {
            // LINKS SHOWING/CLICKABLE WHEN OVERFLOW HIDDEN
            return (
              <Link
                href={item.href}
                key={item.name}
                className={`whitespace-pre duration-500 ${!isMenuActive && 'opacity-0 translate-x-28 overflow-hidden'}`}
              >
                <div className={`flex items-center gap-4 cursor-pointer transition-colors hover:text-yellow-500`}>
                  <span className={`whitespace-pre duration-500 ${!isMenuActive && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                    {item.icon}
                  </span>
                  <span className={`text-[18px] whitespace-pre duration-500 ${!isMenuActive && 'opacity-0 translate-x-28 overflow-hidden' }`}>{item.name}</span>
                </div>
              </Link>
            )
          })
          }
          </div>
        </div>
      </section>
    </div>
  );
}