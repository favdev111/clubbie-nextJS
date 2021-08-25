import React, { useState, useEffect } from "react";
import Player from "../../player";

const FormationBase = ({
  playerShirtColor,
  goalKeeperShirtColor,
  defaultLineup,
  lineup,
  styleSheet,
}) => {
  const [_playerShirtColor, setPlayerShirtColor] = useState(null);
  const [_goalKeeperShirtColor, setGoalKeeperShirtColor] = useState(null);
  const [_lineup, setLineup] = useState([...defaultLineup]);

  const findAndSetLineup = (defaultLineup, playerLineup) => {
    const _temp = defaultLineup?.map((x) => {
      const foundPlayer = playerLineup?.find(
        (y) => y?.position?.toLowerCase() === x?.position?.toLowerCase()
      );
      if (foundPlayer) {
        return {
          name: foundPlayer?.user?.profile?.fullName || foundPlayer?.user?.id,
          isCaptain: !!foundPlayer?.captain,
          position: x?.position,
        };
      }
      return x;
    });

    setLineup([..._temp]);
  };

  useEffect(() => {
    lineup && findAndSetLineup(defaultLineup, lineup);
  }, []);

  useEffect(() => {
    setPlayerShirtColor(playerShirtColor);
  }, [playerShirtColor]);

  useEffect(() => {
    setGoalKeeperShirtColor(goalKeeperShirtColor);
  }, [goalKeeperShirtColor]);

  useEffect(() => {
    lineup && findAndSetLineup(defaultLineup, lineup);
  }, [lineup]);

  return (
    <div>
      {_lineup.map((player, index) => {
        return (
          <div
            key={index}
            className={styleSheet[`position${player?.position}`]}
          >
            <Player
              formationCode={`${player?.position}`}
              shirtColor={
                player?.position === "GK"
                  ? _goalKeeperShirtColor
                  : _playerShirtColor
              }
              name={player?.name}
              isCaptain={player?.isCaptain}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FormationBase;
