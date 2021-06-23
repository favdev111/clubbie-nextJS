import React from "react";
import styles from "./profileedit.module.css";
import cn from "classnames";
import Chip from "@sub/chip";
import TemplateInput from "@sub/input";
import TemplateSelectBox from "@sub/selectbox";
import DirectedButton from "@sub/button-directed";

function ProfileEdit({ data }) {
  const removeClub = () => {};

  return (
    <>
      <div className={styles.profilePlayerBodyContent}>
        <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
          <p>Full Name</p>
          <TemplateInput
            type="text"
            name="fullName"
            required
            value={data.name}
          />
        </div>
        <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
          <p>Title</p>
          <TemplateSelectBox options={["Player", "Admin"]} />
        </div>
        <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
          <p>Email</p>
          <TemplateInput type="text" name="email" required value={data.email} />
        </div>
        <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
          <p>Telephone</p>
          <TemplateInput
            type="text"
            name="telephone"
            required
            value={data.telephone}
          />
        </div>
        <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
          <p>Address</p>
          <TemplateInput
            type="text"
            name="address"
            required
            value={data.address}
          />
        </div>
        <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
          <p>City</p>
          <TemplateInput type="text" name="city" required value={data.city} />
        </div>
        <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
          <p>Country</p>
          <TemplateInput
            type="text"
            name="country"
            required
            value={data.country}
          />
        </div>
        <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
          <p>Postal Code</p>
          <TemplateInput
            type="text"
            name="postalCode"
            required
            value={data.postalCode}
          />
        </div>
      </div>
      <div className={styles.profilePlayerClubChips}>
        <div className={cn(styles.span3, styles.profilePlayerBodyContentItem)}>
          <p>Clubs</p>
        </div>
        <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
          <Chip text="Shottery United" onCloseClick={removeClub} />
        </div>
        <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
          <Chip text="Shottery United" onCloseClick={removeClub} />
        </div>
        <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
          <Chip
            component={
              <DirectedButton direction="forward">
                <span className={styles.btnChipPadding}>Join Club</span>
              </DirectedButton>
            }
          />
        </div>
      </div>
    </>
  );
}

export default ProfileEdit;
