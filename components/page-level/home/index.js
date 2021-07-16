import React, { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import CommonSearch from "@sub/search";
import ConfirmDialog from "@sub/confirm-dialog";
import HomeVideosCard from "./card";
import Tag from "./tag";
import PlusTurk from "@svg/plus-turk";
import { useRouter } from "next/router";
import Loader from "@sub/loader";
import InfiniteScroll from "@sub/infinite-scroll";
import Posts from "@api/services/Posts";
import sports from "@utils/fixedValues/sports";

function LoadingPosts() {
  return (
    <div className={styles.loadingPosts}>
      <Loader size="large" padded={true} />
    </div>
  );
}

function EndFeedMessage() {
  return (
    <Link href="/content">
      <a>
        <div className={styles.addContent}>
          <p className={styles.endFeedMessage}>
            You are all caught up with the video feed. Care to make a post of
            your own?
          </p>
          <div className={styles.addButton}>
            <a>
              <PlusTurk />
            </a>
            Add Content
          </div>
        </div>
      </a>
    </Link>
  );
}

function Home({ posts, user }) {
  const router = useRouter();
  const createdPost = router?.query?.createdPost; // highlight a post if it was created

  const [_posts, setPosts] = useState(posts);
  const [expandedSports, setExpandedSports] = useState(false);
  const [displaySports, setDisplaySports] = useState([
    ...new Set([
      "All Sports",
      "Football",
      "Cricket",
      "Netball",
      "Boxing",
      ...sports,
    ]),
  ]);
  const [activeTag, setActiveTag] = useState(0);
  const [filter, setFilter] = useState({
    sortBy: "createdAt:desc",
  });
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const fetchMorePosts = async () => {
    const response = await Posts.GetPosts({
      limit: 10,
      page: _posts.page + 1,
      ...filter,
    }).catch(() => undefined);
    const newPosts = response?.data;

    if (!newPosts) {
      console.log("Error fetching new posts"); // console for now
      return;
    }

    const updatedPostState = {
      ...newPosts,
      results: [..._posts.results, ...newPosts.results],
    };

    setPosts({ ...updatedPostState });
  };

  return (
    <div className={styles.homePage}>
      <ConfirmDialog
        open={showLoginPopup}
        setOpen={setShowLoginPopup}
        message="You need to login to perform this action"
        confirmText="Login"
        onConfirm={() => router.push("/auth/login")}
        type="info"
      ></ConfirmDialog>
      <div className={styles.search}>
        <CommonSearch />
      </div>
      <h1 className={styles.title}> Videos</h1>
      <div className={styles.mobileSort}>
        <span> Recent </span>
        <span> Following </span>
        <span> Ranking </span>
      </div>
      <div className={styles.tagContent}>
        <div className={styles.tagInner}>
          {(expandedSports ? displaySports : displaySports.slice(0, 5)).map(
            (tag, index) => (
              <Tag
                activeTag={activeTag}
                onClick={() => setActiveTag(index)}
                index={index}
                key={tag + index}
              >
                {tag}
              </Tag>
            )
          )}
          <Tag
            activeTag={false}
            endingTag
            onClick={() => setExpandedSports(!expandedSports)}
          >
            {!expandedSports ? "More..." : "...Less"}
          </Tag>
        </div>

        <div className={styles.sortSelect}>
          <select name="sort" id="sort">
            <option value="recent">Recent</option>
            <option value="popular">Following</option>
            <option value="Ranking">Ranking</option>
          </select>
        </div>
      </div>

      <span>
        <Link href="/content">
          <a>
            <div className={styles.addContent}>
              <div className={styles.addButton}>
                <a>
                  <PlusTurk />
                </a>
                Add Content
              </div>
            </div>
          </a>
        </Link>
      </span>

      <InfiniteScroll
        dataLength={_posts?.totalResults}
        getMore={fetchMorePosts}
        hasMore={_posts?.page < _posts?.totalPages}
        loader={<LoadingPosts />}
        endingMessage={<EndFeedMessage />}
      >
        {_posts?.results &&
          _posts?.results.map((post, index) => (
            <HomeVideosCard
              key={post + index}
              data={post}
              createdPost={createdPost}
              isLoggedIn={!!user}
              setShowLoginPopup={setShowLoginPopup}
            />
          ))}
      </InfiniteScroll>
    </div>
  );
}

export default Home;
