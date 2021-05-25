import React from "react";

import ConnectedBanksPage from "../../pages/connected-banks";

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

export default {
  title: "Pages/Connected Banks",
  component: ConnectedBanksPage,
};

const Template = (args) => <ConnectedBanksPage cardData={cardData} {...args} />;

export const ConnectedBanks = Template.bind({});
