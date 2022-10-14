import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";


export function ProductFooter () {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="flex items-center px-4 justify-between mb-24 md:px-10 max-w-[1120px] mx-auto"
    >
      <Link href="/">
        <p className="text-gray-500 underline transition-colors hover:text-yellow-500 cursor-pointer">
          All <br />
        </p>
      </Link>
      <Link href="/">
        <div className="flex items-center gap-4 cursor-pointer transition-colors hover:text-yellow-500">
          <BsArrowLeftShort fontSize={30} />
          <p className="text-[18px]">Voltar</p>
        </div>
      </Link>
      <div>
        <span className="text-gray-500">{" < 1 > "}</span>
      </div>
    </motion.footer>
  )
}