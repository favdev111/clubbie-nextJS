import React from "react";

function ProfileDetails({data}) {
  return (
    <div>
      <div>
        Bio
        <p> {data.bio} </p>
      </div>
      <div>
        Email
        <p> {data.email}</p>
      </div>
      <div>
        Telephone
        <p> {data.telephone}</p>
      </div>
      <div>
        City
        <p> {data.city}</p>
      </div>
      <div>
        Country
        <p> {data.country}</p>
      </div>
      <div>
        Post code
        <p> {data.postCode}</p>
      </div>
    </div>
  );
}

export default ProfileDetails;
