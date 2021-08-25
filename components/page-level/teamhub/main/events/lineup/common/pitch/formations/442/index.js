import React from "react";
import FormationBase from "../base";
import styles from "./index.module.css";

const Formation442 = ({
  editMode,
  playerShirtColor,
  goalKeeperShirtColor,
  lineup,
}) => {
  const _defaultLineup = [
    { position: "A1" },
    { position: "A2" },

    { position: "B1" },
    { position: "B2" },
    { position: "B3" },
    { position: "B4" },

    { position: "C1" },
    { position: "C2" },
    { position: "C3" },
    { position: "C4" },

    { position: "GK" },
  ];

  return (
    <FormationBase
      editMode={editMode}
      playerShirtColor={playerShirtColor}
      goalKeeperShirtColor={goalKeeperShirtColor}
      defaultLineup={_defaultLineup}
      lineup={lineup}
      styleSheet={styles}
    />
  );
};

export default Formation442;
