import Head from "next/head";
import React from "react";
import Wrap from "../components/Wrap/Wrap";
import AccountConfirm from "../components/AccountConfirm/AccountConfirm";


const AccountConfirmPage = () => {
    return(
        <div className="container">
            <Head>
                <title>Clubbie App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="main">
                <Wrap>
                    <AccountConfirm />
                </Wrap>
            </main>
        </div>
    )
};

export default AccountConfirmPage;
