import {ADD_TODO, INIT_TODO} from "./actionType";

export const addTodo = (payload: any) => {
    return {
        type: ADD_TODO,
        payload
    }
}
export const initTodos = (payload: any[]) => {
    return {
        type: INIT_TODO,
        payload

    }
}