import "src/index.css";

import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Toaster
      position="bottom-right"
      toastOptions={{
        className:
          "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50",
      }}
    />
    <Component {...pageProps} />
  </>
);

export default MyApp;
