import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import LastResult from "./lastresult";
import MyTeam from "./myteam";
import RecentVideos from "./recent";
import UpNext from "./upnext";
import LeagueTable from "./league-table";
import PaymentOverview from "./pay-overview";
import Teams from "@api/services/Teams";
import HTTPClient from "@api/HTTPClient";

function Dashboard({ user, activeTeam, setTeam }) {
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [userTeams, setUserTeams] = useState([]);
  const [dashboardData, setDashData] = useState([]);

  useEffect(() => {
    const fetchUserTeams = async () => {
      /* queries */
      const arr = [];
      user.teams.map((i) => {
        arr.push(i.team);
      });
      const queries = arr.reduce((a, b) => {
        let sum = `${a}` + `&id=${b}`;
        return sum;
      });

      const response = await Teams.GetTeamsWithDetail(`id=${queries}`);
      const allUserTeams = response.data;
      setUserTeams(allUserTeams);
    };

    const fetchSelectedTeam = async () => {
      const dashboardResponse = await Teams.GetTeamDashboard(
        user.teams[activeTeam].team
      );
      setSelectedTeam(dashboardResponse.data.team);
      setDashData(dashboardResponse.data);
    };
    fetchUserTeams();
    fetchSelectedTeam();
  }, [activeTeam]);

  /*   console.log(dashboardData?.nextMatch[0]);
   */
  /* Todo : send data into components dinamicly when fake data added */

  const dashboard = {
    upnext: {
      homeTeam: { name: "Shottery United", src: "./assets/team1.png" },
      awayTeam: { name: "Men's FC", src: "./assets/team2.png" },
      eventDetails: {
        date: "07.01.12",
        kickoff: "02.00 PM",
        adress: "Lorem Upsum Street,",
        state: "Lorem, 01277",
      },
    },
    lastresult: {
      homeTeam: { name: "Shottery United", src: "./assets/team1.png" },
      awayTeam: { name: "Men's FC", src: "./assets/team2.png" },
      score: "3 - 0",
      scorers: [
        { name: "Kevin Sullivan", min: 21 },
        { name: "Richard Murphy", min: 62 },
        { name: "Johnny Ross", min: 82 },
      ],
    },
  };
  return (
    <div className={styles.dashboardContent}>
      <div className={styles.dashboard}>
        <h1 className={styles.title}> Dashboard</h1>
        {/* teamcard */}
        <MyTeam
          data={selectedTeam}
          user={user}
          userTeams={userTeams}
          setactive={setTeam}
          active={activeTeam}
        />
        {/* recent videos */}
        <RecentVideos />
        {/* up next */}
        {dashboardData?.nextMatch?.length > 0 && (
          <UpNext data={dashboardData.nextMatch} />
        )}
        {/* last result */}
        <LastResult data={dashboard.lastresult} />
        {/* League table */}
        <LeagueTable />
        {/* Payments overview */}
        <PaymentOverview />
      </div>
    </div>
  );
}

export default Dashboard;
