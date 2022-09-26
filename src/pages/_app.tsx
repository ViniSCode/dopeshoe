import { AnimatePresence, motion } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "urql";
import { CartContextProvider } from "../contexts/cartContext";
import { client, ssrCache } from "../lib/urql";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }
  return (
    <SessionProvider session={pageProps.session}>
      <Provider value={client}>
        <AnimatePresence mode="wait" key={router.asPath}>
          <motion.div
            initial="pageInitial"
            animate="pageAnimate"
            variants={{
              pageInitial: { opacity: 0 },
              pageAnimate: { opacity: 1 },
            }}
          >
            <ToastContainer
              position="top-right"
              autoClose={6000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <CartContextProvider>
              <Component {...pageProps} />
            </CartContextProvider>
          </motion.div>
        </AnimatePresence>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
