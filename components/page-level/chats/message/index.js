import React from "react";
import styles from "./message.module.css";

function Message({ data }) {
    return (
        <div>
            <div className={styles.titleMenu}>
                <img src={data[0].image} className={styles.cardImg} />
                <h2 className={styles.padBottom}>
                    {data[0].name}
                    <span className={styles.iBtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24.057" height="24.057" viewBox="0 0 24.057 24.057">
                            <path className={styles.i} d="M12.028,0A12.028,12.028,0,1,0,24.057,12.028,12.028,12.028,0,0,0,12.028,0Zm2,19.735a.822.822,0,0,1-.822.822H10.957a.822.822,0,0,1-.822-.822V10.589a.822.822,0,0,1,.822-.822h2.254a.822.822,0,0,1,.822.822Zm-2-11.524a2.04,2.04,0,1,1,2.04-2.04A2.04,2.04,0,0,1,12.028,8.211Z" /></svg>
                    </span>
                </h2>
            </div>
            <div className={styles.scroll}>
                <div className={styles.flexCol}>
                    <div>
                        <div className={styles.messageSend}>
                            <p>This is Sending Message</p>
                            <div className={styles.messageTime}>4:30</div>
                        </div>
                    </div>
                    <div className={styles.contentCenter}>
                        <p className={styles.time}>12:30</p>
                    </div>
                    <div>
                        <div className={styles.messageRec}>
                            <p>This is Recieved Message</p>
                            <div className={styles.messageTime}>4:30</div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.messageSend}>
                            <p>This is Sending Message</p>
                            <div className={styles.messageTime}>4:30</div>
                        </div>
                    </div>
                    <div className={styles.contentCenter}>
                        <p className={styles.time}>12:30</p>
                    </div>
                    <div>
                        <div className={styles.messageRec}>
                            <p>This is Recieved Message</p>
                            <div className={styles.messageTime}>4:30</div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.messageSend}>
                            <p>This is Sending Message</p>
                            <div className={styles.messageTime}>4:30</div>
                        </div>
                    </div>
                    <div className={styles.contentCenter}>
                        <p className={styles.time}>12:30</p>
                    </div>
                    <div>
                        <div className={styles.messageRec}>
                            <p>This is Recieved Message</p>
                            <div className={styles.messageTime}>4:30</div>
                        </div>
                    </div>
                </div>

            </div >
        </div >
    )
}

export default Message;
