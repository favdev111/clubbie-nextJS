import React from "react";

import AccountConfirmPage from "../../pages/account-confirmation";

export default {
  title: "Pages/Account Confirmation",
  component: AccountConfirmPage,
};

const Template = (args) => <AccountConfirmPage {...args} />;

export const AccountConfirmation = Template.bind({});
