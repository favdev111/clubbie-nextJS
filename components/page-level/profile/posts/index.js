import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./profile-posts.module.css";
import OvalButton from "@sub/button-oval";
import PostCard from "./card";
import InfiniteScroll from "@sub/infinite-scroll";
import Users from "@api/services/Users";
import Loader from "@sub/loader";

function LoadingPosts() {
  return (
    <div className={styles.loadingPosts}>
      <Loader size="large" padded={true} />
    </div>
  );
}

function ProfilePosts({ userId, posts }) {
  const [_posts, setPosts] = useState(posts);
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

  const postsFilter = {
    limit: 5,
    sortBy: "createdAt:desc",
  };

  const getMoreUploadedPosts = async () => {
    const resUploadedPosts = await Users.GetUploadedPosts(userId, {
      ...postsFilter,
      page: _posts?.uploaded?.page + 1,
    }).catch(() => false); // avoid page error for now
    const userUploadedPosts = resUploadedPosts?.data;

    if (!userUploadedPosts) {
      console.log("error fetching more uploaded posts");
      return;
    }

    const updatedUploadedPosts = {
      ...userUploadedPosts,
      results: [..._posts?.uploaded?.results, ...userUploadedPosts?.results],
    };

    const updatedPosts = {
      ..._posts,
      uploaded: updatedUploadedPosts,
    };

    setPosts({ ...updatedPosts });
  };

  // Todo: fix this and add when api updates
  const getMoreLikedPosts = async () => {
    const resLikedPosts = await Users.GetLikedPosts(userId, {
      ...postsFilter,
      page: _posts?.liked?.page + 1,
    }).catch(() => false); // avoid page error for now
    const userLikedPosts = resLikedPosts?.data;

    if (!userLikedPosts) {
      console.log("error fetching more liked posts");
      return;
    }

    const updatedLikedPosts = {
      ...userLikedPosts,
      results: [..._posts?.liked?.results, ...userLikedPosts?.results],
    };

    const updatedPosts = {
      ..._posts,
      liked: updatedLikedPosts,
    };

    setPosts({ ...updatedPosts });
  };

  const getMoreRepostedPosts = async () => {
    const resRepostedPosts = await Users.GetRepostedPosts(userId, {
      ...postsFilter,
      page: _posts?.reposted?.page + 1,
    }).catch(() => false); // avoid page error for now
    const userRepostedPosts = resRepostedPosts?.data;

    if (!userRepostedPosts) {
      console.log("error fetching more reposted posts");
      return;
    }

    const updatedRepostedPosts = {
      ...userRepostedPosts,
      results: [..._posts?.reposted?.results, ...userRepostedPosts?.results],
    };

    const updatedPosts = {
      ..._posts,
      reposted: updatedRepostedPosts,
    };

    setPosts({ ...updatedPosts });
  };

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
      {Object.keys(_posts).map((key, index) => (
        <span
          key={index}
          className={cn(styles.hide, index === activeTab && styles.show)}
        >
          {_posts[key]?.results?.length ? (
            <InfiniteScroll
              dataLength={_posts[key]?.results?.length}
              getMore={
                (activeTab === 0 && getMoreUploadedPosts) ||
                // (activeTab === 1 && getMoreLikedPosts) || // add this line here for liked posts when api updates
                (activeTab === 2 && getMoreRepostedPosts)
              }
              hasMore={_posts[key]?.page < _posts[key]?.totalPages}
              loading={<LoadingPosts />}
            >
              <div className={styles.profilePhotos}>
                {_posts[key]?.results?.map((post, index) => (
                  <PostCard key={index} post={post.content || post} /> // liked videos has post.content nested obj similar to post
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <div className={styles.noPosts}>No Posts</div>
          )}
        </span>
      ))}
    </>
  );
}

export default ProfilePosts;
