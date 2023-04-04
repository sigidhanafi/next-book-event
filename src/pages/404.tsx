import React from "react";

import Head from "next/head";

// components
import NotFound from "../components/commons/NotFound";
import PageBanner from "../components/banners/PageBanner";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Fun Football</title>
        <meta name="description" content="meet fun team at Fun Footbal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageBanner />
        <NotFound />
      </main>
    </>
  );
};

export default NotFoundPage;
