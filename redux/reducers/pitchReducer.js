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
    SET_CAPTAIN_HOME451
} from "../actions/action-types/pitchActionTypes";

const initialStates = {
    // players: [],
    availPlayers: [
        {
            id: 1,
            player: 'Alex Willis',
            availability: 'available',
            position: 'Forward',
            date: '12/01/2021'
        },
        {
            id: 2,
            player: 'Tyler Lynch',
            availability: 'available',
            position: 'Forward',
            date: '12/01/2021'
        },
        {
            id: 3,
            player: 'Chris Barrett',
            availability: 'available',
            position: 'Defender',
            date: '12/01/2021'
        },
        {
            id: 4,
            player: 'Roy Elliot',
            availability: 'available',
            position: 'Midfield',
            date: '12/01/2021'
        },
        {
            id: 5,
            player: 'Aaron Hudson',
            availability: 'available',
            position: 'Midfield',
            date: '12/01/2021'
        },
        {
            id: 6,
            player: 'Chad Boyd',
            availability: 'available',
            position: 'Midfield',
            date: '12/01/2021'
        },
        {
            id: 7,
            player: 'Harry Carter',
            availability: 'available',
            position: 'Defender',
            date: '12/01/2021'
        },
        {
            id: 8,
            player: 'James Matthews',
            availability: 'available',
            position: 'Forward',
            date: '12/01/2021'
        },
        {
            id: 9,
            player: 'Ronnie Ellis',
            availability: 'available',
            position: 'Defender',
            date: '12/01/2021'
        },
        {
            id: 10,
            player: 'George Best',
            availability: 'available',
            position: 'Goalkeeper',
            date: '12/01/2021'
        },
        {
            id: 11,
            player: 'Bobby O’Neil',
            availability: 'available',
            position: 'Midfield',
            date: '12/01/2021'
        },
    ],
    unavailPlayers: [
        {
            id: 12,
            player: 'Roy Pierce',
            availability: 'unavailable',
            position: 'Defender',
            date: '12/01/2021'
        },
        {
            id: 13,
            player: 'Patrick James',
            availability: 'unavailable',
            position: 'Defender',
            date: '12/01/2021'
        },
        {
            id: 14,
            player: 'Harry Henderson',
            availability: 'unavailable',
            position: 'Defender',
            date: '12/01/2021'
        },
        {
            id: 15,
            player: 'Tom Ford',
            availability: 'unavailable',
            position: 'Goalkeeper',
            date: '12/01/2021'
        },
        {
            id: 16,
            player: 'Joss Moss',
            availability: 'unavailable',
            position: 'Forward',
            date: '12/01/2021'
        },
        {
            id: 17,
            player: 'Ian Wright',
            availability: 'unavailable',
            position: 'Midfield',
            date: '12/01/2021'
        },
        {
            id: 18,
            player: 'Peter Grant',
            availability: 'unavailable',
            position: 'Defender',
            date: '12/01/2021'
        },
    ],
    activeKit: {kit: 'home'},
    colorHomePlayers: { colorHomePlayers: '#e7ba19'},
    colorHomeGoalkeeper: {colorHomeGoalkeeper: '#ff000b'},
    colorAwayPlayers: {colorAwayPlayers: '#e7ba19'},
    colorAwayGoalkeeper: {colorAwayGoalkeeper: '#ff000b'},
    selectFigName: {id: '', name: ''},
    activePlayer: {id: '', player: 'nonactive'},
    playerInfoHome442: [
        {
            id: '1-1-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-1-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-2-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-2-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-2-3',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-2-4',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-3-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-3-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-3-3',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-3-4',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-4-1',
            name: '',
            isCaptain: false,
        },
    ],
    playerInfoHome433: [
        {
            id: '2-1-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-1-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-1-3',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-2-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-2-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-2-3',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-3-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-3-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-3-3',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-3-4',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-4-1',
            name: '',
            isCaptain: false,
        },
    ],
    playerInfoHome451: [
        {
            id: '3-1-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-2-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-2-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-2-3',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-2-4',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-2-5',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-3-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-3-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-3-3',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-3-4',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-4-1',
            name: '',
            isCaptain: false,
        },
    ],
    playerInfoAway442: [
        {
            id: '1-1-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-1-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-2-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-2-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-2-3',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-2-4',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-3-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-3-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-3-3',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-3-4',
            name: '',
            isCaptain: false,
        },
        {
            id: '1-4-1',
            name: '',
            isCaptain: false,
        },
    ],
    playerInfoAway433: [
        {
            id: '2-1-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-1-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-1-3',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-2-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-2-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-2-3',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-3-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-3-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-3-3',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-3-4',
            name: '',
            isCaptain: false,
        },
        {
            id: '2-4-1',
            name: '',
            isCaptain: false,
        },
    ],
    playerInfoAway451: [
        {
            id: '3-1-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-2-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-2-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-2-3',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-2-4',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-2-5',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-3-1',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-3-2',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-3-3',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-3-4',
            name: '',
            isCaptain: false,
        },
        {
            id: '3-4-1',
            name: '',
            isCaptain: false,
        },
    ],
}

