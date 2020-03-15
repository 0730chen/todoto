import {ADD_TODO, INIT_TODO, UPDATE_TODO, TO_EDIT} from "./actionType";

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

export const updateTodo = (payload: any) => {
    return {
        type: UPDATE_TODO,
        payload
    }
}
export const toEdit = (payload: number) => {
    return {
        type: TO_EDIT,
        payload
    }
}