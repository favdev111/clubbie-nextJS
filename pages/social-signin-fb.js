import Head from "next/head";
import React from "react";
import Wrap from "../components/Wrap/index";
import SocialSigninFB from "../components/SocialSigninFB/index";


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
