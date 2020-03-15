import {ADD_TODO} from '../actionType'

const todo = (state = [], action: any) => {
    switch (action.type) {
        case ADD_TODO:
            return [state, ...action.paylaod]
        default:
            return state;
    }
}
export default todo
