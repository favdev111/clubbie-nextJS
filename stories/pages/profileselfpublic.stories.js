import React from "react";

import ProfilePagePublic from "../../pages/profile-self-public";
const person = {
  name: "Roger Steward",
  role: "Footballer",
  email: "roger@gmail.com",
  telephone: "+44 7500 555 555",
  city: "Statford-Upon-Avon",
  country: "United Kingdom",
  postCode: "CV37 4HB",
  bio:
    "Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere. Nulla ultrices facilisis justo, non varius nisl semper vel.",
};
export default {
  title: "Pages/Profile Self Public",
  component: ProfilePagePublic,
};

const Template = (args) => <ProfilePagePublic person={person} {...args} />;

export const ProfileSelfPublic = Template.bind({});
