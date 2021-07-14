import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import ToolTipSVG from "@svg/tooltip";
import styles from "./tooltip.module.css";

function useOutsideAlerter(ref, setOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }

    document.addEventListener("mouseover", handleClickOutside);
    return () => {
      document.removeEventListener("mouseover", handleClickOutside);
    };
  }, [ref]);
}

function ToolTip({ text, children }) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);

  return (
    <div className={styles.dropDownWrapper}>
      <span ref={wrapperRef} className={styles.tipHover}>
        {children || <ToolTipSVG />}
      </span>
      <div className={cn(styles.dropDownList, open && styles.openDropdown)}>
        {text || "ToolTip Text"}
      </div>
    </div>
  );
}

export default ToolTip;
