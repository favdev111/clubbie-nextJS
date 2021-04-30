import React from "react";
import Button from "../UI/Button/Button";
import TemplateInput from "../UI/Input/Input";
// import styles from './login.module.scss';
// import styles from './login.module.css';
import Link from "next/link";

const Login = () => {
    return(
        <div className="login__block">
            <h1 className="title">Login</h1>

            <form action="#" className="form">
                <TemplateInput type="text" placeholder="Your Email Address" />
                <TemplateInput type="password" placeholder="Password" />
            </form>

            <div className="form-act">
                <Link href='/recovery-pass'>
                    <a className="forgot-pass">Forgot Password?</a>
                </Link>
                <Button>
                    Login
                </Button>
            </div>

            <div className="devide-block">
                <div className="devide-line"></div>
                <div className='devide-text'>Or</div>
                <div className="devide-line"></div>
            </div>

            <div className="social-signin">
                <Link href="/social-signin-fb">
                    <a><img className="signin-facebook" src={require('../../public/assets/facebook.svg')} alt=""/></a>
                </Link>
                <Link href="/social-signin-g">
                    <a><img className="signin-google" src={require('../../public/assets/google.svg')} alt=""/></a>
                </Link>
            </div>

            <div>
                <Link href="/sign-up"><a className="login-signup">Don’t have an Account? Sign Up</a></Link>
            </div>
        </div>
    )
}
export default Login;
