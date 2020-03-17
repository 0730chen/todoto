import {ADD_TOMOTO, INIT_TOMATO, UPDATE_TOMATO} from "../actionType";

const tomato = (state: any[] = [], action: any) => {
    switch (action.type) {
        case INIT_TOMATO:
            return [...action.payload]
        case ADD_TOMOTO:
            return [action.payload, ...state]
        case UPDATE_TOMATO:
            console.log(1)
            return state.map(t => {
                if (t.id === action.payload.id) {
                    return action.payload
                } else {
                    return t
                }
            })
        default:
            return state
    }
}
export default tomato