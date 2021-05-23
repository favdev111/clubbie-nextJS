import {combineReducers} from "redux";
import pitchReducer from "./pitchReducer";


const rootReducer = combineReducers({
    pitch: pitchReducer
});
export default rootReducer;
