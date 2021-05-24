import React from "react";
import PitchBlock from "@page/pitch/PitchBlock";

import Layout from "@layout";
import Seo from "@layout/seo";

const PitchPage = () => {
  return (
    <Layout>
      <Seo title="Profile Self" desc="Lorem ipsum dolor sit amet" />
      <main>
        <PitchBlock />
      </main>
    </Layout>
  );
};

export default PitchPage;
