import React, { useState, useEffect } from "react";
import styles from "./profile-posts.module.css";
import OvalButton from "@sub/button-oval";
import PostCard from "./card";

function ProfilePosts({ posts }) {
  const [displayPosts, setDisplayPosts] = useState();
  const postsButtons = [
    {
      name: "Uploaded",
      apperance: "uploaded",
      postsData: posts?.uploaded || [],
    },
    {
      name: "Liked",
      apperance: "liked",
      postsData: posts?.liked || [],
    },
    {
      name: "Reposts",
      apperance: "reposts",
      postsData: posts?.reposted || [],
    },
  ];

  useEffect(() => {
    setDisplayPosts(posts?.uploaded); // uploaded videos selected as default
  }, [posts]);

  return (
    <>
      <div className={styles.profileButtons}>
        {postsButtons.map((button) => (
          <OvalButton
            status={displayPosts === button.postsData}
            appearence={button.apperance}
            onClick={() => setDisplayPosts(button.postsData)}
          >
            {button.name}
          </OvalButton>
        ))}
      </div>

      {displayPosts?.length ? (
        <div className={styles.profilePhotos}>
          {displayPosts.map((post) => (
            <PostCard post={post.content || post} /> // liked videos has post.content nested obj similar to post
          ))}
        </div>
      ) : (
        <div className={styles.noPosts}>No Posts</div>
      )}
    </>
  );
}

export default ProfilePosts;
