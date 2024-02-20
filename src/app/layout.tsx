import { Metadata } from "next";

import "src/index.css";
import "nprogress/nprogress.css";
import ToastWrapper from "src/components/ToastWrapper";
import { Inter } from "next/font/google";
import Script from "next/script";

export const metadata: Metadata = {
  title: "SVGPS - Your Icon Store and Storage",
  description: "Welcome to Next.js",
};

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        {/* <!-- Google Analytics --> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CHZ8XNEG79"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag() { dataLayer.push(arguments) }
                  gtag("js", new Date());
                  gtag("config", "G-CHZ8XNEG79");
                  `,
          }}
        />
        {/* <!-- End Google Analytics --> */}

        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          defer={false}
          dangerouslySetInnerHTML={{
            __html: `
      document.querySelector("html").dataset.theme = "dark";`,
          }}
        />

        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body className={inter.className}>
        {children}
        <ToastWrapper />
      </body>
    </html>
  );
}
