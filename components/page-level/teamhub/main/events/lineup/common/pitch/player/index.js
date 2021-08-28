import React, { useState, useEffect } from "react";
import cn from "classnames";
import NoEntrySVG from "@svg/no-entry";
import PlusSVG from "@svg/plus-icon";
import PlayerShirtSVG from "@svg/player";
import styles from "./index.module.css";

const Player = ({
  name,
  selected,
  isCaptain,
  onClick,
  onCaptionSet,
  shirtColor,
  formationCode,
  editMode,
}) => {
  const [_name, setName] = useState(null);
  const [_selected, setSelected] = useState(false);
  const [_isCaptain, setIsCaptain] = useState(false);
  const [_shirtColor, setShirtColor] = useState(null);
  const [_editMode, setEditMode] = useState(false);

  useEffect(() => {
    name && setName(name);
    selected && setSelected(selected);
    isCaptain && setIsCaptain(isCaptain);
    shirtColor && setShirtColor(shirtColor);
    editMode && setEditMode(editMode);
  }, []);

  useEffect(() => {
    setEditMode(editMode);
  }, [editMode]);

  useEffect(() => {
    setShirtColor(shirtColor);
  }, [shirtColor]);

  useEffect(() => {
    setName(name);
  }, [name]);

  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  useEffect(() => {
    setIsCaptain(isCaptain);
  }, [isCaptain]);

  const handlePlayerBodyClick = async () => {
    if (!_editMode) return;
    onClick && (await onClick(formationCode));
  };

  const handleSetCaptainClick = async () => {
    if (!_editMode) return;
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
          strokeColor={_selected && "#c41d24"}
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
            _editMode && (
              <div className={styles.playerSetCaptainWrapper}>
                <span
                  className={styles.playerSetCaptain}
                  onClick={handleSetCaptainClick}
                >
                  Set Captain
                </span>
              </div>
            )
          )}
        </>
      ) : _editMode ? (
        <div
          className={styles.playerPlusIconWrapper}
          onClick={handlePlayerBodyClick}
        >
          <PlusSVG />
        </div>
      ) : (
        <div className={styles.playerPlusIconWrapper}>
          <NoEntrySVG />
        </div>
      )}
    </div>
  );
};

export default Player;
