import { Cart } from '../../Cart';
import { useCart } from '../../hooks/useCart';
import { Logo } from './Logo';
import { NavItems } from './NavItems';

export function Header () {
  // const [ addProductInCartCount, setAddProductInCartCount ] = useState(1);

  const { handleSetIsCartOpen, isCartOpen, cart, handleRemoveProduct, handleUpdateAmount } = useCart();

  return (
    <header>
      <nav className="select-none max-w-[1120px] mx-auto fixed inset-0 z-50 px-9 lg:px-10 w-full h-[5rem] bg-gray-800 shadow-lg lg:bg-transparent lg:shadow-none lg:relative">
        <div className="text-center pt-4 flex justify-between items-center w-full mx-auto relative ">
          <span className='lg:hidden'></span>
          <span>
            <Logo />
          </span>
          <NavItems />
        </div>
        <div className='max-h-[60vh]'>
         <Cart />
        </div>
        {isCartOpen && (<div className='w-full h-full inset-0 fixed z-[200]' onClick={() => handleSetIsCartOpen(false)}></div>)}
      </nav>
    </header>
  );
}