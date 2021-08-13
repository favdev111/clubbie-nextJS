import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import Teamhub from "@page/teamhub/onboard";

function TeamhubPage() {
  return (
    <Layout>
      <Seo title="Teamhub" desc="Lorem ipsum dolor sit amet" />
      <Teamhub />
    </Layout>
  );
}

export default TeamhubPage;
