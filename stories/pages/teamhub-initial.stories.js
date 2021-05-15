import React from "react";

import TeamhubPage from "../../pages/teamhub-initial";

export default {
  title: "Pages/Teamhub",
  component: TeamhubPage,
};

const Template = (args) => <TeamhubPage {...args} />;

export const Teamhub = Template.bind({});
