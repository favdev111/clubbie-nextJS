import Head from "next/head";
import React from "react";
import Wrap from "../components/Wrap/Wrap";
import SocialSigninFB from "../components/SocialSigninFB/SocialSigninFB";


const SocialSigninFBpage = () => {
    return(
        <div className="container">
            <Head>
                <title>Clubbie App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="main">
                <Wrap>
                    <SocialSigninFB />
                </Wrap>
            </main>
        </div>
    )
};

export default SocialSigninFBpage;
