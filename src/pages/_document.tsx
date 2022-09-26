import Document, { Html, Head, Main, NextScript } from "next/document";

const isDevelopment = process.env.NODE_ENV === "development";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" data-theme="dark">
        <Head>
          <title>SVGPS - Free Icons, Icon converter.</title>
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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
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
