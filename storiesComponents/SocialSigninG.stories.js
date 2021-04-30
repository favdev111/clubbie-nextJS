import React from "react";

import SocialSigninGpage from '../pages/social-signin-g';

export default {
    title: 'Pages/Sign In Google',
    component: SocialSigninGpage,
}

const Template = (args) => <SocialSigninGpage {...args} />;

export const SignInGoogle = Template.bind({});
