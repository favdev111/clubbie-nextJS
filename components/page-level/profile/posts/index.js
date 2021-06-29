import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./profile-posts.module.css";
import OvalButton from "@sub/button-oval";
import PostCard from "./card";

function ProfilePosts({ posts }) {
  const [activeTab, setActiveTab] = useState(0); // uploaded posts selected by default

  const postsButtons = [
    {
      name: "Uploaded",
      apperance: "uploaded",
    },
    {
      name: "Liked",
      apperance: "liked",
    },
    {
      name: "Reposts",
      apperance: "reposts",
    },
  ];

  return (
    <>
      <div className={styles.profileButtons}>
        {postsButtons.map((button, index) => (
          <OvalButton
            key={index}
            status={activeTab === index}
            appearence={button.apperance}
            onClick={() => setActiveTab(index)}
          >
            {button.name}
          </OvalButton>
        ))}
      </div>
      {Object.keys(posts).map((key, index) => (
        <span
          key={index}
          className={cn(styles.hide, index === activeTab && styles.show)}
        >
          {posts[key]?.length ? (
            <div className={styles.profilePhotos}>
              {posts[key].map((post, index) => (
                <PostCard key={index} post={post.content || post} /> // liked videos has post.content nested obj similar to post
              ))}
            </div>
          ) : (
            <div className={styles.noPosts}>No Posts</div>
          )}
        </span>
      ))}
    </>
  );
}

export default ProfilePosts;
