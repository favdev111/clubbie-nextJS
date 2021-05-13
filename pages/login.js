import Head from "next/head";
import React from "react";
import Wrap from "../components/Wrap/index";
import Login from "../components/Login/index";


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

