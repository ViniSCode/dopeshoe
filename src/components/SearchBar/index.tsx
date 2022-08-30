import { motion } from 'framer-motion';
import { BiSearch } from 'react-icons/bi';
import { TbArrowDownCircle } from 'react-icons/tb';

const container = {
  hidden: { 
    opacity: 0,
  },
  visible: { 
    opacity: 1,
  },
  duration: { }
}


export function SearchBar () {
  return (
    <motion.div className="mt-[2rem] max-w-[500px] mx-auto" variants={container} initial="hidden" animate="visible" transition={{duration: 0.9}}>
    <label className="flex items-center justify-center relative z-10">
      <div className="w-[100%]">
        <div className='cursor-pointer absolute z-10 bg-gradient-to-r from-[#ca2765] to-[#ec5a68] flex items-center gap-2 px-3 py-2 rounded-[7px] w-fit ml-1'>
          <span className='text-[20px]'>Shoes</span>
          <TbArrowDownCircle fontSize={20}/>
        </div>
        <div>
          <input type="text" className='relative bg-gray-600 pr-4 pl-32 py-3 w-[100%] rounded-[7px] text-gray-200 placeholder-gray-200 focus:outline-none' placeholder="Search shoes"/>  
          <BiSearch fontSize={20} className="absolute top-3 right-5 mt-[3px] text-gray-200"/>
        </div>
      </div>
    </label>
  </motion.div>
  ) 
}