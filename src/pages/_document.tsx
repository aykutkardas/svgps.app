import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const isDevelopment = process.env.NODE_ENV === "development";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" data-theme="dark">
        <Head>
          {!isDevelopment && (
            <>
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
            </>
          )}

          <Script
            id="theme-initializer"
            strategy="beforeInteractive"
            defer={false}
          >
            {`document.querySelector("html").dataset.theme = "dark";`}
          </Script>

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
            rel="stylesheet"
          />

          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
