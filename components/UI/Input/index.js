import React, {useState} from 'react';
import styles from './input.module.scss'

const TemplateInput = ({type, placeholder}) => {
    const [typeInput, setTypeInput] = useState(type);
    const showPasswordHandler = (e) => {
        e.preventDefault();
        if(typeInput === 'password') {
            setTypeInput('text');
        } else {
            setTypeInput('password');
        }
    }

    return(
        <div className={styles.inputCont}>
            <input className={styles.inputBlock} type={typeInput} placeholder={placeholder} />
            {
                type === 'password'
                ? <a href="#" onClick={showPasswordHandler} className={styles.showPassword}>
                        <img src="/assets/eye.svg" alt="show password"/>
                  </a>
                : null
            }
        </div>
    )
}
export default TemplateInput
