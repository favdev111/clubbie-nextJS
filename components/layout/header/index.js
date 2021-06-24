import React from "react";
import Cookie from "js-cookie";
import Link from "next/link";
import DirectedButton from "@sub/button-directed";
import Navbar from "../navbar";
import Notifications from "./notifications";
import styles from "./header.module.css";
import MobileNavigation from "./mobile";

function Header() {
  const user = Cookie.get("user");
  const accessToken = Cookie.get("access_token");
  const refreshToken = Cookie.get("refresh_token");

  const isLoggedIn = user && accessToken && refreshToken;

  return (
    <header className={styles.header}>
      <Navbar />
      {isLoggedIn ? (
        <>
          <Notifications authUser={user} />
          <MobileNavigation authUser={user} />
        </>
      ) : (
        <Link href="/auth/login">
          <a>
            <DirectedButton direction="forward">Login</DirectedButton>
          </a>
        </Link>
      )}
    </header>
  );
}

export default Header;
