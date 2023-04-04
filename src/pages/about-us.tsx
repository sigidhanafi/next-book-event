import Head from "next/head";
import React from "react";

// components
import PageBanner from "../components/banners/PageBanner";

const AboutPage = () => {
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
        <div className="flex flex-col space-y-8 my-10 mx-4 md:mx-16 lg:mx-52">
          <div className="flex justify-between">
            <h3 className="text-3xl font-bold text-slate-600">About Us</h3>
          </div>
          <p>
            Lets join us to meet our fun community and play fun game together!
          </p>
        </div>
      </main>
    </>
  );
};

export default AboutPage;
