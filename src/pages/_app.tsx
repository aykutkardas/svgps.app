import "src/index.css";
import "nprogress/nprogress.css";

import { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { Toaster } from "react-hot-toast";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 1500,
        className:
          "bg-neutral-200 dark:bg-neutral-800 text-xs text-neutral-900 dark:text-neutral-50 border border-neutral-200/10",
        style: {
          padding: "5px 10px",
          color: "white",
        },
        success: {
          iconTheme: {
            primary: "rgb(192,132,252)",
            secondary: "white",
          },
        },
        error: {
          iconTheme: {
            primary: "rgb(244,63,94)",
            secondary: "white",
          },
        },
      }}
    />
    <Component {...pageProps} />
  </>
);

export default MyApp;
