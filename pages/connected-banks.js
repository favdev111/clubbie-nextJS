import React from "react";
import Header from "@layout/header/";
import ConnectedBanks from "@page/connected-banks/";

function ConnectedBanksPage({ cardData }) {
  return (
    <div className="container">
      <Header />
      <ConnectedBanks data={cardData} />
    </div>
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
