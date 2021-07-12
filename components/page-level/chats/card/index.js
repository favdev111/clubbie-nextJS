import React from "react";
import styles from "./chatcard.module.css";


function ChatCard({ data }) {
    const onItemClick = (id) => {
        var dataList = data.filter(s => s.id.includes(id));
        console.log(dataList[0].name)
    }

    return (
        <div className={styles.scroll}>
            <div className={styles.scrollMargin}>
                {data.map((list) => {
                    return (
                        <div>
                            <button className={styles.dateSort} key={list.id} onClick={onItemClick.bind(this, list.id)}>
                                <img src={list.image} className={styles.cardImg} />
                                <div className={styles.cardDetail}>
                                    <p className={styles.cardSpan}>{list.name}<span className={styles.time}>4:30</span></p>
                                    <div>{list.messege}</div><div><span className={styles.count}>1</span></div>
                                </div>
                            </button>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default ChatCard