import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps }) => (
  <React.Fragment>
    <Head>
      <title>Proximity Chat</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </React.Fragment>
);

export default MyApp;
