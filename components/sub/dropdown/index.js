import React, { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./index.module.css";

function DropDown({ Component, links }) {
  const [open, setOpen] = useState(false);
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
    <div className={styles.dropDownWrapper}>
      <span onClick={() => setOpen(!open)}>
        <Component></Component>
      </span>
      <div className={cn(styles.dropDownList, open && styles.openDropdown)}>
        {links?.length &&
          links.map((link) => (
            <Link href={link.href}>
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
