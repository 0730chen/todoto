import {ADD_TOMOTO} from "../actionType";

const tomato = (state: any[] = [], action: any) => {
    switch (action.type) {
        case ADD_TOMOTO:
            return [action.payload, ...state]
        default:
            return state
    }
}
export default tomato