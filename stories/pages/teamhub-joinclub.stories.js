import React from "react";

import TeamhubJoinClubPage from "../../pages/teamhub-jointeam";

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
  title: "Pages/Teamhub Join Club",
  component: TeamhubJoinClubPage,
};

const Template = (args) => (
  <TeamhubJoinClubPage teamData={teamData} {...args} />
);

export const TeamhubJoinClub = Template.bind({});
