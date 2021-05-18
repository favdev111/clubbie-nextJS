import React from "react";

import RecoverPassPage from "../../pages/recovery-pass";

export default {
  title: "Pages/Recovery Password",
  component: RecoverPassPage,
};

const Template = (args) => <RecoverPassPage {...args} />;

export const RecoveryPassword = Template.bind({});
