import { motion } from "framer-motion";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

interface SidebarItemsProps {
  name: string;
  href: string | {};
  icon: any;
  isLoggedIn?: any;
}

const itemVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

export function SidebarItems({
  name,
  href,
  icon,
  isLoggedIn,
}: SidebarItemsProps) {
  function handleLogin() {
    signIn("google");
  }
  function handleLogout() {
    signOut();
  }

  if (href === "") {
  }

  if (isLoggedIn && name === "Login") {
    name = "Logout";
  }

  return (
    <Link href={href} key={name}>
      <motion.div
        onClick={() => {
          if (name === "Login") {
            handleLogin();
          } else if (name === "Logout") {
            handleLogout();
          }
        }}
        className="ml-10 flex items-center gap-4 cursor-pointer transition-colors hover:text-yellow-500"
        whileHover={{ scale: 1.1 }}
        variants={itemVariants}
        transition={{ duration: 0.2 }}
      >
        {icon}
        <span>{name}</span>
      </motion.div>
    </Link>
  );
}
