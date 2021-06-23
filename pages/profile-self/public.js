import React from "react";
import ProfileSelf from "@page/profile-self/";
import Layout from "@layout";
import Seo from "@layout/seo";

function ProfilePagePublic({ person }) {
  return (
    <Layout>
      <Seo title="Profile Self Public" desc="Lorem ipsum dolor sit amet" />
      <ProfileSelf person={person} isPublic />
    </Layout>
  );
}

export default ProfilePagePublic;

export const getStaticProps = async () => {
  const person = {
    name: "Roger Steward",
    image: "/assets/profile-avatar.png",
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