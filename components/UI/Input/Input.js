import React, {useState} from 'react';
// import styles from './input.module.scss'
// import styles from './input.module.css'

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
        <div className="inputCont">
            <input className="inputBlock" type={typeInput} placeholder={placeholder} />
            {
                type === 'password'
                ? <a href="#" onClick={showPasswordHandler} className="showPassword">
                        <img className="passImg" src={require('../../../public/assets/eye.svg')} alt="show password"/>
                  </a>
                : null
            }
        </div>
    )
}
export default TemplateInput
