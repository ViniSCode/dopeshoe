import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

const itemVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

interface ProfileSidebarProps {
  icon: any;
  href: string;
  name: string;
  isOrders?: boolean;
}

export function ProfileSidebar({ icon, href, name, isOrders}: ProfileSidebarProps) {

  function handleLogout() {
    signOut();
  }

  if (isOrders && name === "Orders") {
    name = "Profile"
    href = "/profile"
    icon = <CgProfile className="h-[22px] w-[22px] md:w-[26px] md:h-[26px]" /> 
  }

  return (
    <Link href={href} passHref>
      <a>
        <motion.div
          onClick={() => {
            if (name === "Logout") {
              handleLogout();
            }
          }}
          className="lg:ml-10 md:text-lg flex gap-2 items-center lg:gap-4 cursor-pointer transition-colors hover:text-yellow-500"
          whileHover={{ scale: 1.01 }}
          variants={itemVariants}
          transition={{ duration: 0.2 }}
        >
          {icon}
          <span>{name}</span>
        </motion.div>
      </a>
    </Link>
  );
}
