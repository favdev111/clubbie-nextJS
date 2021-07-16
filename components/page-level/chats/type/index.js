import React from "react"
import styles from "./type.module.css";

function Type() {
    return (
        <div className={styles.inputDiv}>
            <span className={styles.addBtn}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path className={styles.plus} d="M15.333,70.667h-6v-6A.666.666,0,0,0,8.667,64H7.333a.666.666,0,0,0-.667.667v6h-6A.666.666,0,0,0,0,71.333v1.333a.666.666,0,0,0,.667.667h6v6A.666.666,0,0,0,7.333,80H8.667a.666.666,0,0,0,.667-.667v-6h6A.666.666,0,0,0,16,72.667V71.333A.666.666,0,0,0,15.333,70.667Z" transform="translate(0 -64)" />
                </svg>
            </span>
            <input className={styles.input}></input>
            <span className={styles.sendBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23">
                    <path className={styles.m} d="M8.75,17.612V22.25a.75.75,0,0,0,1.354.444L12.817,19Z" transform="translate(0 0)" />
                    <path className={styles.m} d="M23.685.139A.75.75,0,0,0,22.9.085L.4,11.835a.75.75,0,0,0,.1,1.375l6.255,2.138L20.083,3.958,9.775,16.377,20.258,19.96A.767.767,0,0,0,20.5,20a.749.749,0,0,0,.742-.639l2.75-18.5a.751.751,0,0,0-.307-.722Z" transform="translate(0 0)" />
                </svg>
            </span>
        </div>
    )
}

export default Type