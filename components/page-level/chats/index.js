import React from "react";
import ChatCard from "./card"
import Message from "./message"
import styles from "./chat.module.css";
import TypeMessage from "./type"

function Chats() {
  const chatList = [
    {
      id: "1",
      name: "Mohsin",
      messege:
        "Mohsin Here,",
      image: "/assets/avatar.png"
    },
    {
      id: "2",
      name: "Daniyal",
      messege:
        "See You Soon",
      image: "/assets/photo4.png"
    },
    {
      id: "3",
      name: "Haider",
      messege:
        "Tomorrow is the final of Copa America",
      image: "/assets/profile-avatar.png"
    },
    {
      id: "4",
      name: "Shah",
      messege:
        "See You Soon",
      image: "/assets/photo4.png"
    }
  ];
  return (
    <div className={styles.teamhub}>
      <div className={styles.eventCard}>
        <h1>Chats<button className={styles.edtBtn}>Edit</button></h1>
        <ChatCard data={chatList}></ChatCard>
      </div>
      <div className={styles.eventCard}>
        <div className={styles.marginLeft}>
          <Message data={chatList}></Message>
        </div>
        <div className={styles.inputMessage}>
          <TypeMessage></TypeMessage>
        </div>
      </div>
    </div>
  );
}

export default Chats;
