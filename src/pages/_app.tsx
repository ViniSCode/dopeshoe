import { AnimatePresence, motion } from 'framer-motion'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence mode='wait' key={router.asPath}>
      <motion.div initial="pageInitial" animate="pageAnimate" variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
        },
      }}>
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  )
}

export default MyApp
