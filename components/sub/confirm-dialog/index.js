import React, { useRef, useState, useEffect } from "react";
import styles from "./index.module.css";
import cn from "classnames";
import Button from "@sub/button";

function useOutsideAlerter(ref, setOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function ConfirmDialog({
  open,
  setOpen,
  message,
  confirmText,
  onConfirm,
  onDismiss,
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);

  return (
    <div className={cn(open ? styles.backdrop : styles.close)}>
      <div className={styles.content} ref={wrapperRef}>
        <p>{message}</p>
        <div className={styles.buttons}>
          <Button
            variant="cancel"
            onClick={() => (onDismiss ? onDismiss() : setOpen(false))}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
