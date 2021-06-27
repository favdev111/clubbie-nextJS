import React from "react";
import Link from "next/link";
import PlusTurkSVG from "@svg/plus-turk";
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
        <div className={styles.myTeamFlex}>
          <h3>My team</h3>
          <Link href="/teamhub/initial">
            <span className={styles.teamhubInitial}>
              <PlusTurkSVG></PlusTurkSVG>
            </span>
          </Link>
        </div>
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
