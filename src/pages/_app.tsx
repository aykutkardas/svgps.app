import "src/index.css";

import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import Header from "src/components/Header";
import Footer from "src/components/Footer";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Toaster
      position="bottom-right"
      toastOptions={{
        className:
          "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50",
      }}
    />
    <div className="container mx-auto flex min-h-screen flex-col p-3">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  </>
);

export default MyApp;
