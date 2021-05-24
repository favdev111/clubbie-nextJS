import React from "react";
import Head from "next/head";

export default function Seo({ title, desc }) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
