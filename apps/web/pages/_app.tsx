import { useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";
import { NOTUS_MESSAGE } from "../mocks/data";

export default function App({ Component, pageProps }: AppProps) {
  // TODO remove error
  // @ts-expect-error
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  useEffect(() => console.log(NOTUS_MESSAGE), []);

  return (
    <>
      {/* TODO Meta component */}
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Notus NextJS by Creative Tim</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
