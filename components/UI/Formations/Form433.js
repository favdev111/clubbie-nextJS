import React from "react";
import Player from "../Player";
import styles from "./form433.module.css";

const Form433 = ({colorPlayers, colorGoalk, playerName, setupCaptain}) => {

    return(
        <div>
            {/*first line*/}
            <div className={styles.form433upLeft}>
                <Player
                    figId='2-1-1'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '2-1-1').name}
                    isCaptain={playerName.find(elem => elem.id === '2-1-1').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form433upCenter}>
                <Player
                    figId='2-1-2'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '2-1-2').name}
                    isCaptain={playerName.find(elem => elem.id === '2-1-2').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form433upRight}>
                <Player
                    figId='2-1-3'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '2-1-3').name}
                    isCaptain={playerName.find(elem => elem.id === '2-1-3').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            {/*second line*/}
            <div className={styles.form433midLeft}>
                <Player
                    figId='2-2-1'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '2-2-1').name}
                    isCaptain={playerName.find(elem => elem.id === '2-1-1').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form433midCenter}>
                <Player
                    figId='2-2-2'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '2-2-2').name}
                    isCaptain={playerName.find(elem => elem.id === '2-2-2').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form433midRight}>
                <Player
                    figId='2-2-3'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '2-2-3').name}
                    isCaptain={playerName.find(elem => elem.id === '2-2-3').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            {/*third line*/}
            <div className={styles.form433botLeft}>
                <Player
                    figId='2-3-1'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '2-3-1').name}
                    isCaptain={playerName.find(elem => elem.id === '2-3-1').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form433botMidL}>
                <Player
                    figId='2-3-2'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '2-3-2').name}
                    isCaptain={playerName.find(elem => elem.id === '2-3-2').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form433botMidR}>
                <Player
                    figId='2-3-3'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '2-3-3').name}
                    isCaptain={playerName.find(elem => elem.id === '2-3-3').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form433botRight}>
                <Player
                    figId='2-3-4'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '2-3-4').name}
                    isCaptain={playerName.find(elem => elem.id === '2-3-4').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form433goalkeep}>
                <Player
                    figId='2-4-1'
                    colorPlayer={colorGoalk}
                    name={playerName.find(elem => elem.id === '2-4-1').name}
                    isCaptain={playerName.find(elem => elem.id === '2-4-1').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
        </div>
    )
}
export default Form433;
