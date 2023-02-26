import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          async
          src="https://kit.fontawesome.com/73ab1ee574.js"
          crossOrigin="anonymous"
        ></script>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <body className="bg-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
