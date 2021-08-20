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
  Component,
  confirmText,
  dismissText,
  onConfirm,
  onDismiss,
  type,
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);

  return (
    <div className={cn(open ? styles.backdrop : styles.close)}>
      <div className={styles.content} ref={wrapperRef}>
        {Component ? (
          <Component />
        ) : (
          <>
            <p className={styles.contentMsg}>{message}</p>
            <div className={styles.buttons}>
              <Button
                variant="cancel"
                onClick={() => (onDismiss ? onDismiss() : setOpen(false))}
              >
                {dismissText || "Cancel"}
              </Button>
              <Button
                variant={type || "danger"}
                onClick={() => {
                  onConfirm();
                  setOpen(false);
                }}
              >
                {confirmText || "Confirm"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ConfirmDialog;
