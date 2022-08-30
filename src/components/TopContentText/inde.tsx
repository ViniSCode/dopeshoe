import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  duration: { }
}


export function TopContentText () {
  return (  
    <motion.div variants={container} initial="hidden" animate="visible" transition={{duration: 0.8}}>
      <div className='mt-[4rem] max-w-[430px] mx-auto'>
        <h2 className="text-[1.875rem] text-center">Ofertas especiais em setembro!</h2>
        <p className="text-sm text-gray-500 text-center">Assine a nossa newsletter e fique por dentro das novas ofertas.</p>
      </div>
    </motion.div>
  );
}