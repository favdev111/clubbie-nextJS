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

function DropDown({ Component, links }) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);
  /*
  links: [
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
        {links?.length &&
          links.map((link, index) => (
            <Link key={index} href={link.href}>
              <span
                className={cn(
                  styles.dropDownListItem,
                  link.seperator && styles.seperator
                )}
              >
                {link.title}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default DropDown;
