import React from "react"
import styles from "./termsofuse.module.css"
import Link from "next/link"
import Footer from "@layout/footer"

function Policy() {
    return (
        <>
            <div className={styles.teamhub}>
                <h1>Terms of Use</h1>
                <div>
                    <span>Last updated: 05 June 2017</span>
                    <ol className={styles.orderListPad}>
                        <li>
                            <h4>IMPORTANT NOTICE</h4>
                            <ol className={styles.orderListPad}>
                                <li>
                                    These terms apply to your use (the “Services”) of the Clubbie Ltd. website (the “Website”).
                                </li>
                                <li>These terms should be read in conjunction with the Privacy Policy and Cookies Policy for the Website which tell you how we collect and use personal data you provide to us or which we collect.</li>
                                <li>By accessing or using the Website you confirm you have read, understood and agree to be legally bound by these terms, our Privacy Policy and Cookies Policy in their entirety each time you access the Website. If you do not agree to these terms, our Privacy Policy and Cookies Policy, please do not use the Website.</li>
                            </ol>
                        </li>
                        <li>
                            <h4>IMFORMATION ABOUT US</h4>
                            <ol className={styles.orderListPad}>
                                <li>This Website is operated by Clubbie Ltd. (“we”, “us”, “our”).</li>
                            </ol>
                        </li>
                        <li>
                            <h4>USE OF THE WEBSITE</h4>
                            <ol className={styles.orderListPad}>
                                <li>You must be at least 13 years old to use the Website.</li>
                                <li>You may use this Website for lawful purposes only. You must not use the Website in any way that breaches any applicable local, national or international law or regulation or which is in any way unlawful or fraudulent.</li>
                                <li>You are allowed to access, download and print videos, comments and extracts from the Website for your personal use only.</li>
                                <li>You must not:
                                    <ul className={styles.orderListPad}>
                                        <li>republish, retransmit or redistribute all or any part of the Website.</li>
                                        <li>copy (including storing and downloading), distribute, publish, alter, adapt, create derivative works from, or otherwise use the material on this Website, either in whole or in part</li>
                                        <li>remove any copyright, trademark or other intellectual property notices</li>
                                        <li>use the Website to transmit or procure the sending of any unsolicited or illegal material</li>
                                        <li>seek to interfere or damage the Website or its content</li>
                                        <li>frame, harvest or link (including deep link) to this Website or its content or unauthorised spam or advertising material</li>
                                        <li>use any or all parts of the Website for any commercial purpose without first use the material on this Website, or any part of it, on any other Website or social media platform; or obtaining express written consent from us</li>
                                    </ul>
                                </li>
                                <li>Please note that the following activities are prohibited. Anyone doing these things may be permanently banned from the site. Please do not:
                                    <ul className={styles.orderListPad}>
                                        <li>post videos that you didn’t make, or include content in your videos that someone else owns the copyright to, such as music, parts of other programmes, footage of sporting events or videos made by other users, without necessary authorisation</li>
                                        <li>upload pornography or sexually explicit content</li>
                                        <li>post graphic or gratuitous violence or content that has the potential to shock</li>
                                        <li>engage in harassment or predatory conduct, stalking, threats, invasion of privacy, or reveal other members' personal information; or</li>
                                        <li>create misleading descriptions, tags, titles or thumbnails in order to increase views, or post large amounts of untargeted, unwanted or repetitive content, including comments and private messages.</li>
                                    </ul>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h4>CONTENT</h4>
                            <ol className={styles.orderListPad}>
                                <li>
                                    Our Website provides an opportunity for users to upload and view amateur sports videos and images. We do not review the videos or images before they are posted. We do not endorse them or assess whether the videos or images are suitable for any particular purpose.
                                </li>
                                <li>
                                    We do not suggest that any physical activity is undertaken before appropriate medical advice has been sought, nor do we suggest that videos are relied upon as a substitute for specific advice obtained from a qualified professional.
                                </li>
                                <li>
                                    We do not warrant that the information on the Website is accurate, complete or up-to-date or that it does not infringe the rights of any third party. The Website and the information contained in it is provided for your use "as is" without any warranty (whether express or implied) of any kind.
                                </li>
                                <li>
                                    Materials posted on our Website do not amount to advice from us on which reliance should be placed. We therefore disclaim all liability and responsibility from any reliance placed on such materials by any visitor to our Website, or by anyone who may be informed of any of its contents.
                                </li>
                                <li>
                                    We reserve the right to alter, remove or update materials and information on the Website at any time without notice.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h4>RIGHTS YOU LICENCE</h4>
                            <ol className={styles.orderListPad}>
                                <li>When you upload or post content to Clubbie, you grant:
                                    <ul className={styles.orderListPad}>
                                        <li>
                                            to Clubbie, a worldwide, sole, royalty-free, transferable licence (with right to sub-licence) to use, reproduce, distribute, prepare derivative works of, display, and perform that Content in connection with the provision of the Service and otherwise in connection with the provision of the Service and Clubbie's business, including without limitation for promoting and redistributing part or all of the Service (and derivative works thereof) in any media formats and through any media channels. This means that you will still be able to use anything which you upload or post to Clubbie, but you won’t be able to license it for use (including uploading to other sharing sites) elsewhere; and
                                        </li>
                                        <li>
                                            to each user of the Service, a worldwide, non-exclusive, royalty-free licence to access your content through the Service, and to use, reproduce, distribute, prepare derivative works of, display and perform such content to the extent permitted by the functionality of the Service and under these Terms.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    The above licenses granted by you are perpetual and irrevocable, but are otherwise without prejudice to your ownerships rights, which are retained by you.
                                </li>
                                <li>
                                    You confirm that anything you upload or post to Clubbie does not contain any third party rights (including copyright), or that you have permission from the rightful owner to upload or post such material and provide Clubbie with the license rights set out above.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h4>AVAILABILITY OF THE WEBSITE</h4>
                            <ol className={styles.orderListPad}>
                                <li>
                                    We reserve the right to suspend access to all or part of the Website or close it indefinitely without notice. Access may be terminated or suspended either in relation to specific users or to all users.
                                </li>
                                <li>
                                    To the extent permitted by law we accept no liability if the Website becomes either temporarily or permanently unavailable.
                                </li>
                                <li>
                                    In addition, we do not warrant that the functions or materials on, or accessed from, this Website shall be uninterrupted or free from errors.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h4>CHANGES TO THESE TERMS</h4>
                            <ol className={styles.orderListPad}>
                                <li>We reserve the right to change these terms at any time without notice.</li>
                                <li>
                                    It is your responsibility to check the terms regularly in order to be aware of any changes which are made to them.
                                </li>
                                <li>
                                    By continuing to access this Website after the terms have changed, you are agreeing that you have read, understood and agree to be bound by the updated terms.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h4>OWNERSHIP OF THE WEBSITE</h4>
                            <ol className={styles.orderListPad}>
                                <li>With the exception of the videos and comments posted on our Website, we are the owner or licensee of all intellectual property rights in the Website and in the materials which appear on the Website. This includes but is not limited to the text, photographs, images, graphics, illustrations, designs, written and other material including the program and code. Our rights include trademarks, copyright, design rights and all other intellectual property rights and all our rights are reserved</li>
                            </ol>
                        </li>

                        <li>
                            <h4>VIRUSES AND HACKING</h4>
                            <ol className={styles.orderListPad}>
                                <li>
                                    We do not warrant that the Website, its content or the server(s) that make it available are error or virus free or free of other harmful components or that your use of this Website will be uninterrupted. You are accessing this Website at your own risk and to the extent permitted by law and subject to clause 12.1 we will not be liable for any loss or damage suffered by you as a result of viruses or other harmful material which you access from this Website.
                                </li>
                                <li>
                                    You are solely responsible for ensuring that you have suitable equipment and security and virus protection in place before using the Website.
                                </li>
                                <li>
                                    You must not attempt to gain unauthorised access to our Website, the server on which our Website is stored or any server computer or data base connected to our Website
                                </li>
                                <li>
                                    You must not introduce viruses, trojan horses, worms, logic bombs, spyware, adware or other harmful materials to this Website which may adversely affect the operation of any computer or program or this Website.
                                </li>
                            </ol>
                        </li>
                        <br></br>
                        <li>
                            <h4>LINKING TO AND FROM THE WEBSITE</h4>
                            <ol className={styles.orderListPad}>
                                <li>This Website may contain links to sites operated by third parties. We have not reviewed and do not review such sites and are not responsible for the content of nor accept any liability howsoever arising in respect of any of such sites</li>
                                <li>The presence of links to third party sites is not intended to and shall not constitute a recommendation by us of such sites nor of any advice or information posted on them.</li>
                            </ol>
                        </li>
                        <li>
                            <h4>ACCOUNT</h4>
                            <ol className={styles.orderListPad}>
                                <li>
                                    In order to access certain services or features on our Website you will need to create an account.
                                </li>
                                <li>
                                    You must give accurate and complete information when opening your account and you must keep your password secure and confidential.
                                </li>
                                <li>
                                    You will be responsible for all activity on your account, and must immediately inform us by emailing <span className={styles.link}><Link href="">mailto:info@clubbie.com</Link></span> if you are aware of any breach of security or unauthorised use of your account.
                                </li>
                                <li>
                                    We are not liable for any loss resulting from your failure to protect the confidentiality of your user name or password.
                                </li>
                                <li>
                                    We reserve the right to disable any user name and password at any time if in our opinion there is a risk of the confidentiality of the password being compromised.
                                </li>
                                <li>
                                    We have sole discretion to determine whether or not to allow you access to secure areas of the Website and we may suspend your access to this section of the Website at any time.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h4>OUR LIABILITY</h4>
                            <ol className={styles.orderListPad}>
                                <li>
                                    If we fail to comply with these terms, we are responsible for any loss or damage you suffer that is a foreseeable result of our breach of these terms or our negligence. Loss or damage is foreseeable if they were an obvious consequence of our breach or if they were contemplated by you and us at the time you accepted accessed or used this Website and accepted these terms in doing so. We do not accept liability for any loss or damage which was not foreseeable.
                                </li>
                                <li>
                                    To the extent we may lawfully do so we exclude liability for any implied terms and conditions including those implied by statute, common law or the law of equity.
                                </li>
                                <li>
                                    However, nothing in these terms shall affect our liability for death or personal injury caused by our negligence, nor our liability for fraud or serious misrepresentation, nor any other liability which cannot be excluded or limited under applicable law.
                                </li>
                                <li>
                                    Nothing in these terms affect your legal rights as a consumer. Advice about your legal rights is available from your local Citizens' Advice Bureau or Trading Standards office
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h4>LAWS</h4>
                            <ol className={styles.orderListPad}>
                                <li>If any of the terms is or becomes invalid or contravenes any law then the remaining provisions shall not be affected.</li>
                                <li>It is intended that the Website will be used by persons resident in the United Kingdom</li>
                                <li>These Terms are governed by English law. You and we both agree to submit to the non-exclusive jurisdiction of the English courts</li>
                                <li>No waiver shall constitute a waiver of any other terms. No failure by us to exercise a remedy shall constitute a waiver to subsequently exercise any remedy.</li>
                            </ol>
                        </li>

                    </ol>

                </div>
            </div>
            <div className={styles.footer}>
                <Footer></Footer>
            </div>
        </>
    )
}

export default Policy;