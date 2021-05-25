import React from "react";

import Layout from "@layout";
import Seo from "@layout/seo";
import ProfileSelf from "@page/profile-self/";

function ProfilePageNoclub({ person }) {
  return (
    <Layout>
      <Seo title="Profile Self NoClub" desc="Lorem ipsum dolor sit amet" />
      <ProfileSelf person={person} join />
    </Layout>
  );
}

export default ProfilePageNoclub;

export const getStaticProps = async () => {
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
  return {
    props: {
      person,
    },
  };
};
