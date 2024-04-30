import { motion } from "framer-motion";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

interface IndexPageFooterProps {
  data: any;
  setOffset: any;
  setPage: any;
  offset: any;
  page: any;
  productsPerPage: any;
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

export function Pagination({
  data,
  setOffset,
  setPage,
  offset,
  page,
  productsPerPage,
}: IndexPageFooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="mt-32 select-none flex items-center justify-center px-4 md:px-10 max-w-[1120px] mx-auto"
    >
      <>
        <div className="flex items-center justify-center gap-2 bg-white rounded-full p-2">
          <div
            onClick={() => {
              if (data?.product.pageInfo.hasPreviousPage) {
                setOffset(offset - productsPerPage);
                setPage(page - 1);
              }
            }}
            className={`cursor-pointer text-base bg-black text-white font-medium rounded-lg h-9 w-9 flex items-center justify-center text-center ${
              !data?.product.pageInfo.hasPreviousPage &&
              "opacity-60 cursor-default"
            }`}
          >
            <MdOutlineKeyboardArrowLeft size={19} />
          </div>
          <span className="border bg-white text-black rounded-lg h-9 w-9 font-medium flex items-center justify-center text-center text-base">
            {String(page)}
          </span>
          <div
            onClick={() => {
              if (data?.product.pageInfo.hasNextPage) {
                setOffset(offset + productsPerPage);
                setPage(page + 1);
              }
            }}
            className={`cursor-pointer text-base bg-black text-white font-medium rounded-lg h-9 w-9 flex items-center justify-center text-center ${
              !data?.product.pageInfo.hasNextPage && "opacity-10 cursor-default"
            }`}
          >
            <MdOutlineKeyboardArrowRight size={19} />
          </div>
        </div>
      </>
    </motion.footer>
  );
}
