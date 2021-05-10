import React from "react";

import ProfilePagePublic from "../pages/profile-self-public";

export default {
  title: "Pages/Profile Self Public",
  component: ProfilePagePublic,
};

const Template = (args) => <ProfilePagePublic {...args} />;

export const ProfileSelfPublic = Template.bind({});
