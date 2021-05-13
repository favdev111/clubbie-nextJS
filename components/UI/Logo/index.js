import React from "react";
import Link from "next/link";
import styles from "./logo.module.scss"

function Logo() {
  return (
    <>
      <Link href="./">
        <img
          className={styles.headerLogo}
          src="/assets/logo.png"
        />
      </Link>
    </>
  );
}

export default Logo;
