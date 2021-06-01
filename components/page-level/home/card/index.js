import React from "react";
import styles from "./index.module.css";
import SocialButton from "@sub/social-button";

function HomeVideosCard({ data }) {
  const { desc, url, avatar, team, date } = data;
  return (
    <div className={styles.videoCard}>
      <img className={styles.preview} src={url} />

      <div className={styles.cardInfo}>
        <div className={styles.cardInfoHeader}>
          <div className={styles.cardInfoProfile}>
            <img src={avatar} />
            <div className={styles.avatarInfo}>
              <p className="text-18"> {team}</p>
              <p className="opacity-50"> {date}</p>
            </div>
          </div>
          <SocialButton type="upload" />
        </div>

        <p className={styles.desc}> {desc}</p>
        <p className="opacity-50"> 255 views</p>
        {/* buttons */}
        <div className={styles.socialButtons}>
          <SocialButton type="fav">15</SocialButton>
          <SocialButton type="repost">5</SocialButton>
          <SocialButton type="send" />
          <SocialButton type="comment" />
        </div>
      </div>
    </div>
  );
}

export default HomeVideosCard;
