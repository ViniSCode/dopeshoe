import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import { useCart } from "../../hooks/useCart";
import { SearchBar } from "../SearchBar";
import { Sidebar } from "../Sidebar";
import { Logo } from "./Logo";

export function Header({ search, setSearch }: any) {
  const { handleSetIsCartOpen, isCartOpen, cart } = useCart();
  const { data: session } = useSession();

  return (
    <div className="py-5 fixed w-full h-fit z-[100] bg-white top-0 shadow-sm">
      <header className="px-5 max-w-full md:max-w-full lg:max-w-[1120px] mx-auto relative select-none">
        <div className="flex-row gap-4 flex justify-between items-center w-full">
          <div className="flex items-center gap-8 w-fit">
            <Logo />
            <div className="">
              <SearchBar />
            </div>
          </div>

          <nav className="hidden md:block">
            <ul className="flex gap-8 font-medium">
              <li className="hover:underline hover:opacity-70 transition-opacity">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:underline hover:opacity-70 transition-opacity">
                <Link href="/all">All Shoes</Link>
              </li>
              <li className="hover:underline hover:opacity-70 transition-opacity">
                <Link
                  href="https://www.linkedin.com/in/vinicius-rodrigues-5897831b8/"
                  target="_blank"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="relative">
            <div className="flex gap-6 items-center">
              <div className="relative hover:opacity-70 transition-opacity cursor-pointer">
                <Link href="/cart">
                  <FiShoppingBag size={19} color="#000000" />
                  {cart.length > 0 && (
                    <div className="rounded-full absolute text-center bg-red-500 w-full h-full right-[-14px] text-[14px] top-[-14px] text-white text-sm">
                      {cart.length}
                    </div>
                  )}
                </Link>
              </div>

              {session && session.user ? (
                <Link href="/profile">
                  <FiUser
                    size={19}
                    color="#000000"
                    className="hover:opacity-70 transition-opacity cursor-pointer"
                  />
                </Link>
              ) : (
                <div
                  onClick={() => signIn("google")}
                  className="cursor-pointer"
                >
                  <FiUser
                    size={19}
                    color="#000000"
                    className="hover:opacity-70 transition-opacity cursor-pointer"
                  />
                </div>
              )}
              <div className="block md:hidden">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
