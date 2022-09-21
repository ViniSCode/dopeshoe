import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useSession } from "next-auth/react";
import { AiOutlineLogin, AiOutlinePhone } from 'react-icons/ai';
import { CgProfile } from "react-icons/cg";
import { GiRunningShoe } from 'react-icons/gi';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { SiNike } from 'react-icons/si';
import { SidebarItems } from "./SidebarItems";

const itemVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 }
};

const sideVariants = {
  closed: {
    transition: {
      opacity: 0,
      staggerDirection: -1
    },
  },
  open: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1
    }
  }
};

const aside = {
  open: {
    width: 250,
    opacity: 1
  },
  closed: {
    width: "0",
    opacity: 0,
  }
}

export function Sidebar () {
const [open, cycleOpen] = useCycle(false, true);
const {data: session} = useSession();

  
const menuItems = [
  { icon: <GiRunningShoe size={22}/>, href: '/', name: 'All' },
  { icon: <SiNike size={22}/>, href: '/brands', name: 'Brands' },
  { icon: <AiOutlinePhone size={22}/>, href: '/contact', name: 'Contact' },
  { icon: <MdOutlineFavoriteBorder size={22}/>, href: '/favorites', name: 'Favorites' },
  { icon: <CgProfile size={22}/>, href: '/profile', name: 'Profile' },
  { icon: <AiOutlineLogin size={22}/>, href: '', name: 'Login', isLoggedIn: session},
]


  return (
    <div className="lg:hidden select-none">
      <HiMenuAlt3 size={26} className="cursor-pointer ml-4 fixed top-6 left-0 right-0 bottom-0 z-[100] shadow-lg lg:hidden" onClick={() => cycleOpen()} />
      <div onClick={() => cycleOpen()} className={`${open ? 'fixed z-[90] w-[100vw] h-[100vh] inset-0' : ''}`}>
        <AnimatePresence>
          (
            <motion.aside
              animate={open ? "open": "closed"}
              variants={aside}
              transition={{duration: 0.2}}
              className="flex flex-col bg-gray-700 py-36 h-[100%] w-0 fixed top-0 left-0 right-0 bottom-0 z-50 shadow-lg overflow-x-hidden"
            >
              <motion.div
                animate={open ? "open": "closed"}
                exit="closed"
                variants={sideVariants}  
                className='container flex flex-col gap-10'
              >
                {menuItems.map((navItem) => (
                  <SidebarItems href={navItem.href} icon={navItem.icon} name={navItem.name} key={navItem.name} isLoggedIn={session}/>
                ))}
              </motion.div>
            </motion.aside>
          )
          
        </AnimatePresence>
      </div>
    </div>
  )
} 