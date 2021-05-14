import Head from "next/head";
import React from "react";
import Wrap from "@c/Wrap/index";
import Login from "@c/Login/index";


const LoginPage = () => {
    return(
        <div className="container">
            <Head>
                <title>Clubbie App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="main">
                <Wrap>
                    <Login/>
                </Wrap>


            </main>
        </div>
    )
};
export default LoginPage;

