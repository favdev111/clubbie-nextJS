import React from "react";
import Link from "next/link";

function Logo() {
  return (
    <>
      <Link href="./">
        <img
          className="header__logo"
          src={require("../../../public/assets/logo.png")}
        />
      </Link>
    </>
  );
}

export default Logo;
