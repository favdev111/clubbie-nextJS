import React from "react";
import TeamhubCard from "./card";
import styles from "./teamhub.module.css";

function Teamhub() {
  const clubOfficial = {
    title: "Club Official",
    desc:
      "Top of the Pile, The Big Cheese, Head-Honcho (e.g. Club Chair, Club Secretary, Club Treasurer)",
  };
  const teamLeader = {
    title: "Team Leader",
    desc:
      "The Organisers, The Strategisers, The Leaders (e.g. Manager, Coach, Captain, Team Secretary)",
  };
  const player = {
    title: "Player",
    desc: "The Heart and Soul of any Club. Just remember to bring your kit.",
  };
  return (
    <div className={styles.teamhub}>
      <h1 className={styles.teamhubTitle}>Teamhub</h1>
      <p className="teamhub__desc">
        You are currently a registered user – you’re just here to enjoy the
        amazing amateur sports content on Clubbie!
      </p>
      <div className={styles.teamhubCardContent}>
        <TeamhubCard type="club" data={clubOfficial} />
        <TeamhubCard type="leader" data={teamLeader} />
        <TeamhubCard last type="player" data={player} />
      </div>
    </div>
  );
}

export default Teamhub;
