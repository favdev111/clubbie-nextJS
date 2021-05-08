import React from "react";
import Link from "next/link";
import Logo from "../Logo/Logo";

function Navbar() {
  return (
    <div className="navbar">
      <Logo />
      <ul className="navbar__list">
        {["Home", "Teamhub"].map((nav, index) => (
          <li key={`${nav}index`} className="navbar__item">
            <Link href="./">
              <div className="navbar__link">{nav}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
