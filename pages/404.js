import React from "react";
import Link from "next/link";
import Layout from "@layout";
import Seo from "@layout/seo";

export default function Error() {
  return (
    <Layout hideHeader>
      <Seo title="404 Not Found" desc="Lorem ipsum dolor sit amet" />
      <div className="notFound">
        <h1> 404. Not Found</h1>

        <Link href="/">
          <a className="back">Back home </a>
        </Link>
      </div>
    </Layout>
  );
}
