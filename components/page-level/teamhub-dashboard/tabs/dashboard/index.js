import React from "react";
import styles from "./index.module.css";
import LastResult from "./lastresult";
import MyTeam from "./myteam";
import RecentVideos from "./recent";
import UpNext from "./upnext";
import LeagueTable from "./league-table";
import PaymentOverview from "./pay-overview";

function Dashboard() {
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
        <h1> Dashboard</h1>
        {/* teamcard */}
        <MyTeam />
        {/* recent videos */}
        <RecentVideos />
        {/* up next */}
        <UpNext data={dashboard.upnext} />
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
