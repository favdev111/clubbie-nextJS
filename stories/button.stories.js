import React from "react";
import Button from "../components/UI/Button/index"
import styles from "../components/UI/Button/button.module.scss"

export default {
    title: 'UI Elements/Button',
    component: Button
}

// export const Login = () => <Button variant='login'>Login</Button>
// export const Logout = () => <Button variant='logout'>Logout</Button>
// export const SignUp = () => <Button variant='signup'>SignUp</Button>
// export const Verify = () => <Button variant='verify'>Verify</Button>

const Template = (args) => <Button {...args} />;

export const Login = Template.bind({});
Login.args = {
    primary: true,
    children: 'Login',
};
export const Logout = Template.bind({});
Logout.args = {
    children: 'Logout',
};
export const SignUp = Template.bind({});
SignUp.args = {
    children: 'SignUp',
};
export const Verify = Template.bind({});
Verify.args = {
    children: 'Verify',
};