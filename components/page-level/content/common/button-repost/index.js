import React, { useState } from "react";
import cn from "classnames";
import SocialButton from "@sub/social-button";
import BackDropLoader from "@sub/backdrop-loader";
import DropDown from "@sub/dropdown";
import ContentDialog from "@sub/content-dialog";
import Posts from "@api/services/Posts";
import Teams from "@api/services/Teams";
import styles from "./index.module.css";

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

export const RepostButton = ({
  repostCount,
  repostProfileCount,
  repostTeamCount,
  reposted,
  postId,
  teamIds,
  showNotificationMsg,
  onClick,
  onProfileRepost,
  onTeamRepost,
}) => {
  const [loading, setLoading] = useState(false);
  const [teamsList, setTeamsList] = useState([]);
  const [openContentDialog, setOpenContentDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const repostInProfile = async () => {
    setLoading(true);
    const response = await Posts.Repost(postId, {
      repostIn: "profile",
    }).catch(() => null);
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
    setLoading(false);
    onProfileRepost(response?.data?.repostedFromOriginal);
  };

  const handleTeamRepostClick = async () => {
    setLoading(true);
    if (!(teamIds?.length > 0)) {
      showNotificationMsg("You are not a member of any team", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }
    const response = await Teams.GetTeamsWithDetails(teamIds).catch(() => null);
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
    setLoading(true);
    const response = await Posts.Repost(postId, {
      repostIn: "team",
      teamId: selectedTeam?.id,
    }).catch(() => null);
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
    setLoading(false);
    onTeamRepost(response?.data?.repostedFromOriginal);
  };

  return (
    <>
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
      <DropDown
        Component={() => (
          <SocialButton type="repost" highlight={reposted}>
            {repostCount + ""}
          </SocialButton>
        )}
        title="Repost In"
        list={[
          {
            onClick: async () => {
              await onClick(repostInProfile);
            },
            title:
              "Profile" +
              (repostProfileCount > 0 ? " (" + repostProfileCount + ")" : ""),
          },
          {
            onClick: async () => {
              await onClick(handleTeamRepostClick);
            },
            title:
              "Team" +
              (repostTeamCount > 0 ? " (" + repostTeamCount + ")" : ""),
            seperator: true,
          },
        ]}
      ></DropDown>
    </>
  );
};
