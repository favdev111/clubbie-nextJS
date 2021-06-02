import React from "react";
import ProfileSelf from "@page/profile-self";
import Layout from "@layout";
import Seo from "@layout/seo";

function ProfilePage({ person }) {
  return (
    <Layout>
      <Seo title="Edit Profile" desc="Edit Your Public Profile on Clubbie" />
      <ProfileSelf person={person} editMode />
    </Layout>
  );
}

export default ProfilePage;

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
