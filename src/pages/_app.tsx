import "./styles.css";

import { SessionProvider } from "next-auth/react";

// custom context
import { ToastContextProvider } from "../contexts/ToastContext";

// components
import Layout from "../layouts/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ToastContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastContextProvider>
    </SessionProvider>
  );
}
