import { AnimatePresence, motion } from 'framer-motion'
import type { AppProps } from 'next/app'
import { Provider } from 'urql'
import { client, ssrCache } from '../lib/urql'
import '../styles/globals.css'

// if we're using same data, don't request new data | reuse previous cache
function MyApp({ Component, pageProps, router }: AppProps) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <Provider value={client}>
      <AnimatePresence mode='wait' key={router.asPath}>
        <motion.div initial="pageInitial" animate="pageAnimate" variants={{ pageInitial: { opacity: 0, }, pageAnimate: { opacity: 1, }, }}>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Provider>
  )
}

export default MyApp
