import React from "react";
import Player from "../Player";
import styles from "./form442.module.css"

const Form442 = ({colorPlayers, colorGoalk, playerName, setupCaptain}) => {

    return(
        <div>
            {/*first line*/}
            <div className={styles.form442upLeft}>
                <Player
                    figId='1-1-1'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '1-1-1').name}
                    isCaptain={playerName.find(elem => elem.id === '1-1-1').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form442upRight}>
                <Player
                    figId='1-1-2'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '1-1-2').name}
                    isCaptain={playerName.find(elem => elem.id === '1-1-2').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            {/*second line*/}
            <div className={styles.form442midLeft}>
                <Player
                    figId='1-2-1'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '1-2-1').name}
                    isCaptain={playerName.find(elem => elem.id === '1-2-1').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form442midMidL}>
                <Player
                    figId='1-2-2'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '1-2-2').name}
                    isCaptain={playerName.find(elem => elem.id === '1-2-2').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form442midMidR}>
                <Player
                    figId='1-2-3'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '1-2-3').name}
                    isCaptain={playerName.find(elem => elem.id === '1-2-3').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form442midRight}>
                <Player
                    figId='1-2-4'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '1-2-4').name}
                    isCaptain={playerName.find(elem => elem.id === '1-2-4').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            {/*third line*/}
            <div className={styles.form442botLeft}>
                <Player
                    figId='1-3-1'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '1-3-1').name}
                    isCaptain={playerName.find(elem => elem.id === '1-3-1').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form442botMidL}>
                <Player
                    figId='1-3-2'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '1-3-2').name}
                    isCaptain={playerName.find(elem => elem.id === '1-3-2').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form442botMidR}>
                <Player
                    figId='1-3-3'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '1-3-3').name}
                    isCaptain={playerName.find(elem => elem.id === '1-3-3').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form442botRight}>
                <Player
                    figId='1-3-4'
                    colorPlayer={colorPlayers}
                    name={playerName.find(elem => elem.id === '1-3-4').name}
                    isCaptain={playerName.find(elem => elem.id === '1-3-4').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
            <div className={styles.form442goalkeep}>
                <Player
                    figId='1-4-1'
                    colorPlayer={colorGoalk}
                    name={playerName.find(elem => elem.id === '1-4-1').name}
                    isCaptain={playerName.find(elem => elem.id === '1-4-1').isCaptain}
                    setupCaptain={setupCaptain}
                />
            </div>
        </div>
    )
}
export default Form442;
