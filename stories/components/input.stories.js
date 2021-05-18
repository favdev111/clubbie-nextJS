import React from "react";
import Input from "../../components/UI/Input/index";

export default {
  title: "UI Elements/Input",
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Email = Template.bind({});
Email.args = {
  primary: true,
  type: "email",
  placeholder: "Your Email Address",
};
export const Password = Template.bind({});
Password.args = {
  type: "password",
  placeholder: "Pasword",
};
