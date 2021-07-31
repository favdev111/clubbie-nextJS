import React from "react";
import styles from "./index.module.css";
import Trash from "@svg/thrash";
import Chat from "@svg/messages";
import Settings from "@svg/settings";
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
      {type == "chat" && (
        <span>
          <Chat className={styles.chatButton} />
        </span>
      )}
      {type == "settings" && (
        <span>
          <Settings />
        </span>
      )}
      {children && <p className="opacity-50"> {children}</p>}
    </div>
  );
}

export default ActionButton;
