import { useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { NOTUS_MESSAGE } from "../mocks/data";
import { wrapper } from "store";
import { Provider } from "react-redux";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/index.css";
import "../styles/tailwind.css";

const App = ({ Component, ...pageProps }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(pageProps);

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
      <Provider store={store}>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </Provider>
    </>
  );
};

export default wrapper.withRedux(App);
