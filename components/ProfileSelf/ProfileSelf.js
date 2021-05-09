import React from "react";
import Avatar from "../UI/Avatar/Avatar";
import OvalButton from "../UI/OvalButton/OvalButton";
import ProfileInfo from "../UI/ProfileInfo/ProfileInfo";
import ProfileDetails from "../UI/ProfileDetails/ProfileDetails";
import ForwardButton from "../UI/ForwardButton/ForwardButton";

function ProfileSelf({ join, isPublic }) {
  // I assume that is a JSON data
  const person = {
    name: "Roger Steward",
    role: "Footballer",
    email: "roger@gmail.com",
    telephone: "+44 7500 555 555",
    city: "Statford-Upon-Avon",
    country: "United Kingdom",
    postCode: "CV37 4HB",
    bio:
      "Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere. Nulla ultrices facilisis justo, non varius nisl semper vel.",
  };

  return (
    <div className="profile">
      <h1 className="profile__title"> Profile </h1>
      <div className="profile__player">
        <div className="profile__player__header">
          <div className="profile__player__header__inner__left">
            <Avatar />
            <ProfileInfo
              join={join}
              footballerName={person.name}
              role={person.role}
            />
          </div>
          <div className="profile__player__header__inner__right">
            <OvalButton isPublic={isPublic} appearence="edit">
              Edit Profile
            </OvalButton>
          </div>
        </div>
        <div className="profile__player__body">
          <ProfileDetails data={person} isPublic={isPublic} />
          <ForwardButton>Connected Bank Accounts</ForwardButton>
        </div>
      </div>
      <div className="profile__buttons">
        <OvalButton status="active" appearence="uploaded">
          Uploaded
        </OvalButton>
        <OvalButton appearence="tagged">Tagged</OvalButton>
        <OvalButton appearence="reposts">Reposts</OvalButton>
      </div>
      <div className="profile__photos">
        <div className="profile__photos__item">
          <img src={require("../../public/assets/photo1.png")}></img>
          <div className="profile__photos__options">
            <img src={require("../../public/assets/edit-photo.svg")} />
            <img src={require("../../public/assets/thrash.svg")} />
          </div>
        </div>
        <div className="profile__photos__item">
          <img src={require("../../public/assets/photo2.png")} />
          <div className="profile__photos__options">
            <img src={require("../../public/assets/edit-photo.svg")} />
            <img src={require("../../public/assets/thrash.svg")} />
          </div>
        </div>
        <div className="profile__photos__item">
          <img src={require("../../public/assets/photo3.png")} />
          <div className="profile__photos__options">
            <img src={require("../../public/assets/edit-photo.svg")} />
            <img src={require("../../public/assets/thrash.svg")} />
          </div>
        </div>
        <div className="profile__photos__item">
          <img src={require("../../public/assets/photo2.png")} />
          <div className="profile__photos__options">
            <img src={require("../../public/assets/edit-photo.svg")} />
            <img src={require("../../public/assets/thrash.svg")} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSelf;
