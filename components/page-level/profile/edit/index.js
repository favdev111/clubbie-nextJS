import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import Chip from "@sub/chip";
import TemplateInput from "@sub/input";
import TemplateSelect from "@sub/selectbox";
import DirectedButton from "@sub/button-directed";
import Avatar from "@sub/avatar";
import Button from "@sub/button";
import Files from "@api/services/Files";
import Users from "@api/services/Users";
import auth from "@utils/helpers/auth";
import playerTitles from "@utils/fixedValues/playerTitles";
import countries from "@utils/fixedValues/countries";
import styles from "./profileedit.module.css";

function ProfileEdit({ profile, clubs }) {
  // TODO: edit email, delete clubs , handle image display, show errors
  const router = useRouter();

  const defaultImage = "/assets/person-placeholder.jpg";

  const [image, setImage] = useState(() => profile?.image || defaultImage);
  const [fullName, setFullName] = useState(() => profile?.fullName);
  const [playerTitle, setPlayerTitle] = useState(() => profile?.playerTitle);
  const [telephone, setTelephone] = useState(() => profile?.telephone);
  const [address, setAddress] = useState(() => profile?.address);
  const [city, setCity] = useState(() => profile?.city);
  const [country, setCountry] = useState(() => profile?.country);
  const [postCode, setPostCode] = useState(() => profile?.postCode);
  const [bio, setBio] = useState(() => profile?.bio);
  const [clubsToRemove, setClubsToRemove] = useState([]);

  const removeClub = (id) => {
    const x = new Set([...clubsToRemove, id]);
    setClubsToRemove(x);
  };
  const onImagePicked = (image) => setImage(image);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("Remove these clubs => ", clubsToRemove);

    // POST: files/upload
    let imageUploaded = null;
    if (image.src && image.file) {
      const imageForm = new FormData();
      imageForm.append("files", image.file);
      await Files.UploadFile("userImg", imageForm)
        .then((res) => {
          console.log("image res => ", res);
          imageUploaded = res?.data[0]?.s3Url;
        })
        .catch((err) => {
          console.log("image err => ", err);
          alert(err.response.data.message); // TODO: error comp
        });
    }

    // POST: users/profile
    const formBody = {
      fullName: fullName?.trim() || null,
      image: imageUploaded || null,
      playerTitle: playerTitle?.trim() || null,
      telephone: telephone?.trim() || null,
      address: address?.trim() || null,
      city: city?.trim() || null,
      country: country?.trim() || null,
      postCode: postCode?.trim() || null,
      bio: bio?.trim() || null,
    };
    const updateBody = Object.fromEntries(
      Object.entries(formBody).filter(([_, v]) => v != null)
    );
    await Users.UpdateProfile(updateBody)
      .then((res) => {
        console.log("res => ", res);
        auth.setUser(res.data); // TODO: make this cookies to not expire
        router.push("/profile/self");
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Title</p>
            <TemplateSelect
              name="playerTitle"
              options={playerTitles}
              selected={playerTitle}
              onChange={(e) => setPlayerTitle(e.target.value)}
            ></TemplateSelect>
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
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Address</p>
            <TemplateInput
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>City</p>
            <TemplateInput
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Country</p>
            <TemplateSelect
              name="country"
              options={countries}
              selected={country}
              onChange={(e) => setCountry(e.target.value)}
            ></TemplateSelect>
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Postal Code</p>
            <TemplateInput
              type="text"
              name="postCode"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
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
              value={bio}
              rows={2}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.profilePlayerClubChips}>
          <div
            className={cn(styles.span3, styles.profilePlayerBodyContentItem)}
          >
            <p>Clubs</p>
          </div>
          {clubs.map((club, index) => (
            <div
              key={index}
              className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
            >
              <Chip
                image={club?.crest || "/assets/club-badge-placeholder.png"}
                roundedImage
                text={club.title}
                onCloseClick={() => removeClub(club.id)}
              />
            </div>
          ))}
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
