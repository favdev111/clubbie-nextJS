import React, { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import SocialButton from "@sub/social-button";
import BackDropLoader from "@sub/backdrop-loader";
import useNotifications from "@sub/hook-notification";
import DropDown from "@sub/dropdown";
import Posts from "@api/services/Posts";
import Teams from "@api/services/Teams";
import Interactions from "@api/services/interactions";
import cn from "classnames";
import InViewMonitor from "react-inview-monitor";
import Video from "./Video";
import ContentDialog from "@sub/content-dialog";

function TeamList({ teams, selectedTeam, setSelectedTeam }) {
  const handleItemClick = (item) => {
    setSelectedTeam(item);
  };

  return (
    <div className={styles.teamListContent}>
      <ul className="join__list">
        {teams &&
          teams.map((item, index) => (
            <li
              key={item + index}
              className={cn(
                styles.teamListItem,
                item?.id === selectedTeam?.id && styles.teamListItemSelectedTeam
              )}
              onClick={(e) => handleItemClick(item)}
            >
              <img
                src={item?.crest || "/assets/club-badge-placeholder.png"}
                className={styles.crestImage}
              />
              {item?.title}
            </li>
          ))}
      </ul>
    </div>
  );
}

function HomeVideosCard({
  createdPost,
  data,
  isLoggedIn,
  user,
  setShowLoginPopup,
}) {
  const {
    id,
    title,
    media,
    thumbnail,
    author,
    createdAt,
    contentType,
    counts,
    myInteractions,
  } = data;

  const { showNotificationMsg } = useNotifications();

  const [content] = useState(media || thumbnail);
  const [likeCount, setLikeCount] = useState(counts?.likes || 0);
  const [isLiked, setIsLiked] = useState(!!myInteractions?.liked);
  const [repostCount, setRepostCount] = useState(counts?.reposts || 0);
  const [repostProfileCount, setRepostProfileCount] = useState(
    myInteractions?.repostedInProfile || 0
  );
  const [repostTeamCount, setRepostTeamCount] = useState(
    myInteractions?.repostedInTeam || 0
  );
  const [isReposted, setIsReposted] = useState(
    !!myInteractions?.repostedInProfile
  );
  const [loading, setLoading] = useState(false);
  const [teamsList, setTeamsList] = useState([]);
  const [openContentDialog, setOpenContentDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const verifyLoggedIn = () => {
    if (isLoggedIn) return true;
    setShowLoginPopup(true);
    return false;
  };

  const handleLikeClick = async () => {
    if (!verifyLoggedIn()) return;
    if (!isLiked) {
      const response = await Interactions.LikePost(id).catch(() => null);
      if (!response) {
        showNotificationMsg("Error liking post. Try again..!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }
      setIsLiked(true);
      setLikeCount((count) => count + 1);
    } else {
      // TODO: remove interaction
      showNotificationMsg("Remove Post Like");
    }
  };

  const repostInProfile = async () => {
    if (!verifyLoggedIn()) return;
    setLoading(true);
    const response = await Posts.Repost(id, {
      repostIn: "profile",
    }).catch((e) => {
      console.log(e.response);
      return null;
    });
    if (!response) {
      showNotificationMsg("Error Reposting In Profile", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }
    showNotificationMsg("Reposted In Profile", {
      variant: "success",
      displayIcon: true,
    });
    setIsReposted(true);
    setRepostCount((count) => count + 1);
    setRepostProfileCount((count) => count + 1);
    setLoading(false);
  };

  const handleTeamRepostClick = async () => {
    if (!verifyLoggedIn()) return;
    setLoading(true);
    const ids = user?.teams?.map((x) => x?.team);
    if (!(ids?.length > 0)) {
      showNotificationMsg("You are not a member of any team", {
        variant: "error",
        displayIcon: true,
      });
      return;
    }
    const response = await Teams.GetTeamsWithDetails(ids).catch(() => null);
    if (!response) {
      showNotificationMsg("Error fetching latest team data", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    setTeamsList(response?.data);
    setOpenContentDialog(true);
  };

  const respostInTeam = async () => {
    if (!verifyLoggedIn()) return;
    setLoading(true);
    const response = await Posts.Repost(id, {
      repostIn: "team",
      teamId: selectedTeam?.id,
    }).catch((e) => {
      console.log(e.response);
      return null;
    });
    if (!response) {
      showNotificationMsg("Error Reposting In Team", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }
    showNotificationMsg(`Reposted In ${selectedTeam?.title || "Team"}`, {
      variant: "success",
      displayIcon: true,
    });
    setIsReposted(true);
    setRepostCount((count) => count + 1);
    setRepostTeamCount((count) => count + 1);
    setLoading(false);
  };

  return (
    <div
      className={cn(
        styles.videoCard,
        createdPost === id && styles.highLightPost
      )}
    >
      {loading && <BackDropLoader />}
      <ContentDialog
        open={openContentDialog}
        setOpen={setOpenContentDialog}
        title="Select a Team"
        Body={() => (
          <TeamList
            teams={teamsList}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
          />
        )}
        confirmText="Repost"
        onConfirm={respostInTeam}
        type="info"
      />
      <Link href={`/content/${id}`}>
        <span>
          {content.includes("video") ? (
            <InViewMonitor
              childPropsInView={{ isPlaying: true, sTyling: styles.preview }}
              toggleChildPropsOnInView={true}
            >
              <Video src={content} />
            </InViewMonitor>
          ) : content.includes("image") ? (
            <img className={styles.preview} src={content} />
          ) : (
            <></>
          )}
        </span>
      </Link>
      <div className={styles.cardInfoHeader}>
        <div className={styles.cardInfoProfile}>
          <Link href={`/profile/${author?.id}`}>
            <img
              className={styles.postAuthorImage}
              src={author?.image || "/assets/person-placeholder.jpg"}
            />
          </Link>
          <div className={styles.avatarInfo}>
            <p className="text-18">
              <Link href={`/profile/${author?.id}`}>
                <p className="text-18" className={styles.postAuthorName}>
                  {author?.name || author?.id}
                </p>
              </Link>
            </p>
            <p className={cn("opacity-50", styles.postDate)}>
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <SocialButton type="upload" />
      </div>
      <p className={styles.desc}> {title}</p>
      <p className={cn("opacity-50", styles.viewCount)}>
        {counts?.views || counts?.views === 0
          ? `${counts?.views} View${
              counts?.views > 1 || counts?.views < 1 ? "s" : ""
            }`
          : ""}
      </p>
      {/* buttons */}
      <div className={styles.socialButtons}>
        <SocialButton type="fav" highlight={isLiked} onClick={handleLikeClick}>
          {likeCount + ""}
        </SocialButton>
        <DropDown
          Component={() => (
            <SocialButton type="repost" highlight={isReposted}>
              {repostCount + ""}
            </SocialButton>
          )}
          title="Repost In"
          list={[
            {
              onClick: repostInProfile,
              title:
                "Profile" +
                (repostProfileCount > 0 ? " (" + repostProfileCount + ")" : ""),
            },
            {
              onClick: handleTeamRepostClick,
              title:
                "Team" +
                (repostTeamCount > 0 ? " (" + repostTeamCount + ")" : ""),
              seperator: true,
            },
          ]}
        ></DropDown>
        <SocialButton type="send" />
        <SocialButton type="comment">{counts?.comments || "0"}</SocialButton>
      </div>
    </div>
  );
}

export default HomeVideosCard;
