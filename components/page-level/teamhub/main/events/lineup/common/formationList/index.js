import React, { useState, useEffect } from "react";
import cn from "classnames";
import matchFormations from "@utils/fixedValues/matchFormations";
import styles from "./index.module.css";

function FormationList({ selected, onFormationSet }) {
  const [_selected, setSelected] = useState(matchFormations["433"]);

  useEffect(() => {
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
    <ul className={cn(styles.formationList)}>
      {Object.values(matchFormations)?.map((x) => {
        return (
          <li
            className={cn(
              styles.formationListItem,
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
