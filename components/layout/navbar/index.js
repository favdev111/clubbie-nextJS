import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "@sub/logo";
import cn from "classnames";
import styles from "./navbar.module.css";

function Navbar() {
  const router = useRouter();

  const navigation = [
    {
      link: "/",
      title: "Home",
      active: router.route === "/",
    },
    {
      link: "/teamhub",
      title: "Teamhub",
      active: router.route.includes("/teamhub"),
    },
  ];

  return (
    <div className={styles.navbar}>
      <Logo />
      <ul className={styles.navbarList}>
        {navigation.map((nav) => (
          <li key={`${nav.title}index`} className={styles.navbarListItem}>
            <Link href={nav.link}>
              <div
                className={cn(
                  styles.navbarListItemLink,
                  nav.active && styles.navbarListItemLinkActive
                )}
              >
                {nav.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
