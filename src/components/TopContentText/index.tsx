import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export function TopContentText () {
  return (  
    <motion.div variants={container} initial="hidden" animate="visible" transition={{duration: 0.5}}>
      <div className='mt-[4rem] max-w-[450px] mx-auto select-none'>
        <h2 className="text-[25px] md:text-[1.875rem] md:whitespace-nowrap text-center">Ofertas especiais em setembro!</h2>
        <p className="text-sm text-gray-500 text-center">Assine a nossa newsletter e fique por dentro das novas ofertas.</p>
      </div>
    </motion.div>
  );
}