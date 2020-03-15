import {combineReducers} from "redux";
import todo from './todo'

function rootReducer(state = 0, action: any) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;

    }
}

export default combineReducers({todo})