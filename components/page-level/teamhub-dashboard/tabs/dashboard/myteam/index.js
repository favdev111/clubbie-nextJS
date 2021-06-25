import React from "react";
import TeamCard from "./card";
import styles from "./index.module.css";

function MyTeam({ active, setactive, data }) {
  const myTeams = [
    {
      name: "Shottery United",
      src: "./assets/team1.png",
      active: true,
    },
    {
      name: "Men's FC",
      src: "./assets/team2.png",
      active: false,
    },
  ];
  return (
    <>
      <div className={styles.myTeam}>
        <h3> My team</h3>
        <div className={styles.myTeamFlex}>
          {myTeams.map((team, index) => (
            <TeamCard
              key={team + index}
              active={active}
              index={index}
              data={team}
              setactive={setactive}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyTeam;
