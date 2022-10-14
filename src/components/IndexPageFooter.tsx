import { motion } from "framer-motion";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

interface IndexPageFooterProps {
  data: any, 
  setOffset: any, 
  setPage: any, 
  offset: any, 
  page: any, 
  productsPerPage: any
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export function IndexPageFooter ({data, setOffset, setPage, offset, page, productsPerPage}: IndexPageFooterProps) {
  return (
    <motion.footer
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    className="select-none flex items-center justify-between mb-24 px-4 md:px-10 md:pb-4 max-w-[1120px] mx-auto"
  >
    <>
      <div>
        <p className="text-gray-500 underline">All</p>
      </div>

      <div className="flex items-center justify-center gap-2">
        <div
          onClick={() => {
            if (data?.product.pageInfo.hasPreviousPage) {
              setOffset(offset - productsPerPage);
              setPage(page - 1);
            }
          }}
          className={`flex items-center gap-4 cursor-pointer transition-colors hover:text-yellow-500 ${
            !data?.product.pageInfo.hasPreviousPage &&
            "text-gray-500 hover:text-gray-500 opacity-80 cursor-auto"
          }`}
        >
          <BsArrowLeftShort fontSize={30} />
        </div>
        <span>{String(page)}</span>
        <div
          onClick={() => {
            if (data?.product.pageInfo.hasNextPage) {
              setOffset(offset + productsPerPage);
              setPage(page + 1);
            }
          }}
          className={`flex items-center gap-4 cursor-pointer transition-colors hover:text-yellow-500 ${
            !data?.product.pageInfo.hasNextPage &&
            "text-gray-500 hover:text-gray-500 opacity-80 cursor-auto"
          }`}
        >
          <BsArrowRightShort fontSize={30} />
        </div>
      </div>

      <div>
        <span>{String(page)}</span>
      </div>
    </>
  </motion.footer>
  )
}