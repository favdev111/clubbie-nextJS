import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PhotoCamera from "@svg/edit-profile-pic";
import Button from "@sub/button";
import useForm from "@sub/hook-form";
import TemplateInput from "@sub/input";
import useNotification from "@sub/hook-notification";
import styles from "./clubEdit.module.css";
import Files from "@api/services/Files";
import Clubs from "@api/services/Clubs";
import { editClub as editClubSchema } from "@utils/schemas/club.schema";

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
  const { register, handleSubmit, errors, setValue } = useForm({
    schema: editClubSchema,
  });

  useEffect(() => {
    setValue("title", clubTitle);
    setValue("description", clubDescription);
  }, [clubTitle, clubDescription]);

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

  const onSubmit = async (data) => {
    setLoading(true);

    // upload club crest image if any
    let clubCrestUploaded = null;
    if (_clubCrest?.file) {
      const imageForm = new FormData();
      imageForm.append("files", _clubCrest.file);

      const responseCrest = await Files.UploadFile("clubImg", imageForm, {
        clubId,
      }).catch(() => null);

      clubCrestUploaded =
        responseCrest?.data && responseCrest?.data[0]
          ? responseCrest?.data[0]?.s3Url
          : null;

      if (!clubCrestUploaded) {
        showNotificationMsg("Could Not Update Club", {
          variant: "error",
          displayIcon: true,
        });
        setLoading(false);
        return;
      }
    }

    const payload = { title: data?.title, description: data?.description };
    if (clubCrestUploaded) payload.crest = clubCrestUploaded;

    const response = await Clubs.UpdateClub(clubId, payload).catch(() => null);
    if (!response) {
      showNotificationMsg("Could Not Update Club", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    showNotificationMsg("Club Updated Successfully..!", {
      variant: "success",
      displayIcon: true,
    });

    router.push(`/clubs/${clubId}`); //  redirect to club profile
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  customProps={{ ...register("title") }}
                  hint={
                    errors?.title && {
                      type: "error",
                      msg: errors?.title?.message,
                      inputBorder: true,
                    }
                  }
                ></TemplateInput>
              </span>
              <span>
                <TemplateInput
                  placeholder="Club Description..."
                  size="large"
                  name="description"
                  customProps={{ ...register("description") }}
                  hint={
                    errors?.description && {
                      type: "error",
                      msg: errors?.description?.message,
                      inputBorder: true,
                    }
                  }
                  multiLine={true}
                  rows={5}
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
