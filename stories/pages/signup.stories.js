import React from "react";

import SignUpPage from "../../pages/sign-up";

export default {
  title: "Pages/Sign Up",
  component: SignUpPage,
};

const Template = (args) => <SignUpPage {...args} />;

export const SignUp = Template.bind({});
