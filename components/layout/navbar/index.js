import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ClubbieLogo from "@svg/clubbie-logo";
import TeamHubSVG from "@svg/teamhub";
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
      svg: <TeamHubSVG />,
      active: router.route.includes("/teamhub"),
    },
  ];

  return (
    <div className={styles.navbar}>
      <Link href="/">
        <a>
          <ClubbieLogo />
        </a>
      </Link>
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
                  {!!nav?.svg ? nav.svg : nav.title}
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
