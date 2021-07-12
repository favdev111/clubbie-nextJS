import React from "react";
import Seo from "@layout/seo";
import Layout from "@layout";
import ConnectedBanks from "@page/connected-banks/";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function ConnectedBanksPage({ cardData }) {
  return (
    <Layout>
      <Seo title="Connected Banks" desc="Lorem ipsum dolor sit amet" />
      <ConnectedBanks data={cardData} />
    </Layout>
  );
}

export default ConnectedBanksPage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const cardData = [
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 6574",
      default: true,
    },
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 5433",
      default: false,
    },
  ];
  return {
    props: {
      cardData,
    },
  };
});
