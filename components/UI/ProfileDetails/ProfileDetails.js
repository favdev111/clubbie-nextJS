import React from "react";

function ProfileDetails({ data, isPublic }) {
  return !isPublic ? (
    <div className="profile__player__body__content">
      <div className="profile__player__body__content__item span-3">
        Bio
        <p> {data.bio} </p>
      </div>
      <div className="profile__player__body__content__item span-1">
        Email
        <p> {data.email}</p>
      </div>
      <div className="profile__player__body__content__item span-1">
        Telephone
        <p> {data.telephone}</p>
      </div>
      <div className="profile__player__body__content__item span-1">
        City
        <p> {data.city}</p>
      </div>
      <div className="profile__player__body__content__item span-1">
        Country
        <p> {data.country}</p>
      </div>
      <div className="profile__player__body__content__item span-1 ">
        Post code
        <p> {data.postCode}</p>
      </div>
    </div>
  ) : (
    <div className="profile__player__body__content">
      <div className="profile__player__body__content__item span-3">
        Bio
        <p> {data.bio} </p>
      </div>
    </div>
  );
}

export default ProfileDetails;
