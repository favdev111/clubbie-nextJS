import React from "react";

import TeamhubJoinTeamPage from "../../pages/teamhub-jointeam";

const teamData = [
  { name: "Aondimentum", src: "./" },
  { name: "Aunc curabitur FC", src: "./" },
  { name: "Adipiscing FC", src: "./" },
  { name: "Aondimentum", src: "./" },
  { name: "Aunc curabitur FC", src: "./" },
  { name: "Adipiscing FC", src: "./" },
  { name: "Aondimentum", src: "./" },
  { name: "Aunc curabitur FC", src: "./" },
  { name: "Adipiscing FC", src: "./" },
  { name: "Aondimentum", src: "./" },
  { name: "Aunc curabitur FC", src: "./" },
  { name: "Adipiscing FC", src: "./" },
  { name: "Aondimentum", src: "./" },
  { name: "Aunc curabitur FC", src: "./" },
  { name: "Adipiscing FC", src: "./" },
  { name: "Aondimentum", src: "./" },
  { name: "Aunc curabitur FC", src: "./" },
  { name: "Adipiscing FC", src: "./" },
];
export default {
  title: "Pages/Teamhub Join Team",
  component: TeamhubJoinTeamPage,
};

const Template = (args) => (
  <TeamhubJoinTeamPage teamData={teamData} {...args} />
);

export const TeamhubJoinTeam = Template.bind({});
