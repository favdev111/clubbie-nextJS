import React, { useState, useEffect } from "react";
import useNotification from "@sub/hook-notification";
import TemplateInput from "@sub/input";
import styles from "./index.module.css";
import FacebookSVG from "@svg/social/share/facebook";
import TwitterSVG from "@svg/social/share/twitter";
import PinterestSVG from "@svg/social/share/pinterest";
import WhatsAppSVG from "@svg/social/share/whatsapp";
import ClipBoardSVG from "@svg/clipboard";

function SocialShare({ onClipBoardClick, pageLink, shareText }) {
  const [_shareText] = useState(shareText || "Share this post on social media");
  const [_pageLink, setPageLink] = useState(pageLink || "");

  useEffect(() => {
    if (process.browser && !pageLink) {
      setPageLink(window?.location?.href);
    }
  }, []);

  const { showNotificationMsg } = useNotification();

  const copyLinkToClipboard = () => {
    navigator.clipboard
      .writeText(_pageLink)
      .then(() => {
        showNotificationMsg("Copied to Clipboard", {
          variant: "success",
          displayIcon: true,
        });
      })
      .catch(() => {
        showNotificationMsg("Failed to copy to Clipboard", {
          variant: "error",
          displayIcon: true,
        });
      });
    onClipBoardClick();
  };

  return (
    <div className={styles.socialShare}>
      <p>{_shareText}</p>
      <div className={styles.socialIconsWrapper}>
        <span>
          <FacebookSVG />
        </span>
        <span>
          <TwitterSVG />
        </span>
        <span>
          <PinterestSVG />
        </span>
        <span>
          <WhatsAppSVG />
        </span>
      </div>
      <div className={styles.clipBoardURLWrapper}>
        <TemplateInput
          type="text"
          value={_pageLink}
          className={styles.clipBoardInputWrapper}
          inputClassName={styles.clipBoardInput}
        />
        <div className={styles.clipboardButton} onClick={copyLinkToClipboard}>
          <ClipBoardSVG />
        </div>
      </div>
    </div>
  );
}

export default SocialShare;
