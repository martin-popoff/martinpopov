import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          async
          src="https://kit.fontawesome.com/6947542d52.js"
          crossOrigin="anonymous"
        ></script>
        <meta name="robots" content="noindex"></meta>
        <link rel="stylesheet" href="https://use.typekit.net/lao8pun.css" />
      </Head>
      <body className="h-[100vh] w-[100vw] overflow-hidden bg-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
