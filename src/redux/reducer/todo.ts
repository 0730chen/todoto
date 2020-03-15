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
            return state.map(t => {
                if (t.id === action.payload) {
                    return Object.assign({}, t, {editing: true})
                } else {
                    return Object.assign({}, t, {editing: false})
                }
            })

        default:
            return state;
    }
}
export default todos
