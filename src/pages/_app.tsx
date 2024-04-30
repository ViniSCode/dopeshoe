import localFont from "@next/font/local";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "urql";
import { CartContextProvider } from "../contexts/cartContext";
import { client, ssrCache } from "../lib/urql";
import "../styles/globals.css";

const clash = localFont({
  src: [
    {
      path: "../../public/fonts/ClashGrotesk-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/ClashGrotesk-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/ClashGrotesk-Semibold.ttf",
      weight: "600",
    },
    {
      path: "../../public/fonts/ClashGrotesk-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-clash",
});

function MyApp({ Component, pageProps, router }: AppProps) {
  // const [isPageLoading, setIsPageLoading] = useState(false);

  // useEffect(() => {
  //   router.events.on("routeChangeStart", (url) => {
  //     setIsPageLoading(true);
  //   });

  //   router.events.on("routeChangeComplete", (url) => {
  //     setIsPageLoading(false);
  //   });
  // }, []);

  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <SessionProvider session={pageProps.session}>
      {/* {isPageLoading && <Loading />} */}
      <Provider value={client}>
        <Theme>
          <div className={`${clash.variable} font-sans`}>
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
          </div>
        </Theme>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
