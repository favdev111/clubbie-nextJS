import React from "react";
import cn from "classnames";

function TeamhubCard({ data, type, last }) {
  return (
    <div className={cn("teamhub-card", last && "last")}>
      {type === "club" && (
        <img src={require("../../../public/assets/teamhub.png")} />
      )}
      {type === "leader" && (
        <img src={require("../../../public/assets/teamhub2.png")} />
      )}
      {type === "player" && (
        <img src={require("../../../public/assets/teamhub3.png")} />
      )}
      <div className="teamhub-card__info">
        <h3> {data.title}</h3>
        <p> {data.desc} </p>
      </div>
      <button className="teamhub-card__button">
        <img src={require("../../../public/assets/forward.svg")} />
      </button>
    </div>
  );
}

export default TeamhubCard;
