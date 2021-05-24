import React from "react";
import Teamhub from "@page/teamhub/";
import Layout from "@layout";
import Seo from "@layout/seo";

function TeamhubPage() {
  return (
    <Layout>
      <Seo title="Teamhub" desc="Lorem ipsum dolor sit amet" />
      <Teamhub />
    </Layout>
  );
}

export default TeamhubPage;
