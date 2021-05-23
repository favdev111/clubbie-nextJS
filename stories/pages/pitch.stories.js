import React from "react";
import PitchPage from '../../pages/pitch';
import {Provider} from "react-redux";
import store from "../../redux/store";

export default {
    title: 'Pages/Pitch',
    component: PitchPage,
    decorators: [
        (Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
}


const Template = (args) => <PitchPage {...args} />

export const Pitch = Template.bind();
