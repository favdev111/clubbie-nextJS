import React from "react";
import Join from "@page/join/";
import Layout from "@layout/";
import Seo from "@layout/seo";

function TeamhubJoinClubPage({ teamData }) {
  return (
    <Layout>
      <Seo title="Join a Club" desc="Lorem ipsum dolor sit amet" />
      <Join title="Join a Club" data={teamData} />
    </Layout>
  );
}

export default TeamhubJoinClubPage;

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
