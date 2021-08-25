import React, { useState, useEffect } from "react";
import Formation433 from "./formations/433";
import Formation442 from "./formations/442";
import Formation451 from "./formations/451";
import matchFormationTypes from "@utils/fixedValues/matchFormations";
import styles from "./index.module.css";

function Pitch({ formation, playerShirtColor, goalKeeperShirtColor, lineup }) {
  const [_formation, setFormation] = useState(matchFormationTypes["442"]);
  const [_playerShirtColor, setPlayerShirtColor] = useState(null);
  const [_goalKeeperShirtColor, setGoalKeeperShirtColor] = useState(null);
  const [_lineup, setLineup] = useState(null);

  useEffect(() => {
    formation && setFormation(formation);
  }, []);

  useEffect(() => {
    formation && setFormation(formation);
  }, [formation]);

  useEffect(() => {
    setPlayerShirtColor(playerShirtColor);
  }, [playerShirtColor]);

  useEffect(() => {
    setGoalKeeperShirtColor(goalKeeperShirtColor);
  }, [goalKeeperShirtColor]);

  useEffect(() => {
    lineup && setLineup([...lineup]);
  }, [lineup]);

  return (
    <div className={styles.pitchImgWrapper}>
      <img className={styles.pitchImg} src="/assets/field.png" alt="pitch" />
      {_formation === matchFormationTypes["433"] && (
        <Formation433
          playerShirtColor={_playerShirtColor}
          goalKeeperShirtColor={_goalKeeperShirtColor}
          lineup={_lineup}
        />
      )}
      {_formation === matchFormationTypes["442"] && (
        <Formation442
          playerShirtColor={_playerShirtColor}
          goalKeeperShirtColor={_goalKeeperShirtColor}
          lineup={_lineup}
        />
      )}
      {_formation === matchFormationTypes["451"] && (
        <Formation451
          playerShirtColor={_playerShirtColor}
          goalKeeperShirtColor={_goalKeeperShirtColor}
          lineup={_lineup}
        />
      )}
    </div>
  );
}

export default Pitch;
