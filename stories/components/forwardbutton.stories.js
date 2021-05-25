import React from "react";
import ForwardButton from "../../components/sub/button-forward";

export default {
  title: "UI Elements/Forward Button",
  component: ForwardButton,
};

const Template = (args) => <ForwardButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  children: "Add something",
};
export const Secondary = Template.bind({});
Secondary.args = {
  children: "Add something",
  appearence: "bank",
};
