import React from "react";
import styles from "./pitchAway.module.css"
import Form442 from "../UI/Formations/Form442";
import Form433 from "../UI/Formations/Form433";
import Form451 from "../UI/Formations/Form451";
import {useDispatch, useSelector} from "react-redux";
import {
    setCaptainAway433,
    setCaptainAway442,
    setCaptainAway451,
} from "../../redux/actions/pitchActions";

const Pitch = ({lineUp, addNameHandler}) => {
    const dispatch = useDispatch();
    let playerName;
    const available_players = useSelector(state => state.pitch.availPlayers);
    const unavailable_players = useSelector(state => state.pitch.unavailPlayers);

    const colorPl = useSelector(state => state.pitch.colorAwayPlayers);
    const colorGK = useSelector(state => state.pitch.colorAwayGoalkeeper);
    const colorPlayers = colorPl.colorAwayPlayers;
    const colorGoalk = colorGK.colorAwayGoalkeeper;
    if(lineUp === '4-4-2') {
        playerName = useSelector(state => state.pitch.playerInfoAway442);
    } else if(lineUp === '4-3-3') {
        playerName = useSelector(state => state.pitch.playerInfoAway433);
    } else if(lineUp === '4-5-1') {
        playerName = useSelector(state => state.pitch.playerInfoAway451);
    } else {
        playerName = useSelector(state => state.pitch.playerInfoAway442);
    }

    const setupCaptain = (figId) => {
        if(lineUp === '4-4-2') {
            dispatch(setCaptainAway442({figId}));
        } else if(lineUp === '4-3-3') {
            dispatch(setCaptainAway433({figId}));
        } else if(lineUp === '4-5-1') {
            dispatch(setCaptainAway451({figId}));
        } else {
            dispatch(setCaptainAway442({figId}));
        }
    }

    return(
        <div>
            <div className={styles.availPlayers}>
                <div className={styles.availPlayersHeader}>
                    <span className={styles.availPlayersHeaderText}>Available Players</span>
                    <span className={styles.availPlayersHeaderText}>Last Played</span>
                </div>
                <div className={styles.availPlayersList}>
                    <ul>
                        {
                            available_players.map((item, idx) => {
                                const selectNameHandler = () => {
                                    addNameHandler(item.id)
                                }
                                return(
                                    <li onClick={selectNameHandler} key={idx} className={styles.availPlayersListItem}>
                                        <span className={styles.availPlayersListName}>{item.player}</span>
                                        <span className={styles.availPlayersListPos}>{item.position} {item.date}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className={styles.pitchImg}>
                <img className={styles.pitchImgField} src="/assets/field.png" alt="pitch"/>
                {lineUp === '4-4-2' && <Form442
                    colorPlayers={colorPlayers}
                    colorGoalk={colorGoalk}
                    playerName={playerName}
                    setupCaptain={setupCaptain}
                />}
                {lineUp === '4-3-3' && <Form433
                    colorPlayers={colorPlayers}
                    colorGoalk={colorGoalk}
                    playerName={playerName}
                    setupCaptain={setupCaptain}
                />}
                {lineUp === '4-5-1' && <Form451
                    colorPlayers={colorPlayers}
                    colorGoalk={colorGoalk}
                    playerName={playerName}
                    setupCaptain={setupCaptain}
                />}
                {lineUp === 'No formation' && <Form442
                    colorPlayers={colorPlayers}
                    colorGoalk={colorGoalk}
                    playerName={playerName}
                    setupCaptain={setupCaptain}
                />}
            </div>

            <div className={styles.unavailPlayers}>
                <div className={styles.unavailPlayersHeader}>
                    <span className={styles.unavailPlayersHeaderText}>Unavailable Players</span>
                </div>
                <div className={styles.unavailPlayersList}>
                    <ul>
                        {
                            unavailable_players.map((item, idx) => (
                                    <li key={idx} className={styles.unavailPlayersListName}>{item.player}</li>
                                )
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Pitch;
