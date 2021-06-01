import React from "react";
import styles from "./index.module.css";
import SocialButton from "@sub/social-button";

function HomeVideosCard({ data }) {
  const { desc, url, avatar } = data;
  return (
    <div className={styles.videoCard}>
      <img className={styles.preview} src={url} />

      <div className={styles.cardInfo}>
        <div className={styles.cardInfoHeader}>
          <div className={styles.cardInfoProfile}>
            <p> Hernes</p>
            <p> .. ago</p>
            <img src={avatar} />
          </div>
          <SocialButton type="upload" />
        </div>

        <p> {desc}</p>
        <p> 255 views</p>
        {/* buttons */}
        <SocialButton type="fav"> </SocialButton>
        <SocialButton type="repost"> </SocialButton>
        <SocialButton type="send" />
        <SocialButton type="comment"> </SocialButton>
      </div>
    </div>
  );
}

export default HomeVideosCard;
