import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import CommonSearch from "@sub/search";
import ConfirmDialog from "@sub/confirm-dialog";
import useNotification from "@sub/hook-notification";
import BackDropLoader from "@sub/backdrop-loader";
import HomeVideosCard from "./card";
import Tag from "./tag";
import PlusTurk from "@svg/plus-turk";
import { useRouter } from "next/router";
import Loader from "@sub/loader";
import InfiniteScroll from "@sub/infinite-scroll";
import Posts from "@api/services/Posts";
import sports from "@utils/fixedValues/sports";

function PostFilters({ setFilter, fetchPosts, setLoading }) {
  const [sportList] = useState([
    ...new Set([
      "All Sports",
      "Football",
      "Cricket",
      "Netball",
      "Boxing",
      ...sports,
    ]),
  ]);
  const [sportListExpanded, setSportListExpanded] = useState(false);
  const [sportSelectedIndex, setSportSelectedIndex] = useState(0);
  const [applyFilter, setApplyFilter] = useState(false);

  const handleSportTagClick = (index) => {
    setSportSelectedIndex(index);
    setFilter((filter) => {
      const _filter = { ...filter, search: sportList[index] };
      if (sportList[index] === "All Sports") delete _filter["search"];
      return _filter;
    });
    setApplyFilter(true);
  };

  useEffect(async () => {
    if (applyFilter) {
      setLoading(true);
      await fetchPosts(1, true);
      setApplyFilter(false);
      setLoading(false);
    }
  }, [applyFilter]);

  return (
    <>
      <div className={styles.mobileSort}>
        <span> Recent </span>
        <span> Following </span>
        <span> Ranking </span>
      </div>
      <div className={styles.tagContent}>
        <div className={styles.tagInner}>
          {(sportListExpanded ? sportList : sportList.slice(0, 5)).map(
            (tag, index) => (
              <Tag
                activeTag={sportSelectedIndex}
                onClick={() => handleSportTagClick(index)}
                index={index}
                key={tag + index}
              >
                {tag}
              </Tag>
            )
          )}
          <Tag
            sportSelectedIndex={false}
            endingTag
            onClick={() => setSportListExpanded(!sportListExpanded)}
          >
            {!sportListExpanded ? "More..." : "...Less"}
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
    </>
  );
}

function AddContent() {
  return (
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
  );
}

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
  const [filter, setFilter] = useState({
    sortBy: "createdAt:desc",
  });
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showNotificationMsg } = useNotification();

  const fetchPosts = async (page = _posts.page + 1, resetPosts = false) => {
    const response = await Posts.GetPosts({
      limit: 10,
      page: page,
      ...filter,
    }).catch(() => undefined);
    const newPosts = response?.data;

    if (!newPosts) {
      showNotificationMsg("Error fetching new posts", {
        variant: "error",
        displayIcon: true,
      });
      return;
    }

    // dump existing data on new filter
    if (resetPosts) {
      setPosts({ ...newPosts });
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
      {loading && <BackDropLoader />}
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
      <PostFilters
        setFilter={setFilter}
        setLoading={setLoading}
        fetchPosts={fetchPosts}
      />
      <AddContent />
      <InfiniteScroll
        dataLength={_posts?.totalResults}
        getMore={fetchPosts}
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
              user={user}
              setShowLoginPopup={setShowLoginPopup}
            />
          ))}
      </InfiniteScroll>
    </div>
  );
}

export default Home;
