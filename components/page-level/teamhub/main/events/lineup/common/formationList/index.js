import React, { useState, useEffect } from "react";
import cn from "classnames";
import matchFormations from "@utils/fixedValues/matchFormations";
import styles from "./index.module.css";

function FormationList({ selected, onFormationSet, selectMode }) {
  const [_selectMode, setSelectMode] = useState(false);
  const [_selected, setSelected] = useState(matchFormations["433"]);

  useEffect(() => {
    selectMode && setSelectMode(selectMode);
    selected && setSelected(selected);
  }, []);

  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  const handleFormationClick = (formation) => {
    setSelected(formation);
    onFormationSet && onFormationSet(formation);
  };

  return (
    <ul
      className={cn(
        styles.formationList,
        !selectMode && styles.formationListCenter
      )}
    >
      {Object.values(matchFormations)?.map((x) => {
        if (!selectMode && x !== _selected) return <></>;
        return (
          <li
            className={cn(
              styles.formationListItem,
              selectMode && styles.formationListItemHover,
              x === _selected && styles.activeFormation
            )}
            onClick={() => handleFormationClick(x)}
          >
            {x}
          </li>
        );
      })}
    </ul>
  );
}

export default FormationList;
