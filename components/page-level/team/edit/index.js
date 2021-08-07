import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PhotoCamera from "@svg/edit-profile-pic";
import Button from "@sub/button";
import useForm from "@sub/hook-form";
import TemplateInput from "@sub/input";
import useNotification from "@sub/hook-notification";
import styles from "./teamEdit.module.css";
import Files from "@api/services/Files";
import Teams from "@api/services/Teams";
import { editTeam as editTeamSchema } from "@utils/schemas/team.schema";

function TeamHeader({
  teamId,
  teamCrest,
  teamTitle,
  clubCrest,
  showNotificationMsg,
}) {
  const [_teamCrest, setTeamCrest] = useState({
    src: teamCrest || "/assets/club-badge-placeholder.png",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { register, handleSubmit, errors, setValue } = useForm({
    schema: editTeamSchema,
  });

  useEffect(() => {
    setValue("title", teamTitle);
  }, [teamTitle]);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const imagePicked = {
        src: e.target.result,
        file,
      };
      setTeamCrest(imagePicked);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    // upload team crest image if any
    let teamCrestUploaded = null;
    if (_teamCrest?.file) {
      const imageForm = new FormData();
      imageForm.append("files", _teamCrest.file);

      const responseCrest = await Files.UploadFile("teamImg", imageForm, {
        teamId,
      }).catch(() => null);

      teamCrestUploaded =
        responseCrest?.data && responseCrest?.data[0]
          ? responseCrest?.data[0]?.s3Url
          : null;

      if (!teamCrestUploaded) {
        showNotificationMsg("Could Not Update Team", {
          variant: "error",
          displayIcon: true,
        });
        setLoading(false);
        return;
      }
    }

    const payload = { title: data?.title };
    if (teamCrestUploaded) payload.crest = teamCrestUploaded;

    const response = await Teams.UpdateTeam(teamId, payload).catch(() => null);
    if (!response) {
      showNotificationMsg("Could Not Update Team", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    showNotificationMsg("Team Updated Successfully..!", {
      variant: "success",
      displayIcon: true,
    });

    router.push(`/teams/${teamId}`); //  redirect to team profile
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.teamHeaderWrapper}>
          <div>
            <div className={styles.teamCrestWrapper}>
              <img className={styles.teamCrest} src={clubCrest} />
              {/* <input
                hidden
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={onFileChange}
              />
              <label htmlFor="icon-button-file">
                <span className={styles.teamClubCrestWrapper}>
                  <PhotoCamera></PhotoCamera>
                </span>
              </label> */}
            </div>
          </div>
          <div className={styles.teamHeaderDetailsWrapper}>
            <div className={styles.teamHeaderTitleWrapper}>
              <TemplateInput
                placeholder="Team Title..."
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
            </div>
            <div className={styles.teamHeaderActionButtons}>
              <Link href={`/teams/${teamId}`}>
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

function TeamDetails({ team }) {
  const [_team] = useState(team);

  const { showNotificationMsg } = useNotification();

  return (
    <TeamHeader
      teamId={_team?.id}
      teamCrest={_team?.crest}
      clubCrest={_team?.club?.crest}
      teamTitle={_team?.title}
      showNotificationMsg={showNotificationMsg}
    ></TeamHeader>
  );
}

export default TeamDetails;
