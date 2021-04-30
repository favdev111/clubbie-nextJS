import React from 'react'
import Head from 'next/head'
import Link from "next/link";


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Clubbie App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
       <ul>
         <li>
            <Link href="/login">
              <a>Login Page</a>
            </Link>
         </li>
         <li>
            <Link href="/sign-up">
              <a>Sign Up Page</a>
            </Link>
         </li>
         <li>
            <Link href="/social-signin-fb">
              <a>Social Media Signin via Facebook</a>
            </Link>
         </li>
         <li>
            <Link href="/social-signin-g">
              <a>Social Media Signin via Google</a>
            </Link>
         </li>
         <li>
            <Link href="/recovery-pass">
              <a>Recovery Password Page</a>
            </Link>
         </li>
         <li>
            <Link href="/logout">
              <a>Logout Page</a>
            </Link>
         </li>
         <li>
             <Link href="/account-confirmation">
                 <a>New Account Confirmation Page</a>
             </Link>
         </li>
         <li>
             <Link href="/account-verification">
                 <a>Account Verification Page</a>
             </Link>
         </li>

       </ul>
      </main>
    </div>
  )
}
