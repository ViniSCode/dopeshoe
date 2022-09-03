import { motion } from 'framer-motion';

export function SearchFilter () {
  return ( 
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay:0.2}} className='select-none flex items-center justify-center gap-8 mt-20 text-[14px] md:text-base'>
      <span className='text-red-600 cursor-pointer'>Popular</span>
      <span className='cursor-pointer'>Best Sellers</span>
      <span className='text-gray-300 font-bold'>|</span>
      <span className='cursor-pointer'>discounts</span>
    </motion.div>
  );
}

