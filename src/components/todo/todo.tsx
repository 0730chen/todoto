import React from "react";
import TodoInput from "./todoInput";
import axios from '../../config/axios'
import './todos.scss'

class Todo extends React.Component {

    addTodo = async (params: any) => {
        console.log(params)
        try {
            const response = await axios.post('todo', params)
            console.log(response.data);
        } catch (e) {
            throw Error(e)
        }
    }

    render() {
        return (
            <div className="Todos" id="Todos">
                <TodoInput addTodo={(params: any) => {
                    this.addTodo(params)
                }}/>
            </div>
        )
    }
}

export default Todo