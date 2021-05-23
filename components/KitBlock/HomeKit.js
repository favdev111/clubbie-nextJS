import React from 'react';
import styles from "./homeKit.module.css"

const HomeKit = ({state, colorPlayers, colorGoalkeeper, openModalPlHandler, openModalGkHandler, homeKitHandler}) => {

    return(
        <div onClick={homeKitHandler} className={`${styles.homeKit} ${state ? styles.activeKit: ''}`} >
            <h2 className={styles.homeKitTitle}>Home Kit</h2>
            <div className={styles.homeKitItem}>
                <div className={styles.homeKitItemHome}>
                    <span className={styles.homeKitItemText}>Home</span>
                    <div onDoubleClick={openModalPlHandler} style={{background: `${colorPlayers}`}} className={styles.homeKitItemHColor}></div>
                </div>
                <div className={styles.homeKitItemGoalkeeper}>
                    <span className={styles.homeKitItemText}>Home Goalkeeper</span>
                    <div onDoubleClick={openModalGkHandler} style={{background: `${colorGoalkeeper}`}} className={styles.homeKitItemGKColor}></div>
                </div>
            </div>
        </div>
    )
}
export default HomeKit;
