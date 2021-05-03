import React from 'react';
// import styles from './wrap.module.scss'
// import styles from './wrap.module.css'

const Wrap = ({children}) => {
    return(
        <div className="wrapblock">
            <div className="wrapper">
                <div className="wrapper_static">
                    <div className="wrapper_static__logoBlock">
                        <img className="wrapper_static__logoBlock-logo" src={require('../../public/assets/logo.png')} alt="logo"/>
                        <p className="wrapper_static__logoBlock-logoText">Raising the bar for amateur sport</p>
                    </div>

                    <div className="wrapper_static__picBlock">
                        <img
                            className="wrapper_static__picBlock-picture"
                            src={require('../../public/assets/sportmen.png')}
                            alt="sportsmen"/>
                        <img
                            className="wrapper_static__picBlock-shadowPic"
                            src={require('../../public/assets/shadow.svg')}
                            alt="shadow"/>
                    </div>

                </div>
                <div className="wrapper_dynamic">
                    {children}
                </div>

            </div>

        </div>
    )
}
export default Wrap;
