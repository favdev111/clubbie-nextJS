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

// Todo: make a svg and replace this
function CloseSVG() {
  return (
    <span
      style={{
        color: "#ffffff",
        background: "#c41d24",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        height: 35,
        width: 35,
      }}
    >
      x
    </span>
  );
}

function PostSearch({ filter, setFilter, fetchPosts, setLoading }) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [applySearch, setApplySearch] = useState("");

  const handleSearchTextChange = (e) => {
    if (e.target.value?.length === 0 && filter?.search) {
      clearSearch();
      return;
    }
    setSearchText(e?.target?.value);
  };

  const makeSearch = () => {
    if (searchText?.trim().length > 3) {
      setFilter((filter) => {
        return { ...filter, search: searchText };
      });
      setApplySearch(true);
    }
  };

  const clearSearch = () => {
    setSearchText("");
    setFilter((filter) => {
      const _filter = { ...filter };
      delete _filter["search"];
      return _filter;
    });
    setApplySearch(true);
  };

  useEffect(async () => {
    if (applySearch) {
      setLoading(true);
      await fetchPosts(1, true);
      setApplySearch(false);
      setLoading(false);
    }
  }, [applySearch]);

  useEffect(() => {
    const tagSearch = router.query.tagSearch;
    if (tagSearch) {
      setSearchText(tagSearch);
      setFilter((filter) => {
        return { ...filter, search: tagSearch };
      });
      setApplySearch(true);
    }
  }, []);

  return (
    <div className={styles.search}>
      <CommonSearch
        value={searchText}
        onChange={handleSearchTextChange}
        onEnter={makeSearch}
        onSearchButtonClick={makeSearch}
      />
      {filter?.search && searchText === filter?.search && (
        <div className={styles.appliedSearch}>
          Showing results for{" "}
          <span className={styles.appliedSearchText}>"{searchText}"</span>
          <span className={styles.clearAppliedSearch} onClick={clearSearch}>
            <CloseSVG />
          </span>
        </div>
      )}
    </div>
  );
}

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

  const handleSportFilterDropDownChange = (e) => {
    e.preventDefault();
    const value = e?.target?.value;
    if (value === "recent") {
      setFilter((filter) => {
        const _filter = { ...filter, sortBy: "createdAt:desc" };
        delete _filter["isFeatured"];
        return _filter;
      });
    }
    if (value === "featured") {
      setFilter((filter) => {
        const _filter = { ...filter, isFeatured: true };
        delete _filter["sortBy"];
        return _filter;
      });
    }
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

        <div
          className={styles.sortSelect}
          onChange={handleSportFilterDropDownChange}
        >
          <select name="sort" id="sort">
            <option value="recent">Recent</option>
            <option value="featured">Featured</option>
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
      <PostSearch
        filter={filter}
        setFilter={setFilter}
        setLoading={setLoading}
        fetchPosts={fetchPosts}
      />
      <h1 className={styles.title}> Videos</h1>
      <PostFilters
        setFilter={setFilter}
        setLoading={setLoading}
        fetchPosts={fetchPosts}
      />
      <AddContent />
      {_posts?.results?.length === 0 && (
        <div className={styles.noPosts}>No posts for the applied filter</div>
      )}
      <InfiniteScroll
        dataLength={_posts?.totalResults}
        getMore={fetchPosts}
        hasMore={_posts?.page < _posts?.totalPages}
        loader={<LoadingPosts />}
        endingMessage={
          _posts?.results?.length > 10 ? <EndFeedMessage /> : <></>
        }
      >
        {_posts?.results &&
          _posts?.results.map((post, index) => (
            <HomeVideosCard
              key={post?.id}
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
