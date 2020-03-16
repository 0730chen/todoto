import {ADD_TOMOTO, INIT_TOMATO} from "../actionType";

const tomato = (state: any[] = [], action: any) => {
    switch (action.type) {
        case INIT_TOMATO:
            return [...action.payload]
        case ADD_TOMOTO:
            return [action.payload, ...state]
        default:
            return state
    }
}
export default tomato