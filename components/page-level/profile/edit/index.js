import React from "react";
import Link from "next/link";
import cn from "classnames";
import Chip from "@sub/Chip";
import TemplateInput from "@sub/input";
import DirectedButton from "@sub/button-directed";
import Avatar from "@sub/avatar";
import Button from "@sub/button";
import styles from "./profileedit.module.css";

function ProfileEdit({ profile }) {
  const removeClub = () => {};
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };

  return (
    <form onSubmit={handleOnSubmit} className={styles.formLogin}>
      <div className={styles.profilePlayerHeader}>
        <div className={styles.profilePlayerHeaderInnerLeft}>
          <Avatar
            src={profile?.image || "/assets/person-placeholder.jpg"}
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
              required
              value={profile?.fullname}
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
              required
              value={profile?.playerTitle}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Email</p>
            <TemplateInput
              type="text"
              name="email"
              required
              value={profile?.email}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Telephone</p>
            <TemplateInput
              type="text"
              name="telephone"
              required
              value={profile?.phone}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Address</p>
            <TemplateInput
              type="text"
              name="address"
              required
              value={profile?.address}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>City</p>
            <TemplateInput
              type="text"
              name="city"
              required
              value={profile?.city}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Country</p>
            <TemplateInput
              type="text"
              name="country"
              required
              value={profile?.country}
            />
          </div>
          <div
            className={cn(styles.span1, styles.profilePlayerBodyContentItem)}
          >
            <p>Postal Code</p>
            <TemplateInput
              type="text"
              name="postalCode"
              required
              value={profile?.postalCode}
            />
          </div>
          <div
            className={cn(styles.span2, styles.profilePlayerBodyContentItem)}
          >
            <p>Bio</p>
            <TemplateInput
              type="text"
              name="postalCode"
              required
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
