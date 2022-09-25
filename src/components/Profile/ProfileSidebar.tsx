import { motion } from "framer-motion";
import Link from "next/link";

const itemVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

interface ProfileSidebarProps {
  icon: any;
  href: string;
  name: string;
}

export function ProfileSidebar({ icon, href, name }: ProfileSidebarProps) {
  return (
    <Link href={href} passHref>
      <a>
        <motion.div
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
