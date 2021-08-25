import React, { useState, useEffect } from "react";
import cn from "classnames";
import PlusSVG from "@svg/plus-icon";
import PlayerShirtSVG from "@svg/player";
import styles from "./index.module.css";

const Player = ({
  name,
  selected,
  isCaptain,
  onSelect,
  onUnSelect,
  onCaptionSet,
  shirtColor,
  formationCode,
}) => {
  const [_name, setName] = useState(null);
  const [_selected, setSelected] = useState(false);
  const [_isCaptain, setIsCaptain] = useState(false);
  const [_shirtColor, setShirtColor] = useState(null);

  useEffect(() => {
    name && setName(name);
    selected && setSelected(selected);
    isCaptain && setIsCaptain(isCaptain);
    shirtColor && setShirtColor(shirtColor);
  }, []);

  useEffect(() => {
    setShirtColor(shirtColor);
  }, [shirtColor]);

  useEffect(() => {
    setName(name);
  }, [name]);

  useEffect(() => {
    setIsCaptain(isCaptain);
  }, [isCaptain]);

  const handlePlayerBodyClick = async () => {
    !_selected && onSelect && (await onSelect(formation));
    _selected && onUnSelect && (await onUnSelect(formation));
    setSelected(!_selected);
  };

  const handleSetCaptainClick = async () => {
    setIsCaptain(true);
    onCaptionSet && (await onCaptainSet(formationCode));
  };

  return (
    <div className={styles.playerWrapper}>
      <div
        className={cn(
          styles.playerShirtIconWrapper,
          _selected && styles.playerShirtIconWrapperActive
        )}
        onClick={handlePlayerBodyClick}
      >
        <PlayerShirtSVG
          fillColor={_shirtColor}
          strokeColor={_selected && "#c41d24"} // TODO: make theme file
        />
      </div>
      {_name ? (
        <>
          <div className={styles.playerNameWrapper}>
            <span className={styles.playerName}>{_name}</span>
          </div>
          {_isCaptain ? (
            <div className={styles.playerIsCaptainWrapper}>
              <span className={styles.playerIsCaptain}>C</span>
            </div>
          ) : (
            <div className={styles.playerSetCaptainWrapper}>
              <span
                className={styles.playerSetCaptain}
                onClick={handleSetCaptainClick}
              >
                Set Captain
              </span>
            </div>
          )}
        </>
      ) : (
        <div
          className={styles.playerPlusIconWrapper}
          onClick={handlePlayerBodyClick}
        >
          <PlusSVG />
        </div>
      )}
    </div>
  );
};

export default Player;
