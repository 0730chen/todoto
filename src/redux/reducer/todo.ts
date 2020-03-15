import {ADD_TODO, INIT_TODO} from '../actionType'

const todos = (state = [], action: any) => {
    switch (action.type) {
        case ADD_TODO:
            return [state, ...action.paylaod]
        case INIT_TODO:
            return [...action.payload]
        default:
            return state;
    }
}
export default todos
