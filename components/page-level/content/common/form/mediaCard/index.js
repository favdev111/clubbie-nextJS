import React from "react";
import UploadSVG from "@svg/upload";
import styles from "./contentMediaCard.module.css";

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

function ParentMedia({ media, setMedia }) {
  return (
    <div className={styles.parentMediaItem}>
      {media?.includes("image") && <img src={media}></img>}
      {media?.includes("video") && <video src={media} controls></video>}
      <span className={styles.mediaCloseIcon} onClick={() => setMedia(null)}>
        <CloseSVG />
      </span>
    </div>
  );
}

function RelatedMedia({ media, setMedia }) {
  return media ? (
    <div className={styles.relatedMediaItem}>
      <>
        {media?.includes("image") && <img src={media}></img>}
        {media?.includes("video") && <video src={media} controls></video>}
        <span className={styles.mediaCloseIcon} onClick={() => setMedia(null)}>
          <CloseSVG />
        </span>
      </>
    </div>
  ) : (
    <></>
  );
}

function PickRelatedMedia() {
  return (
    <div className={styles.relatedMediaItem}>
      <div className={styles.relatedMediaPicker}>
        <UploadSVG></UploadSVG>
      </div>
    </div>
  );
}

function ContentMediaCard({
  media,
  setMedia,
  mode,
  relatedMediaItems,
  setRelatedMediaItems,
  deleteChildPosts,
  setDeleteChildPosts,
}) {
  return (
    (mode === "parent-media" && media && setMedia && (
      <ParentMedia
        media={media?.src || media}
        setMedia={setMedia}
      ></ParentMedia>
    )) ||
    (mode === "related-media" &&
      relatedMediaItems &&
      setRelatedMediaItems &&
      relatedMediaItems.map((_media, index) => (
        <RelatedMedia
          key={index}
          media={_media?.src || _media?.media || media}
          setMedia={(val) => {
            const newRelatedMedia = relatedMediaItems;
            newRelatedMedia[index] = val;
            const valuesToSet = newRelatedMedia.filter((x) => !!x);
            setRelatedMediaItems([...valuesToSet]);
            if (_media?.id) {
              setDeleteChildPosts([...(deleteChildPosts || []), _media.id]);
            }
          }}
        ></RelatedMedia>
      ))) ||
    (mode === "pick-related-media" && (
      <PickRelatedMedia media={media} setMedia={setMedia}></PickRelatedMedia>
    ))
  );
}

export default ContentMediaCard;
