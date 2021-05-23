import {
    ADD_COLOR_AWAY_GOALKEEPER,
    ADD_COLOR_AWAY_PLAYERS,
    ADD_COLOR_HOME_GOALKEEPER,
    ADD_COLOR_HOME_PLAYERS,
    ADD_NAME_AWAY_LINEUP433,
    ADD_NAME_AWAY_LINEUP442,
    ADD_NAME_AWAY_LINEUP451,
    ADD_NAME_HOME_LINEUP433,
    ADD_NAME_HOME_LINEUP442,
    ADD_NAME_HOME_LINEUP451,
    DELETE_ACTIVE_PLAYER,
    GET_AVAILABLE_PLAYERS,
    GET_UNAVAILABLE_PLAYERS,
    SELECT_ACTIVE_KIT,
    SELECT_FIG_FOR_NAMING,
    SET_ACTIVE_PLAYER,
    SET_CAPTAIN_AWAY433,
    SET_CAPTAIN_AWAY442,
    SET_CAPTAIN_AWAY451,
    SET_CAPTAIN_HOME433,
    SET_CAPTAIN_HOME442,
    SET_CAPTAIN_HOME451,
} from './action-types/pitchActionTypes';

export const getAvailPlayers = ({availability}) => ({
    type: GET_AVAILABLE_PLAYERS,
    payload: availability
});
export const getUnavailPlayers = ({availability}) => ({
    type: GET_UNAVAILABLE_PLAYERS,
    payload: availability
});
export const addColorHomePlayers = ({color}) => ({
    type: ADD_COLOR_HOME_PLAYERS,
    payload: color
})
export const addColorHomeGoalkeeper = ({color}) => ({
    type: ADD_COLOR_HOME_GOALKEEPER,
    payload: color
})
export const addColorAwayPlayers = ({color}) => ({
    type: ADD_COLOR_AWAY_PLAYERS,
    payload: color
})
export const addColorAwayGoalkeeper = ({color}) => ({
    type: ADD_COLOR_AWAY_GOALKEEPER,
    payload: color
});
export const selectActiveKit = ({activeKit}) => ({
    type: SELECT_ACTIVE_KIT,
    payload: activeKit
})
export const selectFigForNaming = ({figId}) => ({
    type: SELECT_FIG_FOR_NAMING,
    id: figId
});
export const setActivePlayer = ({activePlayer}) => ({
    type: SET_ACTIVE_PLAYER,
    payload: activePlayer
})
export const deleteActivePlayer = ({nonActivePlayer}) => ({
    type: DELETE_ACTIVE_PLAYER,
    payload: nonActivePlayer
})
export const addNameHomeLineUp442 = ({playerNameId}) => ({
    type: ADD_NAME_HOME_LINEUP442,
    payload: playerNameId
});
export const addNameHomeLineUp433 = ({playerNameId}) => ({
    type: ADD_NAME_HOME_LINEUP433,
    payload: playerNameId
});
export const addNameHomeLineUp451 = ({playerNameId}) => ({
    type: ADD_NAME_HOME_LINEUP451,
    payload: playerNameId
});
export const addNameAwayLineUp442 = ({playerNameId}) => ({
    type: ADD_NAME_AWAY_LINEUP442,
    payload: playerNameId
});
export const addNameAwayLineUp433 = ({playerNameId}) => ({
    type: ADD_NAME_AWAY_LINEUP433,
    payload: playerNameId
});
export const addNameAwayLineUp451 = ({playerNameId}) => ({
    type: ADD_NAME_AWAY_LINEUP451,
    payload: playerNameId
});
export const setCaptainHome442 = ({figId}) => ({
    type: SET_CAPTAIN_HOME442,
    id: figId
})
export const setCaptainHome433 = ({figId}) => ({
    type: SET_CAPTAIN_HOME433,
    id: figId
})
export const setCaptainHome451 = ({figId}) => ({
    type: SET_CAPTAIN_HOME451,
    id: figId
})
export const setCaptainAway442 = ({figId}) => ({
    type: SET_CAPTAIN_AWAY442,
    id: figId
})
export const setCaptainAway433 = ({figId}) => ({
    type: SET_CAPTAIN_AWAY433,
    id: figId
})
export const setCaptainAway451 = ({figId}) => ({
    type: SET_CAPTAIN_AWAY451,
    id: figId
})
