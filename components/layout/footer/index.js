import React from "react"
import styles from "./footer.module.css"
import FacebookSVG from "@svg/social/share/facebook.js";
import TwitterSVG from "@svg/social/share/twitter";
import Link from "next/link"

function Footer() {
    return (
        <>
            <div className={styles.footer}>
                <div className={styles.colMargin}>
                    <div className={styles.bottomMargin}>
                        <Link href=""><img src="/assets/logo.png" width="100" /></Link>
                    </div>
                    <div>
                        Raising the bar for amateur sport
                    </div>
                </div>
                <div className={styles.colMargin}>
                    <div className={styles.bottomMargin}>
                        <Link href="">Terms and Conditions</Link>
                    </div>
                    <div className={styles.bottomMargin}>
                        <Link href="">Privacy Policy</Link>
                    </div>
                    <div className={styles.bottomMargin}>
                        <Link href="">Cookies Policy</Link>
                    </div>
                    <div>
                        <Link href="">About Us</Link>
                    </div>
                </div>
                <div className={styles.colMargin}>
                    <div className={styles.bottomMargin}>
                        <Link href="">Contact Us</Link>
                    </div>
                    <div className={styles.bottomMargin}>
                        <Link href="">FAQ</Link>
                    </div>
                </div>
                <div className={styles.colMargin}>
                    <div className={styles.bottomMargin}>
                        <h5>
                            Follow Us On
                        </h5>
                    </div>
                    <div className={styles.bottomMargin}>
                        <FacebookSVG></FacebookSVG> <TwitterSVG></TwitterSVG>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer