import React from "react";
import ContentAdd from "./add";
import ContentDetails from "./details";
import styles from "./content.module.css";

function Content({ addMode, content }) {
  return (
    <div className={styles.content}>
      <h1 className={styles.contentTitle}>
        {addMode && "Add "}Content{content && " Details"}
      </h1>
      <div className={styles.contentBody}>
        {addMode && <ContentAdd />}
        {content && <ContentDetails content={content} />}
      </div>
    </div>
  );
}

export default Content;
