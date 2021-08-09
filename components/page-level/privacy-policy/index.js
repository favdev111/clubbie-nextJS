import React from "react"
import styles from "./policy.module.css"
import Link from "next/link"
import Footer from "@layout/footer"

function Policy() {
    return (
        <>
            <div className={styles.teamhub}>
                <h1>Privacy Policy</h1>
                <div>
                    <span>Last updated: 05 June 2017</span>

                    <p>Welcome to Clubbie ("Clubbie", "we", "us" or "our"). Clubbie is the place where you can go to showcase your amateur sporting talents to other sports enthusiasts who are looking for the next ridiculously sublime, funny or outrageous feat. Just choose a video, add comments and share.
                        <br></br>
                        We respect and value your privacy. Please read this simple privacy policy which outlines what information we collect about you and how we use, share and protect that information.
                    </p>

                    <ol className={styles.orderListPad}>
                        <li>
                            <h4>OWNERSHIP OF DATA</h4>
                            <ol className={styles.orderListPad}>
                                <li>You have complete control over the information and content you provide to Clubbie. You retain ownership of all intellectual property rights for content you add to Clubbie. You can request to access, modify, export, or delete any content you have added at any time. You may request for us to stop processing your data at any time and you can also delete your entire account if you wish.</li>
                                <li>You can exercise these rights by contacting us at <span className={styles.link}><Link href="">accessrequest@clubbie.com</Link></span> or by using the website to access and modify your content.</li>
                                <li>You may also lodge a complaint with the Information Commissioner’s Office by accessing <span className={styles.link}><Link href="">ico.org.uk/concerns</Link></span> or calling 0303 123 1113.</li>
                            </ol>
                        </li>
                        <li>
                            <h4>INFORMATION ABOUT YOUR ACCOUNT</h4>
                            <ol className={styles.orderListPad}>
                                <li>When you create an account we may collect specific personal information like your name, picture, profile video, e-mail address and phone number, as well as non-personally identifying information like gender and sporting preferences. We use this information to allow you to use Clubbie, and to send you updates and information about our products and services, and to suggest content you may be interested in viewing.</li>
                            </ol>
                        </li>
                        <li>
                            <h4>INFORMATION ABOUT YOUR VIDEO CONTENT AND ACHIEVEMENTS</h4>
                            <ol className={styles.orderListPad}>
                                <li>
                                    To add more context to your content when you share a video or achievement, you may choose to add your location or a category. Clubbie may request access to your location information and if you approve, you can turn location on or off for content you share. The purpose of Clubbie is for you to showcase your talent and therefore we believe that you will want to make your content publicly available for others to marvel at. However, if you wish to make your content private or available only to selected fans then you can do so.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h4>INFORMATION FROM OTHER SOURCES</h4>
                            <ol className={styles.orderListPad}>
                                <li>When you link to a third-party service, like Facebook, we may collect and store personal information and data that you have provided to that third-party service, and that you have consented to sharing with Clubbie. We may use this third-party information to help you easily identify and connect with fans and clubs. In order to backup your content and make it available to those people and networks you choose to share with, we store the content you share on Clubbie.</li>
                            </ol>
                        </li>
                        <li>
                            <h4>CHILDRENS PRIVACY</h4>
                            <ol className={styles.orderListPad}>
                                <li>
                                    We will never share your personal information with any third-parties without your express permission, except where we are required to do so by law. We will not profile you or otherwise make automated decisions using your personal data for any purposes.
                                </li>
                                <li>
                                    If you decide to make your video content and achievements public we may promote that content on other third-party services, like Facebook or Twitter. The same applies when you share your content to these third-party services. Please keep in mind that once content is shared publicly or to a third-party service, we no longer have any control over who can view the shared content or what information is gathered by other people or services.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h4>SHARING OF INFORMATION</h4>
                            <ol className={styles.orderListPad}>
                                <li>We will never share your personal information with any third-parties without your express permission, except where we are required to do so by law. We will not profile you or otherwise make automated decisions using your personal data for any purposes.</li>
                                <li>
                                    If you decide to make your video content and achievements public we may promote that content on other third-party services, like Facebook or Twitter. The same applies when you share your content to these third-party services. Please keep in mind that once content is shared publicly or to a third-party service, we no longer have any control over who can view the shared content or what information is gathered by other people or services.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h4>ANALYTICS AND COOKIES</h4>
                            <ol className={styles.orderListPad}>
                                <li>Like many services, we use analytics and cookies to improve the services we provide to you. We use third-party tools, like Google Analytics, to automatically record information about your browser, device type and activity on our site so that we can design improved user interfaces for you. We also use cookies, snippets of code that are stored by your browser, to enable us to recognise you when you return to our site and to help us better understand how and when you interact with Clubbie services.</li>
                            </ol>
                        </li>

                        <li>
                            <h4>TRANSFER OF DATA</h4>
                            <ol className={styles.orderListPad}>
                                <li>
                                    To the best of our ability, your data is transferred over a secure connection and stored redundantly on multiple servers across multiple facilities within the European Economic Area ("EEA").
                                </li>
                            </ol>
                        </li>
                        <br></br>
                    </ol>
                    <p className={styles.padBottom}>By acknowledging this notice, using Clubbie and providing us with your personal data you are agreeing that we may use your personal data for the purposes set out in this policy and you are agreeing to our Terms of Use. For any further questions about this policy please contact Christopher White (Director) at <span className={styles.link}><Link href="">christopher.white@clubbie.com</Link></span>
                    </p>

                </div>
            </div>
            <div className={styles.footer}>
                <Footer></Footer>
            </div>
        </>
    )
}

export default Policy;