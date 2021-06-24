import React from "react";

import LogoutPage from "../../pages/auth/logout";

export default {
  title: "Pages/Logout",
  component: LogoutPage,
};

const Template = (args) => <LogoutPage {...args} />;

export const Logout = Template.bind({});
