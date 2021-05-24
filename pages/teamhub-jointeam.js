import React from "react";
import Header from "@layout/header/";
import Join from "@page/join/";

function TeamhubJoinTeamPage({ teamData }) {
  return (
    <div className="container">
      <Header />
      <Join
        title="Join a Team"
        current={{ name: "Aondimentum", src: "./" }}
        data={teamData}
      />
    </div>
  );
}

export default TeamhubJoinTeamPage;

export const getStaticProps = async () => {
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
  return {
    props: {
      teamData,
    },
  };
};
