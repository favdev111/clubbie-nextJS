import Link from "next/link";
import Button from "../UI/Button/";
import React from "react";
import styles from "./navigation.module.css"


const Navigation = () => {
    return(
        <div className={styles.navBottom}>
            <Link href='/'>
                <a className={styles.navBottomLink}>Cancel</a>
            </Link>
            <div className={styles.navBottomBtn}>
                <Button>
                    Next
                </Button>
            </div>
        </div>
    )
}
export default Navigation;
