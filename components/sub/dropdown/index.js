import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./index.module.css";

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

function DropDown({ Component, list, title }) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);
  /*
  list: [
    {
      href,
      title,
      image,
      onClick,
      seperater: true
    }
  ]
  */
  return (
    <div className={styles.dropDownWrapper} ref={wrapperRef}>
      <span onClick={() => setOpen(!open)}>
        <Component></Component>
      </span>
      <div className={cn(styles.dropDownList, open && styles.openDropdown)}>
        {title && <span className={styles.dropDownListTitle}>{title}</span>}
        <div className={title && styles.dropDownListMenu}>
          {list?.length &&
            list.map((item, index) => (
              <>
                {item.href && (
                  <Link key={index} href={item.href}>
                    <a>
                      <span
                        className={cn(
                          styles.dropDownListItem,
                          item.seperator && styles.seperator
                        )}
                      >
                        {item.title}
                      </span>
                    </a>
                  </Link>
                )}
                {item.onClick && (
                  <span
                    className={cn(
                      styles.dropDownListItem,
                      styles.dropDownListMenuItem,
                      item.seperator && styles.seperator
                    )}
                    onClick={async (e) => {
                      await item.onClick(e);
                      setOpen(false);
                    }}
                  >
                    {item.title}
                  </span>
                )}
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DropDown;
