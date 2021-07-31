import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import Content from "@page/content";

function ContentAdd({ user }) {
  return (
    <Layout>
      <Seo title="Add Content" desc="Lorem ipsum dolor sit amet" />
      <Content mode="add" user={user} />
    </Layout>
  );
}

export default ContentAdd;

export const getServerSideProps = requiresPageAuth();
