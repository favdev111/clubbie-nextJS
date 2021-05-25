import HomeKit from "./HomeKit";
import AwayKit from "./AwayKit";
import React from "react";
import {useSelector} from "react-redux";
import styles from "./kitBlock.module.css"


const KitBlock = ({
                      activeHomeKit, activeAwayKit, openModalPlHandler, openModalGkHandler, homeKitHandler,
                      awayKitHandler
}) => {

    const colHomePl = useSelector(state => state.pitch.colorHomePlayers);
    const colHomeGk = useSelector(state => state.pitch.colorHomeGoalkeeper);
    const colAwayPl = useSelector(state => state.pitch.colorAwayPlayers);
    const colAwayGk = useSelector(state => state.pitch.colorAwayGoalkeeper)

    return(
        <div className={styles.kitBlock}>
            <HomeKit
                state={activeHomeKit}
                colorPlayers={colHomePl.colorHomePlayers}
                colorGoalkeeper={colHomeGk.colorHomeGoalkeeper}
                openModalPlHandler={openModalPlHandler}
                openModalGkHandler={openModalGkHandler}
                homeKitHandler={homeKitHandler}
            />
            <AwayKit
                state={activeAwayKit}
                colorPlayers={colAwayPl.colorAwayPlayers}
                colorGoalkeeper={colAwayGk.colorAwayGoalkeeper}
                openModalPlHandler={openModalPlHandler}
                openModalGkHandler={openModalGkHandler}
                awayKitHandler={awayKitHandler}
            />
        </div>
    )
}
export default KitBlock;
