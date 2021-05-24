import React from "react";
import Header from "@layout/header/";
import ProfileSelf from "@page/profile-self/";

function ProfilePagePublic({ person }) {
  return (
    <div className="container">
      <Header />
      <ProfileSelf person={person} isPublic />
    </div>
  );
}

export default ProfilePagePublic;

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
