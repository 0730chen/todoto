import {ADD_TODO, INIT_TODO, UPDATE_TODO, TO_EDIT} from '../actionType'

const todos = (state: any[] = [], action: any) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.paylaod]
        case  INIT_TODO:
            return [...state, ...action.payload]
        case UPDATE_TODO:
            return state.map(t => {
                if (t.id === action.payload.id) {
                    return action.payload
                } else {
                    return t
                }
            })
        case TO_EDIT:
            state.forEach(t => {
                if (t.id === action.payload) {
                    t.editing = true
                } else {
                    t.editing = false
                }
            })
            return state

        default:
            return state;
    }
}
export default todos
