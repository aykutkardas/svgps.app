import "src/index.css";
import "nprogress/nprogress.css";

import { AppProps } from "next/app";
import Router from "next/router";
import Script from "next/script";
import NProgress from "nprogress";
import { Toaster } from "react-hot-toast";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Toaster
      position="bottom-right"
      toastOptions={{
        className:
          "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50",
      }}
    />
    <Script src="/theme.js" defer={false} strategy="beforeInteractive" />
    <Component {...pageProps} />
  </>
);

export default MyApp;
