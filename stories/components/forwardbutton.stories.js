import React from "react";
import DirectedButton from "../../components/sub/button-directed";

export default {
  title: "UI Elements/Forward Button",
  component: DirectedButton,
};

const Template = (args) => <DirectedButton {...args} />;

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
