import React, { useState } from "react";
import Chip from "@sub/chip";
import styles from "./tags.module.css";

function Tags({ tags }) {
  const [_tags] = useState(tags);

  return (
    <div className={styles.tags}>
      {_tags.map((tag) => (
        <>
          <Chip text={tag} className={styles.tagChip}></Chip>
          <span className={styles.spacing}></span>
        </>
      ))}
    </div>
  );
}

export default Tags;
