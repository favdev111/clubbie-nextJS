import React from "react";
import Header from "@c/Header/";
import Join from "@c/Join/";

function TeamhubJoinClubPage() {
  const teams = [
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
  return (
    <div className="container">
      <Header />
      <Join title="Join a Club" data={teams} />
    </div>
  );
}

export default TeamhubJoinClubPage;
