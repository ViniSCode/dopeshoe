import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useSession } from "next-auth/react";
import { FiMenu, FiX } from "react-icons/fi";
import { SidebarItems } from "./SidebarItems";

const itemVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      opacity: 0,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const aside = {
  open: {
    width: 230,
    opacity: 1,
  },
  closed: {
    width: "0",
    opacity: 0,
  },
};

export function Sidebar() {
  const [open, cycleOpen] = useCycle(false, true);
  const { data: session } = useSession();

  const menuItems = [
    { href: "/", name: "Home" },
    { href: "/all", name: "All Shoes" },
    {
      href: "https://www.linkedin.com/in/vinicius-rodrigues-5897831b8/",
      name: "Contact",
    },
    // { href: "/profile", name: "Profile" },
    {
      href: "/",
      name: "Login",
      isLoggedIn: session,
    },
  ];

  return (
    <>
      <FiMenu
        size={19}
        onClick={() => cycleOpen()}
        className="cursor-pointer hover:opacity-70 transition-opacity"
      />
      <div
        onClick={() => cycleOpen()}
        className={`${
          open ? "fixed z-[100] w-[100vw] h-[100vh] inset-0 bg-black/20" : ""
        }`}
      ></div>
      <AnimatePresence>
        (
        <motion.aside
          animate={open ? "open" : "closed"}
          variants={aside}
          transition={{ duration: 0.2 }}
          className="opacity-0 flex flex-col bg-white pt-20 md:pt-32 h-[100%] w-0 fixed top-0 right-0 bottom-0 z-[200] shadow-lg overflow-x-hidden"
        >
          <FiX
            onClick={() => cycleOpen()}
            size={19}
            color="black"
            className="absolute top-[26px] right-5 cursor-pointer hover:opacity-70 transition-opacity"
          />
          <motion.div
            animate={open ? "open" : "closed"}
            exit="closed"
            variants={sideVariants}
            className="container flex flex-col gap-8"
          >
            {menuItems.map((navItem) => (
              <SidebarItems
                href={navItem.href}
                name={navItem.name}
                key={navItem.name}
                isLoggedIn={session}
              />
            ))}
          </motion.div>
        </motion.aside>
        )
      </AnimatePresence>
    </>
  );
}
