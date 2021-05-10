import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Clubbie App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <ul className="list-page">
          <li>
            <Link href="/login">
              <a className="list-page__item">Login Page</a>
            </Link>
          </li>
          <li>
            <Link href="/sign-up">
              <a className="list-page__item">Sign Up Page</a>
            </Link>
          </li>
          <li>
            <Link href="/social-signin-fb">
              <a className="list-page__item">
                Social Media Signin via Facebook
              </a>
            </Link>
          </li>
          <li>
            <Link href="/social-signin-g">
              <a className="list-page__item">Social Media Signin via Google</a>
            </Link>
          </li>
          <li>
            <Link href="/recovery-pass">
              <a className="list-page__item">Recovery Password Page</a>
            </Link>
          </li>
          <li>
            <Link href="/logout">
              <a className="list-page__item">Logout Page</a>
            </Link>
          </li>
          <li>
            <Link href="/account-confirmation">
              <a className="list-page__item">New Account Confirmation Page</a>
            </Link>
          </li>
          <li>
            <Link href="/account-verification">
              <a className="list-page__item">Account Verification Page</a>
            </Link>
          </li>
          <li>
            <Link href="/connected-banks">
              <a className="list-page__item">Connected Banks</a>
            </Link>
          </li>
          <li>
            <Link href="/profile-self">
              <a className="list-page__item">Profile Self</a>
            </Link>
          </li>
          <li>
            <Link href="/profile-self-noclub">
              <a className="list-page__item">Profile Self - No Club</a>
            </Link>
          </li>
          <li>
            <Link href="/profile-self-public">
              <a className="list-page__item">Profile Self - Public</a>
            </Link>
          </li>
          <li>
            <Link href="/teamhub-initial">
              <a className="list-page__item">Teamhub</a>
            </Link>
          </li>
          <li>
            <Link href="/teamhub-joinclub">
              <a className="list-page__item">Teamhub Join Club</a>
            </Link>
          </li>
          <li>
            <Link href="/teamhub-jointeam">
              <a className="list-page__item">Teamhub Join Team</a>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
