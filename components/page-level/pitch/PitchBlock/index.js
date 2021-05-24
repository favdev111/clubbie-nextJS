import React, { useState } from "react";
import styles from "./pitchBlock.module.css";
import Top from "./Top";
import { useDispatch, useSelector } from "react-redux";
import {
  addColorAwayGoalkeeper,
  addColorAwayPlayers,
  addColorHomeGoalkeeper,
  addColorHomePlayers,
  addNameAwayLineUp433,
  addNameAwayLineUp442,
  addNameAwayLineUp451,
  addNameHomeLineUp433,
  addNameHomeLineUp442,
  addNameHomeLineUp451,
  deleteActivePlayer,
  getAvailPlayers,
  getUnavailPlayers,
  selectActiveKit,
} from "@redux/actions/pitchActions";
import Navigation from "./navigation";
import ColorPlayersModal from "@sub/modal/color-players";
import PitchCore from "./PitchCore";
import ColorGoalKModal from "@sub/modal/color-goalkeeper";

const PitchBlock = () => {
  const [activeHomeKit, setActiveHomeKit] = useState(true);
  const [activeAwayKit, setActiveAwayKit] = useState(false);

  const [lineUp, setLineUp] = useState("4-4-2");
  const [modalPlayers, setModalPlayers] = useState(false);
  const [modalGK, setModalGK] = useState(false);
  const [selectColor, setSelColor] = useState("");

  const dispatch = useDispatch();
  const actKit = useSelector((state) => state.pitch.activeKit);

  const homeKitHandler = () => {
    if (!activeHomeKit) {
      setActiveHomeKit(true);
      setActiveAwayKit(false);
      dispatch(selectActiveKit({ activeKit: "home" }));
    } else setActiveHomeKit(false);
  };
  const awayKitHandler = () => {
    if (!activeAwayKit) {
      setActiveAwayKit(true);
      setActiveHomeKit(false);
      dispatch(selectActiveKit({ activeKit: "away" }));
    } else {
      setActiveAwayKit(false);
    }
  };

  const openModalPlHandler = () => {
    setModalPlayers(true);
  };
  const openModalGkHandler = () => {
    setModalGK(true);
  };

  const formationHandler = (e) => {
    const formation = e.target.innerText;
    setLineUp(formation);
  };

  const closePlayersModalHandler = () => {
    setModalPlayers(false);
  };
  const closeGoalKModalHandler = () => {
    setModalGK(false);
  };
  const colorSelectHandler = (e) => {
    const col = e.target.style.backgroundColor;
    setSelColor(col);
  };
  const addColorPlayersHandler = () => {
    setModalPlayers(false);
    if (actKit.kit === "home") {
      dispatch(addColorHomePlayers({ color: selectColor }));
    } else {
      dispatch(addColorAwayPlayers({ color: selectColor }));
    }
  };
  const addColorGoalkeepHandler = () => {
    setModalGK(false);
    if (actKit.kit === "home") {
      dispatch(addColorHomeGoalkeeper({ color: selectColor }));
    } else {
      dispatch(addColorAwayGoalkeeper({ color: selectColor }));
    }
  };
  const addNameHandler = (playerNameId) => {
    if (actKit.kit === "home") {
      if (lineUp === "4-4-2") {
        dispatch(addNameHomeLineUp442({ playerNameId }));
      } else if (lineUp === "4-3-3") {
        dispatch(addNameHomeLineUp433({ playerNameId }));
      } else {
        dispatch(addNameHomeLineUp451({ playerNameId }));
      }
    } else {
      if (lineUp === "4-4-2") {
        dispatch(addNameAwayLineUp442({ playerNameId }));
      } else if (lineUp === "4-3-3") {
        dispatch(addNameAwayLineUp433({ playerNameId }));
      } else {
        dispatch(addNameAwayLineUp451({ playerNameId }));
      }
    }
    const nonActivePlayer = { id: "", player: "nonactive" };
    dispatch(deleteActivePlayer({ nonActivePlayer }));
  };

  return (
    <div className={styles.pitch}>
      <Top lineUp={lineUp} formationHandler={formationHandler} />

      <PitchCore
        // activeKit={actKit.kit}
        activeHomeKit={activeHomeKit}
        activeAwayKit={activeAwayKit}
        lineUp={lineUp}
        homeKitHandler={homeKitHandler}
        awayKitHandler={awayKitHandler}
        addNameHandler={addNameHandler}
        openModalPlHandler={openModalPlHandler}
        openModalGkHandler={openModalGkHandler}
      />

      <ColorPlayersModal
        state={modalPlayers}
        closePlayersModalHandler={closePlayersModalHandler}
        colorSelectHandler={colorSelectHandler}
        addColorPlayersHandler={addColorPlayersHandler}
      />
      <ColorGoalKModal
        state={modalGK}
        closeGoalKModalHandler={closeGoalKModalHandler}
        colorSelectHandler={colorSelectHandler}
        addColorGoalkeepHandler={addColorGoalkeepHandler}
      />
      <Navigation />
    </div>
  );
};
export default PitchBlock;
