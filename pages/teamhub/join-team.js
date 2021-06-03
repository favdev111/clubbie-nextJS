import React from "react";
import Join from "@page/join/";
import Layout from "@layout/";
import Seo from "@layout/seo";

function TeamhubJoinTeamPage({ teamData }) {
  return (
    <Layout>
      <Seo title="Join a team" desc="Lorem ipsum dolor sit amet" />
      <Join
        title="Join a Team"
        current={{ name: "Aondimentum", src: "./" }}
        data={teamData}
      />
    </Layout>
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
