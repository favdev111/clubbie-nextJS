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
      image: "/assets/teamhub-logo.png",
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
              <a>
                <div
                  className={cn(
                    styles.navbarListItemLink,
                    nav.active && styles.navbarListItemLinkActive
                  )}
                >
                  {!!nav?.image ? (
                    <img src={nav?.image} className={styles.navImage} />
                  ) : (
                    nav.title
                  )}
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
