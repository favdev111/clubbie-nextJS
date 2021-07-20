import React, { useState, useEffect } from "react";
import SocialButton from "@sub/social-button";
import DropDown from "@sub/dropdown";
import SocialShare from "@sub/social-share";

export const ShareButton = ({ postTitle, postMedia }) => {
  const [dismiss, setDismiss] = useState(false);

  const onShare = () => {
    setDismiss(true);
  };

  useEffect(() => {
    if (dismiss) {
      setTimeout(function () {
        setDismiss(false);
      }, 500);
    }
  }, [dismiss]);

  return (
    <DropDown
      Component={() => <SocialButton type="upload" />}
      ChildComponent={() => (
        <SocialShare
          onClipBoardClick={onShare}
          onShareButtonClick={onShare}
          shareText={postTitle}
          shareMedia={postMedia}
        ></SocialShare>
      )}
      dismiss={dismiss}
    ></DropDown>
  );
};
