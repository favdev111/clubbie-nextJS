import React from 'react';

import LoginPage from '../pages/login';

export default {
    title: 'Pages/Login',
    component: LoginPage,
};

const Template = (args) => <LoginPage {...args} />;

export const Login = Template.bind({});
