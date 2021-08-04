import React, { useState } from "react";
import Link from "next/link";
import Chip from "@sub/chip";
import styles from "./tags.module.css";

function Tags({ tags }) {
  const [_tags] = useState(tags);

  return (
    <div className={styles.tags}>
      {_tags.map((tag) => (
        <>
          <span className={styles.spacing}>
            <Link href={`/?tagSearch=${tag}`}>
              <a>
                <Chip text={tag} className={styles.tagChip}></Chip>
              </a>
            </Link>
          </span>
        </>
      ))}
    </div>
  );
}

export default Tags;
