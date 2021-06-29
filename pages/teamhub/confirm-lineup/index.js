import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";
import PitchBlock from "@page/pitch/PitchBlock";

function PitchPage() {
  const authUser = auth.getUser();
  return (
    <Layout>
      <Seo title="Dashboard" desc="Lorem ipsum dolor sit amet" />
      <main>
        <PitchBlock />
      </main>
    </Layout>
  );
}

export default PitchPage;

export const getServerSideProps = requiresPageAuth();
