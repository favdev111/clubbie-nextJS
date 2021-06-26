import React from "react";
import Link from "next/link";
import DirectedButton from "@sub/button-directed";
import Navbar from "../navbar";
import Notifications from "./notifications";
import styles from "./header.module.css";
import MobileNavigation from "./mobile";
import auth from "@utils/helpers/auth";

function Header() {
  const user = auth.getUser();
  const accessToken = auth.getAccessToken();
  const refreshToken = auth.getRefreshToken();

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
