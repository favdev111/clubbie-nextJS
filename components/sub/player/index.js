import React, { useState } from "react";
import PlayerIcon from "./player-icon";
import PlusIcon from "./plus-icon";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFigForNaming,
  setActivePlayer,
} from "@redux/pitch.slice";
import styles from "./player.module.css";

const Player = ({ figId, name, isCaptain, colorPlayer, setupCaptain }) => {
  const dispatch = useDispatch();
  const [showCaptain, setShowCaptain] = useState(false);

  const addNameHandler = () => {
    const activePlayer = { id: figId, player: "active" };
    dispatch(selectFigForNaming({ figId }));
    dispatch(setActivePlayer({ activePlayer }));
  };
  const activePlayer = useSelector((state) => state.pitch.activePlayer);

  const setupCap = () => {
    setupCaptain(figId);
  };
  const showTextCaptain = () => {
    if (name.length > 0 && isCaptain === false) {
      setShowCaptain(true);
    }
  };
  const hideTextCaptain = () => {
    setShowCaptain(false);
  };
  return (
    <div
      className={`${styles.player} ${
        activePlayer.id === figId ? styles.activePlayer : styles.nonactivePlayer
      }`}
    >
      <div
        onMouseMove={showTextCaptain}
        onMouseLeave={hideTextCaptain}
        onDoubleClick={setupCap}
        className={styles.playerIcon}
      >
        <PlayerIcon color={colorPlayer} />
      </div>

      {name.length === 0 && (
        <div onClick={addNameHandler} className={styles.playerPlus}>
          <PlusIcon />
        </div>
      )}
      {isCaptain && (
        <div className={styles.playerSign}>
          <span className={styles.playerSignText}>C</span>
        </div>
      )}

      <div
        className={`${styles.playerName} ${
          name.length > 0 ? styles.activeName : styles.nonactiveName
        }`}
      >
        <span className={styles.playerNameText}>{name}</span>
      </div>

      {showCaptain && (
        <div className={styles.playerCaptain}>
          <span className={styles.playerCaptainText}>Set Captain</span>
        </div>
      )}
    </div>
  );
};

export default Player;
