import React from "react";
import PitchHome from "./PitchHome";
import KitBlock from "../KitBlock";
import PitchAway from "./PitchAway";
import {useSelector} from "react-redux";

const PitchCore = ({
                       lineUp, activeHomeKit, activeAwayKit, homeKitHandler, awayKitHandler, addNameHandler,
                       openModalPlHandler, openModalGkHandler
}) => {
    const actKit = useSelector(state => state.pitch.activeKit);
    return(
        <>
            {
                actKit.kit === 'home'
                ?<PitchHome
                    lineUp={lineUp}
                    addNameHandler={addNameHandler}
                 />
                :<PitchAway
                    lineUp={lineUp}
                    addNameHandler={addNameHandler}
                 />
            }

            <KitBlock
                activeHomeKit={activeHomeKit}
                activeAwayKit={activeAwayKit}
                homeKitHandler={homeKitHandler}
                awayKitHandler={awayKitHandler}
                openModalPlHandler={openModalPlHandler}
                openModalGkHandler={openModalGkHandler}
            />

        </>
    )
}
export default PitchCore;
