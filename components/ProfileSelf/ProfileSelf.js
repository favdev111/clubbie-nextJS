import React from "react";
import Avatar from "../UI/Avatar/Avatar";
import OvalButton from "../UI/OvalButton/OvalButton";
import ProfileInfo from "../UI/ProfileInfo/ProfileInfo";
import ProfileDetails from "../UI/ProfileDetails/ProfileDetails";
import ForwardButton from "../UI/ForwardButton/ForwardButton";

function ProfileSelf() {
    // I assume that is a JSON data
    const person = {
      name: "Roger Steward",
      role: "Footballer",
      email: "roger@gmail.com",
      telephone: "+44 7500 555 555",
      city: "Statford-Upon-Avon",
      country: "United Kingdom",
      postCode: "CV37 4HB",
      bio: "Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere. Nulla ultrices facilisis justo, non varius nisl semper vel."
    }
    

  return (
    <div className="profile">
      <h1 className="profile__title"> Profile </h1>
      <div className="profile__player">
        <div className="profile__player__header">
          <Avatar />
          <ProfileInfo 
          footballerName={person.name} 
          role={person.role}
          />
          <OvalButton appearence="edit">Edit Profile</OvalButton>
          <ProfileDetails
          data={person} />
        </div>
        <ForwardButton>Connected Bank Accounts</ForwardButton>
      </div>
    </div>
  );
}

export default ProfileSelf;
