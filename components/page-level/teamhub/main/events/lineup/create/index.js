import React, { useState, useEffect } from "react";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@sub/button";
import useNotification from "@sub/hook-notification";
import ConfirmDialog from "@sub/confirm-dialog";
import ResetSVG from "@svg/undo";
import Events from "@api/services/Events";
import matchFormations from "@utils/fixedValues/matchFormations";
import playerRoles from "@utils/fixedValues/playerRoles";
import FormationList from "../common/formationList";
import Pitch from "../common/pitch";
import styles from "./index.module.css";

function PlayersList({
  availablePlayers,
  unAvailablePlayers,
  activePlayerId,
  setActivePlayerId,
}) {
  return (
    <div
      className={cn(
        styles.eventPlayersWrapper,
        availablePlayers && styles.eventAvailablePlayersList,
        unAvailablePlayers && styles.eventUnAvailablePlayersList
      )}
    >
      <div className={styles.eventPlayerHeader}>
        <h3>
          {availablePlayers && "Available"}
          {unAvailablePlayers && "Uavailable"} Players
        </h3>
        {availablePlayers && <h3>Last Played</h3>}
      </div>
      <div className={styles.eventPlayersList}>
        {(availablePlayers || unAvailablePlayers)?.map((player) => (
          <div
            className={cn(
              styles.eventPlayerItem,
              activePlayerId === player?.user?.id &&
                styles.eventPlayerItemActive
            )}
            onClick={async () =>
              setActivePlayerId && (await setActivePlayerId(player?.user?.id))
            }
          >
            <span>{player?.user?.profile?.fullName || player?.user?.id}</span>
            {availablePlayers && (
              <span>{player?.lastMatchPlayedDate || "-"}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LineupCreate({ user, event }) {
  const router = useRouter();

  const [_event, setEvent] = useState(null);
  const [_eventTitle, setEventTitle] = useState(null);
  const [_eventHomeTeam, setEventHomeTeam] = useState(null);
  const [_formation, setFormation] = useState(null);
  const [_availablePlayers, setAvailablePlayers] = useState(null);
  const [_unAvailablePlayers, setUnAvailablePlayers] = useState(null);
  const [
    _activeAvailablePlayerIdFromList,
    setActiveAvailablePlayerIdFromList,
  ] = useState(null);
  const [
    _activePlayerFormationCodeFromPitch,
    setActivePlayerFormationCodeFromPitch,
  ] = useState(null);
  const [_isActivePitchPlayerCaptain, setIsActivePitchPlayerCaptain] = useState(
    false
  );
  const [
    _isActivePitchPlayerAssigned,
    setIsActivePitchPlayerAssigned,
  ] = useState(false);
  /* 
    lineups state will handle all lineup formations (current and future)
    and player positions in array - like commented below.
  */
  const [lineups, setLineups] = useState([
    // {
    //   formationCode: null,
    //   players: [],
    // },
  ]);
  const [_activeLineup, setActiveLineup] = useState(null);
  const [_loading, setLoading] = useState(false);
  const [_resetPitch, setResetPitch] = useState(false);

  const { showNotificationMsg } = useNotification();

  useEffect(() => {
    setEvent({ ...event });

    // set event title
    const eventTeamTitles = event?.teams?.map(
      (x) => x?.teamId?.title || x?.team?.title
    );
    setEventTitle(`${eventTeamTitles[0]} v. ${eventTeamTitles[1]}`);

    // set home team
    const homeTeam = (() => {
      const _temp = event?.teams?.find((x) =>
        x?.attendees?.find((a) => a?.user?.id === user?.id)
      );
      _temp.team = _temp?.teamId;
      delete _temp["teamId"];
      return _temp;
    })();
    setEventHomeTeam({ ...homeTeam });

    // set home team formation
    setFormation(homeTeam?.formation || matchFormations?.NO_FORMATION);

    // set home team available/non-available players
    const availablePlayers = [];
    const unAvailablePlayers = [];
    homeTeam?.attendees?.map((x) =>
      x?.available ? availablePlayers?.push(x) : unAvailablePlayers.push(x)
    );
    setAvailablePlayers([...availablePlayers]);
    setUnAvailablePlayers([...unAvailablePlayers]);

    // set home team lineup
    const _lineup = (() => {
      const uniquePlayerPositions = new Set();
      const _players = homeTeam?.attendees?.filter(
        (x) =>
          (x?.role === playerRoles?.PLAYER ||
            x?.role === playerRoles?.GOAL_KEEPER) &&
          !uniquePlayerPositions.has(x?.position) &&
          uniquePlayerPositions.add(x?.position)
      );
      return {
        formation: homeTeam?.formation,
        players: _players,
      };
    })();
    setLineups([_lineup]);

    // set active lineup
    setActiveLineup({ ..._lineup });
  }, []);

  const handleFormationSet = (formation) => {
    setFormation(formation);
    const activeLineup = lineups?.find((x) => x?.formation === formation);
    setActiveLineup(activeLineup ? { ...activeLineup } : null);
    setActivePlayerFormationCodeFromPitch(null);
    setIsActivePitchPlayerCaptain(false);
  };

  const assignPitchPositionToListPlayer = (listPlayerId, pitchPosition) => {
    // find player and set new position
    const _player = (() => {
      const tempPlayer = _eventHomeTeam?.attendees?.find(
        (x) => x?.user?.id === listPlayerId
      );
      return {
        ...tempPlayer,
        position: pitchPosition,
      };
    })();

    // add player to current lineup and set it active
    const _currentLineupOld =
      lineups?.find((x) => x?.formation === _formation) || [];
    const _currentLineupNew = {
      formation: _formation,
      ..._currentLineupOld,
      players: Object.assign(
        [],
        [
          ...(_currentLineupOld?.players || [])
            ?.filter((x) => x?.user?.id !== listPlayerId)
            ?.filter((x) => x?.position !== pitchPosition),
          _player,
        ]
      ),
    };
    setActiveLineup(Object.assign({}, _currentLineupNew));

    // update current lineup in lineups list
    const _newLineups = [
      ...(lineups?.filter((x) => x?.formation !== _formation) || [])
        .map((x) => {
          return Object.assign({}, x);
        })
        .flat(),
      Object.assign({}, _currentLineupNew),
    ];
    setLineups([..._newLineups]);

    // unset state values
    setActiveAvailablePlayerIdFromList(null);
    setActivePlayerFormationCodeFromPitch(null);
    setIsActivePitchPlayerCaptain(false);
    setIsActivePitchPlayerAssigned(false);
  };

  const handleAvailablePlayerListItemClick = (playerId) => {
    if (!playerId) return;
    _activeAvailablePlayerIdFromList === playerId
      ? setActiveAvailablePlayerIdFromList(null)
      : setActiveAvailablePlayerIdFromList(playerId);

    _activePlayerFormationCodeFromPitch &&
      assignPitchPositionToListPlayer(
        playerId,
        _activePlayerFormationCodeFromPitch
      );
  };

  const handlePitchPlayerClick = (formationCode) => {
    if (!formationCode) return;
    if (formationCode === _activePlayerFormationCodeFromPitch) {
      setIsActivePitchPlayerAssigned(false);
      setActivePlayerFormationCodeFromPitch(null);
      return;
    }
    // update active formation code
    setActivePlayerFormationCodeFromPitch(formationCode);

    // assign player to position if position and player both are selected
    if (_activeAvailablePlayerIdFromList) {
      assignPitchPositionToListPlayer(
        _activeAvailablePlayerIdFromList,
        formationCode
      );
      return;
    }

    // find player at current position(formationCode)
    const foundPlayer = _activeLineup?.players?.find(
      (x) => x?.position === formationCode
    );

    // update state values
    setIsActivePitchPlayerAssigned(foundPlayer ? true : false);
    setIsActivePitchPlayerCaptain(!!foundPlayer?.captain);
  };

  const resetPitchFormation = () => {
    // remove active lineup if same formation
    if (_activeLineup?.formation === _formation) setActiveLineup(null);

    // remove current lineup from lineups list
    const _newLineups = [
      ...(lineups?.filter((x) => x?.formation !== _formation) || [])
        .map((x) => {
          return Object.assign({}, x);
        })
        .flat(),
    ];
    setLineups([..._newLineups]);
  };

  const changeCaptainStatusForPitchPosition = (isCaptain, pitchPosition) => {
    const _currentLineupNew = _activeLineup;

    // remove captain from current players lineup
    _currentLineupNew.players = _currentLineupNew?.players?.map((x) => {
      return { ...x, captain: false };
    });

    // find player at pitchPosition
    const foundPlayerAtPitchPosition = _currentLineupNew?.players?.find(
      (x) => x?.position === pitchPosition
    );

    // set new captain status from foundPlayer
    foundPlayerAtPitchPosition.captain = isCaptain;

    // update active lineup
    setActiveLineup(Object.assign({}, _currentLineupNew));

    // update active player captain status
    setIsActivePitchPlayerCaptain(isCaptain);

    // update current lineup in lineups list
    const _newLineups = [
      ...(lineups?.filter((x) => x?.formation !== _formation) || [])
        .map((x) => {
          return Object.assign({}, x);
        })
        .flat(),
      Object.assign({}, _currentLineupNew),
    ];
    setLineups([..._newLineups]);

    // update state values
    setIsActivePitchPlayerCaptain(false);
    setIsActivePitchPlayerAssigned(false);
    setActivePlayerFormationCodeFromPitch(null);
  };

  const handleSaveButtonClick = async () => {
    setLoading(true);

    // request body
    const payload = {
      teamId: _eventHomeTeam?.team?.id,
      formation: _formation,
      playersLineup: (() => {
        const _temp = _activeLineup?.players?.map((x) => {
          return {
            id: x?.user?.id,
            role:
              x?.position === "GK"
                ? playerRoles.GOAL_KEEPER
                : playerRoles.PLAYER,
            position: x?.position,
            captain: x?.captain,
          };
        });
        return _temp;
      })(),
    };

    // make api req
    const responseEventLineupCreate = await Events.CreateLineup(
      _event?.id,
      payload
    ).catch(() => null);

    // show error
    if (!responseEventLineupCreate) {
      showNotificationMsg("Could Not Create Lineup..!", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }

    // show success
    showNotificationMsg("Lineup Created Successfully..!", {
      variant: "success",
      displayIcon: true,
    });
    setLoading(false);

    // redirect to details page
    router.push(`/teamhub/events/${_event?.id}`);
  };

  return (
    <>
      <ConfirmDialog
        open={_resetPitch}
        setOpen={setResetPitch}
        message={`Are you sure to reset the pitch lineup for ${_formation}`}
        confirmText={"Yes"}
        onConfirm={resetPitchFormation}
        type={"danger"}
      />
      <div className={styles.eventLineupWrapper}>
        {_availablePlayers?.length > 0 && (
          <PlayersList
            availablePlayers={_availablePlayers}
            activePlayerId={_activeAvailablePlayerIdFromList}
            setActivePlayerId={handleAvailablePlayerListItemClick}
          />
        )}
        <div className={styles.eventPitchAndFormationWrappper}>
          <h1>{_eventTitle}</h1>
          <div className={styles.eventFormationsListWrapper}>
            <FormationList
              selectMode={true}
              selected={_formation}
              onFormationSet={handleFormationSet}
            />
          </div>
          <div className={styles.eventLineupPitchActionButtons}>
            <div
              className={cn(
                styles.eventPitchResetButton,
                (!_activeLineup || _activeLineup?.players?.length === 0) &&
                  styles.eventPitchResetButtonDisabled
              )}
              onClick={() => _activeLineup && setResetPitch(true)}
            >
              <ResetSVG />
              Reset
            </div>
            {_isActivePitchPlayerAssigned && (
              <div>
                <Button
                  className={styles.eventManageCaptainButton}
                  variant={!_isActivePitchPlayerCaptain ? "success" : "danger"}
                  onClick={() =>
                    changeCaptainStatusForPitchPosition(
                      !_isActivePitchPlayerCaptain ? true : false,
                      _activePlayerFormationCodeFromPitch
                    )
                  }
                >
                  {!_isActivePitchPlayerCaptain
                    ? "Set as Captain"
                    : "Remove as Captain"}
                </Button>
              </div>
            )}
          </div>
          <div className={styles.eventPitchWrapper}>
            <Pitch
              formation={_formation}
              editMode={true}
              activePlayer={_activePlayerFormationCodeFromPitch}
              onPlayerClick={handlePitchPlayerClick}
              lineup={_activeLineup?.players?.map((x) => {
                return {
                  name: x?.user?.profile?.fullName || x?.user?.id,
                  captain: x?.captain,
                  position: x?.position,
                };
              })}
            />
          </div>
          <div className={styles.eventLineupFormActionButton}>
            <Link href={`/teamhub/events/${_event?.id}`}>
              <a>
                <Button variant="transparent">Cancel</Button>
              </a>
            </Link>
            <Button loading={_loading} onClick={handleSaveButtonClick}>
              Save
            </Button>
          </div>
        </div>
        {_unAvailablePlayers?.length > 0 && (
          <PlayersList unAvailablePlayers={_unAvailablePlayers} />
        )}
      </div>
    </>
  );
}

export default LineupCreate;
