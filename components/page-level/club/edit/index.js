import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PhotoCamera from "@svg/edit-profile-pic";
import Button from "@sub/button";
import TemplateInput from "@sub/input";
import useNotification from "@sub/hook-notification";
import styles from "./clubEdit.module.css";

function ClubHeader({
  clubId,
  clubCrest,
  clubTitle,
  clubDescription,
  showNotificationMsg,
}) {
  const [_clubCrest, setClubCrest] = useState({
    src: clubCrest || "/assets/club-badge-placeholder.png",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const imagePicked = {
        src: e.target.result,
        file,
      };
      setClubCrest(imagePicked);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <form>
        <div className={styles.clubHeaderWrapper}>
          <div>
            <div className={styles.clubCrestWrapper}>
              <img className={styles.clubCrest} src={_clubCrest?.src} />
              <input
                hidden
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={onFileChange}
              />
              <label htmlFor="icon-button-file">
                <span className={styles.clubClubCrestWrapper}>
                  <PhotoCamera></PhotoCamera>
                </span>
              </label>
            </div>
          </div>
          <div className={styles.clubHeaderDetailsWrapper}>
            <div className={styles.clubHeaderTitleWrapper}>
              <span>
                <TemplateInput
                  placeholder="Club Title..."
                  size="large"
                  name="title"
                ></TemplateInput>
              </span>
              <span>
                <TemplateInput
                  placeholder="Club Description..."
                  size="large"
                  name="description"
                ></TemplateInput>
              </span>
            </div>
            <div className={styles.clubHeaderActionButtons}>
              <Link href={`/clubs/${clubId}`}>
                <a>
                  <Button variant="transparent" size="medium" type="button">
                    Cancel
                  </Button>
                </a>
              </Link>
              <Button
                variant="info"
                size="medium"
                loading={loading}
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

function ClubDetails({ club }) {
  const [_club] = useState(club);

  const { showNotificationMsg } = useNotification();

  return (
    <ClubHeader
      clubId={_club?.id}
      clubCrest={_club?.crest}
      clubTitle={_club?.title}
      clubDescription={_club?.description}
      showNotificationMsg={showNotificationMsg}
    ></ClubHeader>
  );
}

export default ClubDetails;
