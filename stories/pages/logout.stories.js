import React from "react";

import LogoutPage from "../../pages/logout";

export default {
  title: "Pages/Logout",
  component: LogoutPage,
};

const Template = (args) => <LogoutPage {...args} />;

export const Logout = Template.bind({});
