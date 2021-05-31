import { createSlice } from "@reduxjs/toolkit";

export const pitchSlice = createSlice({
  name: "pitch",
  initialState: {
    activeKit: { kit: "home" },
    colorHomePlayers: { colorHomePlayers: "#e7ba19" },
    colorHomeGoalkeeper: { colorHomeGoalkeeper: "#ff000b" },
    colorAwayPlayers: { colorAwayPlayers: "#e7ba19" },
    colorAwayGoalkeeper: { colorAwayGoalkeeper: "#ff000b" },
    selectFigName: { id: "", name: "" },
    activePlayer: { id: "", player: "nonactive" },
    availPlayers: [
      {
        id: 1,
        player: "Alex Willis",
        availability: "available",
        position: "Forward",
        date: "12/01/2021",
      },
      {
        id: 2,
        player: "Tyler Lynch",
        availability: "available",
        position: "Forward",
        date: "12/01/2021",
      },
      {
        id: 3,
        player: "Chris Barrett",
        availability: "available",
        position: "Defender",
        date: "12/01/2021",
      },
      {
        id: 4,
        player: "Roy Elliot",
        availability: "available",
        position: "Midfield",
        date: "12/01/2021",
      },
      {
        id: 5,
        player: "Aaron Hudson",
        availability: "available",
        position: "Midfield",
        date: "12/01/2021",
      },
      {
        id: 6,
        player: "Chad Boyd",
        availability: "available",
        position: "Midfield",
        date: "12/01/2021",
      },
      {
        id: 7,
        player: "Harry Carter",
        availability: "available",
        position: "Defender",
        date: "12/01/2021",
      },
      {
        id: 8,
        player: "James Matthews",
        availability: "available",
        position: "Forward",
        date: "12/01/2021",
      },
      {
        id: 9,
        player: "Ronnie Ellis",
        availability: "available",
        position: "Defender",
        date: "12/01/2021",
      },
      {
        id: 10,
        player: "George Best",
        availability: "available",
        position: "Goalkeeper",
        date: "12/01/2021",
      },
      {
        id: 11,
        player: "Bobby O’Neil",
        availability: "available",
        position: "Midfield",
        date: "12/01/2021",
      },
    ],
    unavailPlayers: [
      {
        id: 12,
        player: "Roy Pierce",
        availability: "unavailable",
        position: "Defender",
        date: "12/01/2021",
      },
      {
        id: 13,
        player: "Patrick James",
        availability: "unavailable",
        position: "Defender",
        date: "12/01/2021",
      },
      {
        id: 14,
        player: "Harry Henderson",
        availability: "unavailable",
        position: "Defender",
        date: "12/01/2021",
      },
      {
        id: 15,
        player: "Tom Ford",
        availability: "unavailable",
        position: "Goalkeeper",
        date: "12/01/2021",
      },
      {
        id: 16,
        player: "Joss Moss",
        availability: "unavailable",
        position: "Forward",
        date: "12/01/2021",
      },
      {
        id: 17,
        player: "Ian Wright",
        availability: "unavailable",
        position: "Midfield",
        date: "12/01/2021",
      },
      {
        id: 18,
        player: "Peter Grant",
        availability: "unavailable",
        position: "Defender",
        date: "12/01/2021",
      },
    ],
    playerInfoHome442: [
      {
        id: "1-1-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-1-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-2-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-2-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-2-3",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-2-4",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-3-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-3-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-3-3",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-3-4",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-4-1",
        name: "",
        isCaptain: false,
      },
    ],
    playerInfoHome433: [
      {
        id: "2-1-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-1-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-1-3",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-2-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-2-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-2-3",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-3-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-3-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-3-3",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-3-4",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-4-1",
        name: "",
        isCaptain: false,
      },
    ],
    playerInfoHome451: [
      {
        id: "3-1-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-2-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-2-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-2-3",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-2-4",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-2-5",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-3-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-3-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-3-3",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-3-4",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-4-1",
        name: "",
        isCaptain: false,
      },
    ],
    playerInfoAway442: [
      {
        id: "1-1-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-1-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-2-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-2-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-2-3",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-2-4",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-3-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-3-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-3-3",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-3-4",
        name: "",
        isCaptain: false,
      },
      {
        id: "1-4-1",
        name: "",
        isCaptain: false,
      },
    ],
    playerInfoAway433: [
      {
        id: "2-1-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-1-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-1-3",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-2-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-2-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-2-3",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-3-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-3-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-3-3",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-3-4",
        name: "",
        isCaptain: false,
      },
      {
        id: "2-4-1",
        name: "",
        isCaptain: false,
      },
    ],
    playerInfoAway451: [
      {
        id: "3-1-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-2-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-2-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-2-3",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-2-4",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-2-5",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-3-1",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-3-2",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-3-3",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-3-4",
        name: "",
        isCaptain: false,
      },
      {
        id: "3-4-1",
        name: "",
        isCaptain: false,
      },
    ],
  },
  reducers: {
    getAvailPlayers: (state, { payload }) => {},
    getUnavailPlayers: (state, { payload }) => {},
    addColorHomePlayers: (state, { payload }) => {
      state.colorHomePlayers = { colorHomePlayers: payload.color };
    },
    addColorHomeGoalkeeper: (state, { payload }) => {
      state.colorHomeGoalkeeper = { colorHomeGoalkeeper: payload.color };
    },
    addColorAwayPlayers: (state, { payload }) => {
      state.colorAwayPlayers = { colorAwayPlayers: payload.color };
    },
    addColorAwayGoalkeeper: (state, { payload }) => {
      state.colorAwayGoalkeeper = { colorAwayGoalkeeper: payload.color };
    },
    selectActiveKit: (state, { payload }) => {
      state.activeKit = { kit: payload.activeKit };
    },
    setActivePlayer: (state, { payload }) => {
      state.activePlayer = payload.activePlayer;
    },
    deleteActivePlayer: (state, { payload }) => {
      state.activePlayer = payload.nonActivePlayer;
    },
    selectFigForNaming: (state, { payload }) => {
      const figID = payload.figId;
      const updateFigID = Object.assign({}, state.selectFigName, { id: figID });
      state.selectFigName = updateFigID;
    },
    addNameHomeLineUp442: (state, { payload }) => {
      const namePlayerHome442 = state.availPlayers.find(
        (item) => item.id === payload.playerNameId
      );
      const updateFigNameHome442 = Object.assign({}, state.selectFigName, {
        name: namePlayerHome442.player,
      });
      const itemPlayerInfoHome442 = state.playerInfoHome442.find(
        (item) => item.id === updateFigNameHome442.id
      );
      const updatePlayerInfoHome442 = Object.assign(
        {},
        itemPlayerInfoHome442,
        updateFigNameHome442
      );

      if (
        updateFigNameHome442.name.length !== 0 ||
        updateFigNameHome442.id !== 0
      ) {
        const addedNameLineupHome442 = state.playerInfoHome442.map((elem) => {
          if (elem.id === updatePlayerInfoHome442.id) {
            return updatePlayerInfoHome442;
          }
          return elem;
        });

        state.selectFigName = updateFigNameHome442;
        state.playerInfoHome442 = addedNameLineupHome442;
      }
    },
    addNameHomeLineUp433: (state, { payload }) => {
      const namePlayerHome433 = state.availPlayers.find(
        (item) => item.id === payload.playerNameId
      );
      const updateFigNameHome433 = Object.assign({}, state.selectFigName, {
        name: namePlayerHome433.player,
      });

      const itemPlayerInfoHome433 = state.playerInfoHome433.find(
        (item) => item.id === updateFigNameHome433.id
      );

      const updatePlayerInfoHome433 = Object.assign(
        {},
        itemPlayerInfoHome433,
        updateFigNameHome433
      );

      if (
        updateFigNameHome433.name.length !== 0 ||
        updateFigNameHome433.id !== 0
      ) {
        const addedNameLineupHome433 = state.playerInfoHome433.map((elem) => {
          if (elem.id === updatePlayerInfoHome433.id) {
            return updatePlayerInfoHome433;
          }
          return elem;
        });
        state.selectFigName = updateFigNameHome433;
        state.playerInfoHome433 = addedNameLineupHome433;
      }
    },
    addNameHomeLineUp451: (state, { payload }) => {
      const namePlayerHome451 = state.availPlayers.find(
        (item) => item.id === payload.playerNameId
      );
      const updateFigNameHome451 = Object.assign({}, state.selectFigName, {
        name: namePlayerHome451.player,
      });

      const itemPlayerInfoHome451 = state.playerInfoHome451.find(
        (item) => item.id === updateFigNameHome451.id
      );

      const updatePlayerInfoHome451 = Object.assign(
        {},
        itemPlayerInfoHome451,
        updateFigNameHome451
      );

      if (
        updateFigNameHome451.name.length !== 0 ||
        updateFigNameHome451.id !== 0
      ) {
        const addedNameLineupHome451 = state.playerInfoHome451.map((elem) => {
          if (elem.id === updatePlayerInfoHome451.id) {
            return updatePlayerInfoHome451;
          }
          return elem;
        });
        state.selectFigName = updateFigNameHome451;
        state.playerInfoHome451 = addedNameLineupHome451;
      }
    },
    addNameAwayLineUp442: (state, { payload }) => {
      const namePlayerAway442 = state.availPlayers.find(
        (item) => item.id === payload.playerNameId
      );
      const updateFigNameAway442 = Object.assign({}, state.selectFigName, {
        name: namePlayerAway442.player,
      });

      const itemPlayerInfoAway442 = state.playerInfoAway442.find(
        (item) => item.id === updateFigNameAway442.id
      );

      const updatePlayerInfoAway442 = Object.assign(
        {},
        itemPlayerInfoAway442,
        updateFigNameAway442
      );

      if (
        updateFigNameAway442.name.length !== 0 ||
        updateFigNameAway442.id !== 0
      ) {
        const addedNameLineupAway442 = state.playerInfoAway442.map((elem) => {
          if (elem.id === updatePlayerInfoAway442.id) {
            return updatePlayerInfoAway442;
          }
          return elem;
        });
        state.selectFigName = updateFigNameAway442;
        state.playerInfoAway442 = addedNameLineupAway442;
      }
    },
    addNameAwayLineUp433: (state, { payload }) => {
      const namePlayerAway433 = state.availPlayers.find(
        (item) => item.id === payload.playerNameId
      );
      const updateFigNameAway433 = Object.assign({}, state.selectFigName, {
        name: namePlayerAway433.player,
      });

      const itemPlayerInfoAway433 = state.playerInfoAway433.find(
        (item) => item.id === updateFigNameAway433.id
      );

      const updatePlayerInfoAway433 = Object.assign(
        {},
        itemPlayerInfoAway433,
        updateFigNameAway433
      );

      if (
        updateFigNameAway433.name.length !== 0 ||
        updateFigNameAway433.id !== 0
      ) {
        const addedNameLineupAway433 = state.playerInfoAway433.map((elem) => {
          if (elem.id === updatePlayerInfoAway433.id) {
            return updatePlayerInfoAway433;
          }
          return elem;
        });
        state.selectFigName = updateFigNameAway433;
        state.playerInfoAway433 = addedNameLineupAway433;
      }
    },
    addNameAwayLineUp451: (state, { payload }) => {
      const namePlayerAway451 = state.availPlayers.find(
        (item) => item.id === payload.playerNameId
      );
      const updateFigNameAway451 = Object.assign({}, state.selectFigName, {
        name: namePlayerAway451.player,
      });
      const itemPlayerInfoAway451 = state.playerInfoAway451.find(
        (item) => item.id === updateFigNameAway451.id
      );
      const updatePlayerInfoAway451 = Object.assign(
        {},
        itemPlayerInfoAway451,
        updateFigNameAway451
      );
      if (
        updateFigNameAway451.name.length !== 0 ||
        updateFigNameAway451.id !== 0
      ) {
        const addedNameLineupAway451 = state.playerInfoAway451.map((elem) => {
          if (elem.id === updatePlayerInfoAway451.id) {
            return updatePlayerInfoAway451;
          }
          return elem;
        });
        state.selectFigName = updateFigNameAway451;
        state.playerInfoAway451 = addedNameLineupAway451;
      }
    },
    setCaptainHome442: (state, { payload }) => {
      const playersWithoutCap442 = state.playerInfoHome442.map((elem) => {
        return Object.assign({}, elem, { isCaptain: false });
      });
      const itemPlayerHome442 = playersWithoutCap442.find(
        (item) => item.id === payload.figId
      );
      const updateItem442 = Object.assign({}, itemPlayerHome442, {
        isCaptain: true,
      });
      const setupCaptain442 = playersWithoutCap442.map((elem) => {
        if (elem.id === updateItem442.id) {
          return updateItem442;
        } else {
          return elem;
        }
      });
      state.playerInfoHome442 = setupCaptain442;
    },
    setCaptainHome433: (state, { payload }) => {
      const playersWithoutCap433 = state.playerInfoHome433.map((elem) => {
        return Object.assign({}, elem, { isCaptain: false });
      });
      const itemPlayerHome433 = playersWithoutCap433.find(
        (item) => item.id === payload.figId
      );
      const updateItem433 = Object.assign({}, itemPlayerHome433, {
        isCaptain: true,
      });
      const setupCaptain433 = playersWithoutCap433.map((elem) => {
        if (elem.id === updateItem433.id) {
          return updateItem433;
        } else {
          return elem;
        }
      });

      state.playerInfoHome433 = setupCaptain433;
    },
    setCaptainHome451: (state, { payload }) => {
      const playersWithoutCap451 = state.playerInfoHome451.map((elem) => {
        return Object.assign({}, elem, { isCaptain: false });
      });
      const itemPlayerHome451 = playersWithoutCap451.find(
        (item) => item.id === payload.figId
      );
      const updateItem451 = Object.assign({}, itemPlayerHome451, {
        isCaptain: true,
      });
      const setupCaptain451 = playersWithoutCap451.map((elem) => {
        if (elem.id === updateItem451.id) {
          return updateItem451;
        } else {
          return elem;
        }
      });

      state.playerInfoHome451 = setupCaptain451;
    },
    setCaptainAway442: (state, { payload }) => {
      const playersAwayWithoutCap442 = state.playerInfoAway442.map((elem) => {
        return Object.assign({}, elem, { isCaptain: false });
      });
      const itemPlayerAway442 = playersAwayWithoutCap442.find(
        (item) => item.id === payload.figId
      );
      const updateItemAway442 = Object.assign({}, itemPlayerAway442, {
        isCaptain: true,
      });
      const setupCaptainAway442 = playersAwayWithoutCap442.map((elem) => {
        if (elem.id === updateItemAway442.id) {
          return updateItemAway442;
        } else {
          return elem;
        }
      });
      state.playerInfoAway442 = setupCaptainAway442;
    },
    setCaptainAway433: (state, { payload }) => {
      const playersAwayWithoutCap433 = state.playerInfoAway433.map((elem) => {
        return Object.assign({}, elem, { isCaptain: false });
      });
      const itemPlayerAway433 = playersAwayWithoutCap433.find(
        (item) => item.id === payload.figId
      );
      const updateItemAway433 = Object.assign({}, itemPlayerAway433, {
        isCaptain: true,
      });
      const setupCaptainAway433 = playersAwayWithoutCap433.map((elem) => {
        if (elem.id === updateItemAway433.id) {
          return updateItemAway433;
        } else {
          return elem;
        }
      });
      state.playerInfoAway433 = setupCaptainAway433;
    },
    setCaptainAway451: (state, { payload }) => {
      const playersAwayWithoutCap451 = state.playerInfoAway451.map((elem) => {
        return Object.assign({}, elem, { isCaptain: false });
      });
      const itemPlayerAway451 = playersAwayWithoutCap451.find(
        (item) => item.id === payload.figId
      );
      const updateItemAway451 = Object.assign({}, itemPlayerAway451, {
        isCaptain: true,
      });
      const setupCaptainAway451 = playersAwayWithoutCap451.map((elem) => {
        if (elem.id === updateItemAway451.id) {
          return updateItemAway451;
        } else {
          return elem;
        }
      });
      state.playerInfoAway451 = setupCaptainAway451;
    },
  },
});

export const {
  getUnavailPlayers,
  addColorHomePlayers,
  addColorHomeGoalkeeper,
  addColorAwayPlayers,
  addColorAwayGoalkeeper,
  selectActiveKit,
  selectFigForNaming,
  setActivePlayer,
  deleteActivePlayer,
  addNameHomeLineUp442,
  addNameHomeLineUp433,
  addNameHomeLineUp451,
  addNameAwayLineUp442,
  addNameAwayLineUp433,
  addNameAwayLineUp451,
  setCaptainHome442,
  setCaptainHome433,
  setCaptainHome451,
  setCaptainAway442,
  setCaptainAway433,
  setCaptainAway451,
} = pitchSlice.actions;

export default pitchSlice.reducer;
