import React, { useState } from "react"
import styles from "./faq.module.css";
import Search from "@sub/search"
import cn from "classnames"
import DownAngle from "@svg/down-angel"
import UpAngle from "@svg/up-angel"


function FAQ() {

    const [aboutActive, aboutSetActive] = useState(false)
    const [teamActive, teamSetActive] = useState(false)
    const [sportActive, sportSetActive] = useState(false)


    return (
        <>
            <div className={styles.teamhub}>

                <h1>Frequently asked questions</h1>
                <p>Get instant answers to the most common questions. If you cannot find the answer, feel free to send us an email and we’ll get right back to you!</p>
                <div className={styles.search}>
                    <Search></Search>
                </div>

                {/* About Collapse */}
                <div className={styles.collapsable} onClick={() => {
                    if (aboutActive === true) aboutSetActive(false);
                    else if (aboutActive === false) aboutSetActive(true);
                }}>
                    <h3 className={cn(aboutActive ? styles.collapseHead : '')}>About Clubbie<span className={styles.rightFloat}>{aboutActive ? <UpAngle></UpAngle> : <DownAngle></DownAngle>}</span></h3>
                    <div className={cn(aboutActive ? [styles.showContent, styles.transition] : styles.content)}>
                        <h5 className={styles.question}>What is Clubbie?</h5>
                        <div className={styles.text}>Clubbie is an amateur sports social network and team management solution – the one-stop-shop for all things amateur sport! You can come here to share videos of your proudest sporting moments, or to make your friends and teammates laugh at your slip-ups or marvel at your skills. You can even share your tips and tricks with the world at large if you so wish. Our Team Hub allows teams to schedule events, create line-ups, collect payments, upload stats, and much, much more!</div>
                        <h5 className={styles.question}>Who are Clubbie?</h5>
                        <div className={styles.text}>We're just a group of sports enthusiasts from the UK, who thought this would be a good idea. We'll let you decide if we're on to something here.</div>
                    </div>
                </div>
                {/* Team Hub Collapse */}
                <div className={styles.collapsable} onClick={() => {
                    if (teamActive === true) teamSetActive(false);
                    else if (teamActive === false) teamSetActive(true);
                }}>
                    <h3 className={cn(teamActive ? styles.collapseHead : '')}>Team Hub<span className={styles.rightFloat}>{teamActive ? <UpAngle></UpAngle> : <DownAngle></DownAngle>}</span></h3>
                    <div className={cn(teamActive ? styles.showContent : styles.content)}>
                        <h5 className={styles.question}>What is the Clubbie Team Hub?</h5>
                        <div className={styles.text}>Our aim is for the Team Hub to be the simplest and most useful team management solution out there! We’ve got all of the key aspects of running an amateur team covered for you – so you can stop worrying about collecting subs and finding out player availability, and focus purely on what happens on the pitch!</div>
                        <h5 className={styles.question}>Why should my team use the Clubbie Team Hub?</h5>
                        <div className={styles.text}>From selecting availability and line-ups, to collecting payments, to group chats, to immersing yourself in matchday stats – Team Hub makes your life so much easier and streamlines the whole admin process of running a team! Best of all, our Team Hub is extremely easy to use and has been designed by amateur sports participants, for amateur sports participants! We’ve got you covered!</div>
                        <h5 className={styles.question}>How much is it?</h5>
                        <div className={styles.text}>Clubbie Team Hub is FREE TO USE! There are no monthly subscriptions or premium versions – we want you to experience the best we have to offer without any financial commitments!
                            If you do choose to make payments through Clubbie, then a 1.5% transaction fee (+ Stripe fee) will be charged – but this is totally optional! Select ‘Already Paid’ if you would prefer to pay your team in cash or offline. Either way, you’ll be able to make the most of our awesome features!
                        </div>
                    </div>
                </div>

                {/* Sports Collapse */}
                <div className={styles.collapsable} onClick={() => {
                    if (sportActive === true) sportSetActive(false);
                    else if (sportActive === false) sportSetActive(true);
                }}>
                    <h3 className={cn(sportActive ? styles.collapseHead : '')}>Sports Stuff<span className={styles.rightFloat}>{sportActive ? <UpAngle></UpAngle> : <DownAngle></DownAngle>}</span></h3>
                    <div className={cn(sportActive ? styles.showContent : styles.content)}>
                        <h5 className={styles.question}>Do you allow all sports?</h5>
                        <div className={styles.text}>Yes, as long as it's amateur. We want you to share your sporting moments, not those of the professionals you follow. Sports, activities, games - whatever you want to call them, if you love your pastime, share it with us and others here at Clubbie.</div>
                        <h5 className={styles.question}>I can't find my sport, what should I do?</h5>
                        <div className={styles.text}>We've tried to add as many sports as possible to Clubbie right from the off. But if yours is missing from our list, drop us a message, and we'll do our best to get it added asap.</div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default FAQ