const pitchReducer = (state = initialStates, action) => {
    switch (action.type) {
        // case GET_AVAILABLE_PLAYERS:
        //     const availPlayers = state.players.filter((item) => item.availability === action.payload);
        //
        //     return {
        //         ...state,
        //         availPlayers: availPlayers ,
        //     };
        // case GET_UNAVAILABLE_PLAYERS:
        //     const unavailPlayers = state.players.filter((item) => item.availability === action.payload);
        //
        //     return {
        //         ...state,
        //         unavailPlayers: unavailPlayers,
        //     };
        case SELECT_ACTIVE_KIT:
            return {
                ...state,
                activeKit: {kit: action.payload}
            }
        case ADD_COLOR_HOME_PLAYERS:

            return{
                ...state,
                colorHomePlayers: {colorHomePlayers: action.payload}
            };
        case ADD_COLOR_HOME_GOALKEEPER:
            return{
                ...state,
                colorHomeGoalkeeper: {colorHomeGoalkeeper: action.payload}
            }
        case ADD_COLOR_AWAY_PLAYERS:
            return{
                ...state,
                colorAwayPlayers: {colorAwayPlayers: action.payload}
            };
        case ADD_COLOR_AWAY_GOALKEEPER:
            return{
                ...state,
                colorAwayGoalkeeper: {colorAwayGoalkeeper: action.payload}
            }
        case SELECT_FIG_FOR_NAMING:
            const figID = action.id;
            const updateFigID = Object.assign({}, state.selectFigName, {id: figID})
            return {
                ...state,
                selectFigName: updateFigID
            };
        case SET_ACTIVE_PLAYER:
            return {
                ...state,
                activePlayer: action.payload
            }
        case DELETE_ACTIVE_PLAYER:
            return{
                ...state,
                activePlayer: action.payload
            }
        case ADD_NAME_HOME_LINEUP442:
            const namePlayerHome442 = state.availPlayers.find(item => item.id === action.payload);
            const updateFigNameHome442 = Object.assign({}, state.selectFigName, {name: namePlayerHome442.player});

            const itemPlayerInfoHome442 = state.playerInfoHome442.find(item => item.id === updateFigNameHome442.id);

            const updatePlayerInfoHome442 = Object.assign({}, itemPlayerInfoHome442, updateFigNameHome442);

            if(updateFigNameHome442.name.length === 0 || updateFigNameHome442.id === 0) {
                return {
                    ...state,
                }
            } else {
                const addedNameLineupHome442 = state.playerInfoHome442.map((elem) => {
                    if(elem.id === updatePlayerInfoHome442.id) {
                        return updatePlayerInfoHome442
                    }
                    return elem
                })
                return {
                    ...state,
                    selectFigName: updateFigNameHome442,
                    playerInfoHome442: addedNameLineupHome442
                }
            }
        case ADD_NAME_HOME_LINEUP433:
            const namePlayerHome433 = state.availPlayers.find(item => item.id === action.payload);
            const updateFigNameHome433 = Object.assign({}, state.selectFigName, {name: namePlayerHome433.player});

            const itemPlayerInfoHome433 = state.playerInfoHome433.find(item => item.id === updateFigNameHome433.id);

            const updatePlayerInfoHome433 = Object.assign({}, itemPlayerInfoHome433, updateFigNameHome433);

            if(updateFigNameHome433.name.length === 0 || updateFigNameHome433.id === 0) {
                return {
                    ...state,
                }
            } else {
                const addedNameLineupHome433 = state.playerInfoHome433.map((elem) => {
                    if(elem.id === updatePlayerInfoHome433.id) {
                        return updatePlayerInfoHome433
                    }
                    return elem
                })
                return {
                    ...state,
                    selectFigName: updateFigNameHome433,
                    playerInfoHome433: addedNameLineupHome433
                }
            }
        case ADD_NAME_HOME_LINEUP451:
            const namePlayerHome451 = state.availPlayers.find(item => item.id === action.payload);
            const updateFigNameHome451 = Object.assign({}, state.selectFigName, {name: namePlayerHome451.player});

            const itemPlayerInfoHome451 = state.playerInfoHome451.find(item => item.id === updateFigNameHome451.id);

            const updatePlayerInfoHome451 = Object.assign({}, itemPlayerInfoHome451, updateFigNameHome451);

            if(updateFigNameHome451.name.length === 0 || updateFigNameHome451.id === 0) {
                return {
                    ...state,
                }
            } else {
                const addedNameLineupHome451 = state.playerInfoHome451.map((elem) => {
                    if(elem.id === updatePlayerInfoHome451.id) {
                        return updatePlayerInfoHome451
                    }
                    return elem
                })
                return {
                    ...state,
                    selectFigName: updateFigNameHome451,
                    playerInfoHome451: addedNameLineupHome451
                }
            }
        case ADD_NAME_AWAY_LINEUP442:
            const namePlayerAway442 = state.availPlayers.find(item => item.id === action.payload);
            const updateFigNameAway442 = Object.assign({}, state.selectFigName, {name: namePlayerAway442.player});

            const itemPlayerInfoAway442 = state.playerInfoAway442.find(item => item.id === updateFigNameAway442.id);

            const updatePlayerInfoAway442 = Object.assign({}, itemPlayerInfoAway442, updateFigNameAway442);

            if(updateFigNameAway442.name.length === 0 || updateFigNameAway442.id === 0) {
                return {
                    ...state,
                }
            } else {
                const addedNameLineupAway442 = state.playerInfoAway442.map((elem) => {
                    if(elem.id === updatePlayerInfoAway442.id) {
                        return updatePlayerInfoAway442
                    }
                    return elem
                })
                return {
                    ...state,
                    selectFigName: updateFigNameAway442,
                    playerInfoAway442: addedNameLineupAway442
                }
            }
        case ADD_NAME_AWAY_LINEUP433:
            const namePlayerAway433 = state.availPlayers.find(item => item.id === action.payload);
            const updateFigNameAway433 = Object.assign({}, state.selectFigName, {name: namePlayerAway433.player});

            const itemPlayerInfoAway433 = state.playerInfoAway433.find(item => item.id === updateFigNameAway433.id);

            const updatePlayerInfoAway433 = Object.assign({}, itemPlayerInfoAway433, updateFigNameAway433);

            if(updateFigNameAway433.name.length === 0 || updateFigNameAway433.id === 0) {
                return {
                    ...state,
                }
            } else {
                const addedNameLineupAway433 = state.playerInfoAway433.map((elem) => {
                    if(elem.id === updatePlayerInfoAway433.id) {
                        return updatePlayerInfoAway433
                    }
                    return elem
                })
                return {
                    ...state,
                    selectFigName: updateFigNameAway433,
                    playerInfoAway433: addedNameLineupAway433
                }
            }
        case ADD_NAME_AWAY_LINEUP451:
            const namePlayerAway451 = state.availPlayers.find(item => item.id === action.payload);
            const updateFigNameAway451 = Object.assign({}, state.selectFigName, {name: namePlayerAway451.player});
            const itemPlayerInfoAway451 = state.playerInfoAway451.find(item => item.id === updateFigNameAway451.id);
            const updatePlayerInfoAway451 = Object.assign({}, itemPlayerInfoAway451, updateFigNameAway451);
            if(updateFigNameAway451.name.length === 0 || updateFigNameAway451.id === 0) {
                return {
                    ...state,
                }
            } else {
                const addedNameLineupAway451 = state.playerInfoAway451.map((elem) => {
                    if(elem.id === updatePlayerInfoAway451.id) {
                        return updatePlayerInfoAway451
                    }
                    return elem
                })
                return {
                    ...state,
                    selectFigName: updateFigNameAway451,
                    playerInfoAway451: addedNameLineupAway451
                }
            }
        case SET_CAPTAIN_HOME442:
            const playersWithoutCap442 = state.playerInfoHome442.map(elem => {
                return Object.assign({}, elem, {isCaptain: false});
            });
            const itemPlayerHome442 = playersWithoutCap442.find(item => item.id === action.id);
            const updateItem442 = Object.assign({}, itemPlayerHome442, {isCaptain: true});
            const setupCaptain442 = playersWithoutCap442.map(elem => {
                if(elem.id === updateItem442.id) {
                    return updateItem442
                } else {
                    return elem
                }
            })

            return {
                ...state,
                playerInfoHome442: setupCaptain442
            }
        case SET_CAPTAIN_HOME433:
            const playersWithoutCap433 = state.playerInfoHome433.map(elem => {
                return Object.assign({}, elem, {isCaptain: false});
            });
            const itemPlayerHome433 = playersWithoutCap433.find(item => item.id === action.id);
            const updateItem433 = Object.assign({}, itemPlayerHome433, {isCaptain: true});
            const setupCaptain433 = playersWithoutCap433.map(elem => {
                if(elem.id === updateItem433.id) {
                    return updateItem433
                } else {
                    return elem
                }
            })

            return {
                ...state,
                playerInfoHome433: setupCaptain433
            }
        case SET_CAPTAIN_HOME451:
            const playersWithoutCap451 = state.playerInfoHome451.map(elem => {
                return Object.assign({}, elem, {isCaptain: false});
            });
            const itemPlayerHome451 = playersWithoutCap451.find(item => item.id === action.id);
            const updateItem451 = Object.assign({}, itemPlayerHome451, {isCaptain: true});
            const setupCaptain451 = playersWithoutCap451.map(elem => {
                if(elem.id === updateItem451.id) {
                    return updateItem451
                } else {
                    return elem
                }
            })

            return {
                ...state,
                playerInfoHome451: setupCaptain451
            }
        case SET_CAPTAIN_AWAY442:
            const playersAwayWithoutCap442 = state.playerInfoAway442.map(elem => {
                return Object.assign({}, elem, {isCaptain: false});
            });
            const itemPlayerAway442 = playersAwayWithoutCap442.find(item => item.id === action.id);
            const updateItemAway442 = Object.assign({}, itemPlayerAway442, {isCaptain: true});
            const setupCaptainAway442 = playersAwayWithoutCap442.map(elem => {
                if(elem.id === updateItemAway442.id) {
                    return updateItemAway442
                } else {
                    return elem
                }
            })
            return {
                ...state,
                playerInfoAway442: setupCaptainAway442
            }
        case SET_CAPTAIN_AWAY433:
            const playersAwayWithoutCap433 = state.playerInfoAway433.map(elem => {
                return Object.assign({}, elem, {isCaptain: false});
            });
            const itemPlayerAway433 = playersAwayWithoutCap433.find(item => item.id === action.id);
            const updateItemAway433 = Object.assign({}, itemPlayerAway433, {isCaptain: true});
            const setupCaptainAway433 = playersAwayWithoutCap433.map(elem => {
                if(elem.id === updateItemAway433.id) {
                    return updateItemAway433
                } else {
                    return elem
                }
            })
            return {
                ...state,
                playerInfoAway433: setupCaptainAway433
            }
        case SET_CAPTAIN_AWAY451:
            const playersAwayWithoutCap451 = state.playerInfoAway451.map(elem => {
                return Object.assign({}, elem, {isCaptain: false});
            });
            const itemPlayerAway451 = playersAwayWithoutCap451.find(item => item.id === action.id);
            const updateItemAway451 = Object.assign({}, itemPlayerAway451, {isCaptain: true});
            const setupCaptainAway451 = playersAwayWithoutCap451.map(elem => {
                if(elem.id === updateItemAway451.id) {
                    return updateItemAway451
                } else {
                    return elem
                }
            })
            return {
                ...state,
                playerInfoAway451: setupCaptainAway451
            }
        default:
            return state;

    }
};
export default pitchReducer;
