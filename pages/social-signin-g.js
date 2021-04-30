import Head from "next/head";
import React from "react";
import Wrap from "../components/Wrap/Wrap";
import SocialSigninG from "../components/SocialSigningGoogle/SocialSigninG";


const SocialSigninGpage = () => {
    return(
        <div className="container">
            <Head>
                <title>Clubbie App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="main">
                <Wrap>
                    <SocialSigninG />
                </Wrap>
            </main>
        </div>
    )
};

export default SocialSigninGpage;
