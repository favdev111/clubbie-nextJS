import React from "react";
import Link from "next/link";

export default function Error() {
  return (
    <div className="notFound">
      <h1> 404. Not Found</h1>

      <Link href="/">
        <a className="back">Back home </a>
      </Link>
    </div>
  );
}
