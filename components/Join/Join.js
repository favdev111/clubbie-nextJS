import React from "react";

function Join({ title, data, current }) {
  return (
    <div className="join">
      <div className="join__header">
        <div className="join__header__inner">
          <button>
            <img src={require("../../public/assets/back.svg")} />
          </button>
          <h1> {title} </h1>
          {current && (
            <div className="join__header__current">
              <img src={require("../../public/assets/aondimentum.svg")} />
              Aondimentum
            </div>
          )}
        </div>

        <button className="skip"> Skip </button>
      </div>
      <div className="join__searchbox">
        <img src={require("../../public/assets/search.svg")} />

        <input type="text" placeholder="Search" />
      </div>
      <div className="join__list__content">
        <ul className="join__list">
          {data &&
            data.map((i) => (
              <li className="join__list__item">
                <img src={require("../../public/assets/team1.png")} />
                {i.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Join;
