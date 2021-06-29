import React from "react";
import styles from "./index.module.css";
import Trash from "@svg/thrash";
import Edit from "@svg/edit";

function ActionButton({ type, children, onClick }) {
  return (
    <div className={styles.actionButton} onClick={onClick}>
      {type == "edit" && <Edit />}
      {type == "delete" && (
        <span>
          <Trash />
        </span>
      )}

      {children && <p className="opacity-50"> {children}</p>}
    </div>
  );
}

export default ActionButton;
