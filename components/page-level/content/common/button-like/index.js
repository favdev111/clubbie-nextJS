import React from "react";
import SocialButton from "@sub/social-button";
import Interactions from "@api/services/Interactions";

export const LikeButton = ({
  count,
  liked,
  postId,
  showNotificationMsg,
  onLiked,
  onClick,
}) => {
  const handleLikeClick = async () => {
    if (!liked) {
      const response = await Interactions.LikePost(postId).catch(() => null);
      if (!response) {
        showNotificationMsg("Error liking post. Try again..!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }
      onLiked();
    } else {
      // TODO: remove interaction
      showNotificationMsg("Remove Post Like");
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
