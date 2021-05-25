import React from "react";
import Player from "../player";
import styles from "./form451.module.css";

const Form451 = ({ colorPlayers, colorGoalk, playerName, setupCaptain }) => {
  return (
    <div>
      {/*first line*/}
      <div className={styles.form451upCenter}>
        <Player
          figId="3-1-1"
          colorPlayer={colorPlayers}
          name={playerName.find((elem) => elem.id === "3-1-1").name}
          isCaptain={playerName.find((elem) => elem.id === "3-1-1").isCaptain}
          setupCaptain={setupCaptain}
        />
      </div>
      {/*second line*/}
      <div className={styles.form451midLeft}>
        <Player
          figId="3-2-1"
          colorPlayer={colorPlayers}
          name={playerName.find((elem) => elem.id === "3-2-1").name}
          isCaptain={playerName.find((elem) => elem.id === "3-2-1").isCaptain}
          setupCaptain={setupCaptain}
        />
      </div>
      <div className={styles.form451midMidL}>
        <Player
          figId="3-2-2"
          colorPlayer={colorPlayers}
          name={playerName.find((elem) => elem.id === "3-2-2").name}
          isCaptain={playerName.find((elem) => elem.id === "3-2-2").isCaptain}
          setupCaptain={setupCaptain}
        />
      </div>
      <div className={styles.form451midCenter}>
        <Player
          figId="3-2-3"
          colorPlayer={colorPlayers}
          name={playerName.find((elem) => elem.id === "3-2-3").name}
          isCaptain={playerName.find((elem) => elem.id === "3-2-3").isCaptain}
          setupCaptain={setupCaptain}
        />
      </div>
      <div className={styles.form451midMidR}>
        <Player
          figId="3-2-4"
          colorPlayer={colorPlayers}
          name={playerName.find((elem) => elem.id === "3-2-4").name}
          isCaptain={playerName.find((elem) => elem.id === "3-2-4").isCaptain}
          setupCaptain={setupCaptain}
        />
      </div>
      <div className={styles.form451midRight}>
        <Player
          figId="3-2-5"
          colorPlayer={colorPlayers}
          name={playerName.find((elem) => elem.id === "3-2-5").name}
          isCaptain={playerName.find((elem) => elem.id === "3-2-5").isCaptain}
          setupCaptain={setupCaptain}
        />
      </div>
      {/*third line*/}
      <div className={styles.form451botLeft}>
        <Player
          figId="3-3-1"
          colorPlayer={colorPlayers}
          name={playerName.find((elem) => elem.id === "3-3-1").name}
          isCaptain={playerName.find((elem) => elem.id === "3-3-1").isCaptain}
          setupCaptain={setupCaptain}
        />
      </div>
      <div className={styles.form451botMidL}>
        <Player
          figId="3-3-2"
          colorPlayer={colorPlayers}
          name={playerName.find((elem) => elem.id === "3-3-2").name}
          isCaptain={playerName.find((elem) => elem.id === "3-3-2").isCaptain}
          setupCaptain={setupCaptain}
        />
      </div>
      <div className={styles.form451botMidR}>
        <Player
          figId="3-3-3"
          colorPlayer={colorPlayers}
          name={playerName.find((elem) => elem.id === "3-3-3").name}
          isCaptain={playerName.find((elem) => elem.id === "3-3-3").isCaptain}
          setupCaptain={setupCaptain}
        />
      </div>
      <div className={styles.form451botRight}>
        <Player
          figId="3-3-4"
          colorPlayer={colorPlayers}
          name={playerName.find((elem) => elem.id === "3-3-4").name}
          isCaptain={playerName.find((elem) => elem.id === "3-3-4").isCaptain}
          setupCaptain={setupCaptain}
        />
      </div>
      <div className={styles.form451goalkeep}>
        <Player
          figId="3-4-1"
          colorPlayer={colorGoalk}
          name={playerName.find((elem) => elem.id === "3-4-1").name}
          isCaptain={playerName.find((elem) => elem.id === "3-4-1").isCaptain}
          setupCaptain={setupCaptain}
        />
      </div>
    </div>
  );
};
export default Form451;
