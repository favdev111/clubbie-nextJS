import React, { useState, useEffect } from "react";
import Player from "../../player";

const FormationBase = ({
  editMode,
  playerShirtColor,
  goalKeeperShirtColor,
  defaultLineup,
  lineup,
  styleSheet,
  activePlayer,
  onPlayerClick,
}) => {
  const [_editMode, setEditMode] = useState(false);
  const [_playerShirtColor, setPlayerShirtColor] = useState(null);
  const [_goalKeeperShirtColor, setGoalKeeperShirtColor] = useState(null);
  const [_lineup, setLineup] = useState([...defaultLineup]);
  const [_activePlayer, setActivePlayer] = useState(null);

  const findAndSetLineup = (defaultLineup, playerLineup) => {
    const _temp = defaultLineup?.map((x) => {
      const foundPlayer = playerLineup?.find(
        (y) => y?.position?.toLowerCase() === x?.position?.toLowerCase()
      );
      if (foundPlayer) return foundPlayer;
      return x;
    });

    setLineup([..._temp]);
  };

  useEffect(() => {
    editMode && setEditMode(editMode);
    lineup && findAndSetLineup(defaultLineup, lineup);
    setActivePlayer(activePlayer);
  }, []);

  useEffect(() => {
    setEditMode(editMode);
  }, [editMode]);

  useEffect(() => {
    setPlayerShirtColor(playerShirtColor);
  }, [playerShirtColor]);

  useEffect(() => {
    setGoalKeeperShirtColor(goalKeeperShirtColor);
  }, [goalKeeperShirtColor]);

  useEffect(() => {
    findAndSetLineup(defaultLineup, lineup);
  }, [lineup]);

  useEffect(() => {
    setActivePlayer(activePlayer);
  }, [activePlayer]);

  return (
    <div>
      {_lineup.map((player, index) => {
        return (
          <div
            key={index}
            className={styleSheet[`position${player?.position}`]}
          >
            <Player
              editMode={_editMode}
              formationCode={`${player?.position}`}
              shirtColor={
                player?.position === "GK"
                  ? _goalKeeperShirtColor
                  : _playerShirtColor
              }
              name={player?.name}
              isCaptain={player?.captain}
              selected={_activePlayer === player?.position}
              onClick={onPlayerClick}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FormationBase;
