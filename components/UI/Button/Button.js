import React from "react";
// import styles from './button.module.scss'

const Button = (props) => {
    const {variant = 'login', children} = props;
    return(
        <>
            <button className="btn">
                <span className="contTxt">{children}</span>
            </button>
        </>
    )
}
export default Button;
