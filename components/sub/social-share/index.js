import React, { useState, useEffect } from "react";
import useNotification from "@sub/hook-notification";
import TemplateInput from "@sub/input";
import styles from "./index.module.css";
import FacebookSVG from "@svg/social/share/facebook";
import TwitterSVG from "@svg/social/share/twitter";
import PinterestSVG from "@svg/social/share/pinterest";
import WhatsAppSVG from "@svg/social/share/whatsapp";
import ClipBoardSVG from "@svg/clipboard";

function SocialShare({ onClipBoardClick, pageLink, shareText, shareMedia }) {
  const [_pageLink, setPageLink] = useState(pageLink || "");

  const popupConfig = (customConfig = {}) => {
    const _config = {
      height: "500px",
      width: "500px",
      location: "no",
      toolbar: "no",
      status: "no",
      directories: "no",
      menubar: "no",
      scrollbars: "yes",
      resizable: "no",
      centerscreen: "yes",
      chrome: "yes",
      ...customConfig,
    };
    return Object.keys(_config)
      .map((key) => `${key}=${_config[key]}`)
      .join(", ");
  };

  const openShareDialog = (url, title, config = {}) => {
    window.open(url, title, popupConfig(config));
  };

  const handleFacebookClick = () => {
    openShareDialog(
      `https://www.facebook.com/sharer/sharer.php?u=${_pageLink}&quote=${shareText}`,
      "Share on Facebook"
    );
  };

  const handleTwitterClick = () => {
    openShareDialog(
      `https://twitter.com/share?url=${_pageLink}&text=${shareText}`,
      "Share on Twitter"
    );
  };

  const handlePinterestClick = () => {
    openShareDialog(
      `https://pinterest.com/pin/create/button?url=${_pageLink}&media=${shareMedia}&description=${shareText}`,
      "Share on Pinterest"
    );
  };

  const handleWhatsAppClick = () => {
    openShareDialog(
      `https://web.whatsapp.com/send?text=${shareText + " " + _pageLink}`,
      "Share on Whatsapp"
    );
  };

  useEffect(() => {
    if (process.browser && !pageLink) {
      // setPageLink(window?.location?.href);
      setPageLink("http://github.com/"); // for testing
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
      <p>Share this post on social media</p>
      <div className={styles.socialIconsWrapper}>
        <span onClick={handleFacebookClick}>
          <FacebookSVG />
        </span>
        <span onClick={handleTwitterClick}>
          <TwitterSVG />
        </span>
        <span onClick={handlePinterestClick}>
          <PinterestSVG />
        </span>
        <span onClick={handleWhatsAppClick}>
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
