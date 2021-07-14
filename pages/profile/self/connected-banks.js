import React from "react";
import Seo from "@layout/seo";
import Layout from "@layout";
import ConnectedBanks from "@page/profile/connected-banks/";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function ConnectedBanksPage() {
  return (
    <Layout>
      <Seo title="Connected Banks" desc="Lorem ipsum dolor sit amet" />
      <ConnectedBanks />
    </Layout>
  );
}

export default ConnectedBanksPage;

export const getServerSideProps = requiresPageAuth();
