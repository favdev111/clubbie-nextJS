import React, { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import cn from "classnames";
import Chip from "@sub/chip";
import TemplateInput from "@sub/input";
import DirectedButton from "@sub/button-directed";
import Avatar from "@sub/avatar";
import Button from "@sub/button";
import Files from "@api/services/Files";
import Users from "@api/services/Users";
import HTTPClient from "@api/HTTPClient";
import styles from "./profileedit.module.css";

function ProfileEdit({ profile }) {
  const defaultImage = "/assets/person-placeholder.jpg";
  const [image, setImage] = useState(() => profile?.image || defaultImage);

  const removeClub = () => {};
  const onImagePicked = (image) => {
    setImage(image); // {src,file}
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // set access header
    HTTPClient.setHeader(
      "Authorization",
      `Bearer ${Cookies.get("access_token")}`
    );

    // POST: files/upload
    let imageIdToUpload = null;
    if (image.src && image.file) {
      const imageForm = new FormData();
      imageForm.append("files", image.file);
      await Files.UploadFile("userImg", imageForm)
        .then((res) => {
          imageIdToUpload = res.data[0].id;
          console.log("image res => ", res);
        })
        .catch((err) => {
          console.log("image err => ", err);
          alert(err.response.data.message); // TODO: error comp
        });
    }

    // POST: users/profile
    const formBody = {
      fullName: e.target?.fullName?.value.trim() || null,
      image: imageIdToUpload || null,
      playerTitle: e.target?.playerTitle?.value.trim() || null,
      telephone: e.target?.telephone?.value.trim() || null,
      address: e.target?.address?.value.trim() || null,
      city: e.target?.city?.value.trim() || null,
      country: e.target?.country?.value.trim() || null,
      postCode: e.target?.postCode?.value.trim() || null,
      bio: e.target?.bio?.value.trim() || null,
    };
    const updateBody = Object.fromEntries(
      Object.entries(formBody).filter(([_, v]) => v != null)
    );
    await Users.UpdateProfile(updateBody)
      .then((res) => {
        console.log("res => ", res);
        Cookies.set("user", res.data);
      })
      .catch((err) => {
        console.log("err => ", err);
        alert(err.response.data.message); // TODO: error comp
      });
  };

  return (
    <form onSubmit={handleOnSubmit} className={styles.formLogin}>
      <div className={styles.profilePlayerHeader}>
        <div className={styles.profilePlayerHeaderInnerLeft}>
          <Avatar
            editMode
            onImagePicked={onImagePicked}
            src={image}
            className={styles.profilePlayerImage}
          />
        </div>
        <div className={styles.profilePlayerHeaderInnerRight}>
          <div>
            <Button type="submit">Save Changes</Button>
          </div>
        </div>
      </div>
      <div className={styles.profilePlayerBody}>
        <div className={styles.profilePlayerBodyContent}>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Full Name</p>
            <TemplateInput
              type="text"
              name="fullName"
              value={profile?.fullName}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Title</p>
            {/* make it a dropdown menu */}
            <TemplateInput
              type="text"
              name="playerTitle"
              value={profile?.playerTitle}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Email</p>
            <TemplateInput type="text" name="email" value={profile?.email} />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Telephone</p>
            <TemplateInput
              type="text"
              name="telephone"
              value={profile?.telephone}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Address</p>
            <TemplateInput
              type="text"
              name="address"
              value={profile?.address}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>City</p>
            <TemplateInput type="text" name="city" value={profile?.city} />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Country</p>
            <TemplateInput
              type="text"
              name="country"
              value={profile?.country}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Postal Code</p>
            <TemplateInput
              type="text"
              name="postCode"
              value={profile?.postCode}
            />
          </div>
          <div
            className={cn(styles.span2, styles.profilePlayerBodyContentItem)}
          >
            <p>Bio</p>
            <TemplateInput
              type="text"
              name="bio"
              multiLine
              value={profile?.bio}
            />
          </div>
        </div>
        <div className={styles.profilePlayerClubChips}>
          <div
            className={cn(styles.span3, styles.profilePlayerBodyContentItem)}
          >
            <p>Clubs</p>
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <Chip text="Shottery United" onCloseClick={removeClub} />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <Chip text="Shottery United" onCloseClick={removeClub} />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <Chip
              component={
                <Link href="/teamhub/join-club">
                  <a>
                    <DirectedButton direction="forward">
                      <span className={styles.btnChipPadding}>Join Club</span>
                    </DirectedButton>
                  </a>
                </Link>
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProfileEdit;
