import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import Content from "@page/content";

function ContentAdd() {
  return (
    <Layout>
      <Seo title="Add Content" desc="Lorem ipsum dolor sit amet" />
      <Content addMode />
    </Layout>
  );
}

export default ContentAdd;

export const getServerSideProps = requiresPageAuth();
