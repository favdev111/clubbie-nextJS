import React from "react";

import ProfilePage from "../../pages/profile-self";

export default {
  title: "Pages/Profile Self",
  component: ProfilePage,
};

const Template = (args) => <ProfilePage {...args} />;

export const ProfileSelf = Template.bind({});
