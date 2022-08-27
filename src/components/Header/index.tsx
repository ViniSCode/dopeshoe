import { FiShoppingCart } from 'react-icons/fi';
import { Logo } from "./Logo";
export function Header () {
  return (
    <header className="pt-5 px-10 max-w-[1120px] mx-auto">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />
          <ul className='flex align-center gap-8'>
            <a href="" className="text-[1rem]"><li>All</li></a>
            <a href="" className="text-[1rem]"><li>Brands</li></a>
            <a href="" className="text-[1rem]"><li>Contact</li></a>
          </ul>
        </div>
        <ul className='flex items-center gap-8'>
          <a href="" className="text-[1rem]"><li>Favorites</li></a>
          <a href="" className="text-[1rem]"><li><FiShoppingCart /></li></a>
          <a href="" className="text-[1rem]">
            <li>
              <button>Login</button>  
            </li>
          </a>
        </ul>
      </nav>
    </header>
  );
}