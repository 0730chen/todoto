import React from "react";
import TodoInput from "./todoInput";
import axios from '../../config/axios'
import './todos.scss'

interface TodoState {
    todos: any[]
}

class Todo extends React.Component <any, TodoState> {
    constructor(props: any) {
        super(props)
        this.state = {
            todos: []
        }
    }

    addTodo = async (params: any) => {
        const {todos} = this.state
        try {
            const response = await axios.post('todos', params)
            const todoRs = response.data.resource
            this.setState(() => ({
                todos: [...todos, todoRs]
            }))
        } catch (e) {
            throw Error(e)
        }
    }

    componentDidMount(): void {
        this.getTodos()
    }

    getTodos = async () => {
        try {
            const response = await axios.get('todos')
            const todos = response.data.resources
            this.setState(() => ({
                todos: todos
            }))
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
                <div>
                    {this.state.todos.map((t) => {
                        return <li key={t.id}>{t.description}</li>
                    })}
                </div>
            </div>
        )
    }
}

export default Todo