import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Teams from "@api/services/Teams";
import HTTPClient from "@api/HTTPClient";
import Qs from "qs";

function MatchCard({ data }) {
  const [teams, setTeams] = useState(null);
  const [query, setQuery] = useState("");

  /* Not done yet */

  useEffect(() => {
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
        setTeams(response.data);
      });
    });

    fetchPromise.then(async () => {});
  });

  return (
    <div className={styles.score}>
      <div className={styles.teamCard}>
        <img src={teams && teams[0].crest?.s3Url} />
        {teams && teams[0].title}
      </div>

      {/* Middle */}
      <div className={styles.scoreMiddle}>
        <p className="opacity-50">Match</p>
        <h1>vs</h1>
      </div>

      {/* Away Team */}
      <div className={styles.teamCard}>
        <img src={teams && teams[1].crest?.s3Url} />
        {teams && teams[1]?.title}
      </div>
    </div>
  );
}

export default MatchCard;
