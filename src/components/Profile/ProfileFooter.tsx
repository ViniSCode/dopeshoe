import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowLeftShort } from 'react-icons/bs';

export function ProfileFooter () {
  return (
    <motion.footer
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    className="select-none flex items-center justify-center mb-24 px-4 md:px-10 md:pb-4 max-w-[1120px] mx-auto"
  >
    <Link href="/">
      <div className="flex items-center gap-4 cursor-pointer transition-colors hover:text-yellow-500">
        <BsArrowLeftShort fontSize={30} />
        <p className="text-[18px]">Voltar</p>
      </div>
    </Link>
  </motion.footer>
  ) 
}