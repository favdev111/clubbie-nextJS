import React, { useState, useEffect } from "react";
import SocialButton from "@sub/social-button";
import DropDown from "@sub/dropdown";
import SocialShare from "@sub/social-share";

export const ShareButton = () => {
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
          shareText={"Shared From Clubbie"}
          shareMedia={"https://i.stack.imgur.com/f0RDj.jpg"}
        ></SocialShare>
      )}
      dismiss={dismiss}
    ></DropDown>
  );
};
