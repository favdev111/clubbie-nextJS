import React from "react";

import SocialSigninFBpage from "../../pages/social-signin-fb";

export default {
  title: "Pages/Sign In Facebook",
  component: SocialSigninFBpage,
};

const Template = (args) => <SocialSigninFBpage {...args} />;

export const SignInFacebook = Template.bind({});
