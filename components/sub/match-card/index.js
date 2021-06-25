import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Teams from "@api/services/Teams";
import HTTPClient from "@api/HTTPClient";
import Qs from "qs";

function MatchCard({ data, token }) {
  const [teams, setTeams] = useState([]);
  const [query, setQuery] = useState("");

  /* Not done yet */

  useEffect(() => {
    HTTPClient.setHeader("Authorization", `Bearer ${token}`);
    const fetchPromise = new Promise((resolve, reject) => {
      const params = {
        id: [data[0].teamId, data[1].teamId],
      };
      const paramSerialize = async (params) => {
        const i = Qs.stringify(params, { arrayFormat: "repeat" });
        return { params: i };
      };
      paramSerialize(params).then(async function (result) {
        setQuery(result.params);
        const response = query != "" && (await Teams.GetTeamsWithDetail(query));
        setTeams(response);
      });
    });

    fetchPromise.then(async () => {});
  }, [query]);

  return (
    <div className={styles.score}>
      <div className={styles.teamCard}>
        {/*    <img src={hometeam.src} /> */}
        {/*        {hometeam.name} */}
        {data[0].teamId}
      </div>

      {/* Middle */}
      <div className={styles.scoreMiddle}>
        <p className="opacity-50">Match</p>
        <h1>vs</h1>
      </div>

      {/* Away Team */}
      <div className={styles.teamCard}>
        {/*       <img src={awayteam.src} /> */}
        {/*         {awayteam.name}
         */}
        {data[1].teamId}
      </div>
    </div>
  );
}

export default MatchCard;
