import React from "react";

import ConnectedBanksPage from "../pages/connected-banks";

export default {
  title: "Pages/Connected Banks",
  component: ConnectedBanksPage,
};

const Template = (args) => <ConnectedBanksPage {...args} />;

export const ConnectedBanks = Template.bind({});
