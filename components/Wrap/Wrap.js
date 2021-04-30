import React from 'react';
// import styles from './wrap.module.scss'
// import styles from './wrap.module.css'

const Wrap = ({children}) => {
    return(
        <div className="wrapblock">
            <div className="wrapper">
                <div className="wrapper_staticBlock">
                    <div className="wrapper__logoBlock">
                        <img className="wrapper__logo" src={require('../../public/assets/logo.png')} alt="logo"/>
                        <p className="wrapper__logoText">Raising the bar for amateur sport</p>
                    </div>

                    <div className="wrapper__picBlock">
                        <img className="wrapper__picture" src={require('../../public/assets/sportmen.png')} alt="sportsmen"/>
                        <img className="wrapper__shadowPic" src={require('../../public/assets/shadow.svg')} alt="shadow"/>
                    </div>

                </div>
                <div className="wrapper_dynamicBlock">
                    {children}
                </div>

            </div>

        </div>
    )
}
export default Wrap;
