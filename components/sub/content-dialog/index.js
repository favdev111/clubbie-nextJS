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

function ContentDialog({
  open,
  setOpen,
  title,
  Body,
  confirmText,
  dismissText,
  onConfirm,
  onDismiss,
  type,
  hideActionButtons,
  className,
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);

  return (
    <div className={cn(open ? styles.backdrop : styles.close)}>
      <div className={cn(styles.content, className)} ref={wrapperRef}>
        {title && <h2>{title}</h2>}
        <div className={styles.body}>
          <Body></Body>
        </div>
        {!hideActionButtons && (
          <div className={styles.buttons}>
            <Button
              variant="cancel"
              onClick={async () => {
                onDismiss && (await onDismiss());
                setOpen(false);
              }}
            >
              {dismissText || "Cancel"}
            </Button>
            <Button
              variant={type || "danger"}
              onClick={async () => {
                await onConfirm();
                setOpen(false);
              }}
            >
              {confirmText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentDialog;
