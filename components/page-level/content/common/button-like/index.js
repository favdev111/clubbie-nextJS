import React from "react";
import SocialButton from "@sub/social-button";
import Interactions from "@api/services/Interactions";

export const LikeButton = ({
  count,
  liked,
  postId,
  showNotificationMsg,
  onLiked,
  onUnliked,
  onClick,
}) => {
  const handleLikeClick = async () => {
    if (!liked) {
      const response = await Interactions.LikePost(postId).catch(() => null);
      if (!response) {
        showNotificationMsg("Error Liking Post", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }
      onLiked(response.data.id);
    } else {
      const response = await Interactions.RemoveInteraction(liked).catch(
        () => null
      );
      if (!response) {
        showNotificationMsg("Error Removing Like", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }
      onUnliked();
    }
  };

  return (
    <SocialButton
      type="fav"
      highlight={liked}
      onClick={async () => {
        await onClick(handleLikeClick);
      }}
    >
      {count + ""}
    </SocialButton>
  );
};
