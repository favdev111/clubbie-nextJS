import React from "react";

import AccountVerifPage from "../../pages/auth/account-verification";

export default {
  title: "Pages/Account Verification",
  component: AccountVerifPage,
};

const Template = (args) => <AccountVerifPage {...args} />;

export const AccountVerification = Template.bind({});
