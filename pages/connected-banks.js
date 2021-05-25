import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import ConnectedBanks from "@page/connected-banks/";

function ConnectedBanksPage({ cardData }) {
  return (
    <Layout>
      <Seo title="Connected Banks" desc="Lorem ipsum dolor sit amet" />
      <ConnectedBanks data={cardData} />
    </Layout>
  );
}

export default ConnectedBanksPage;

export const getStaticProps = async () => {
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
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 5433",
      default: false,
    },
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 5433",
      default: false,
    },
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 5433",
      default: false,
    },
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 5433",
      default: false,
    },
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 5433",
      default: false,
    },
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 5433",
      default: false,
    },
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 5433",
      default: false,
    },
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 5433",
      default: false,
    },
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 5433",
      default: false,
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
};
