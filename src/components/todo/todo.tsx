import React from "react";
import {connect} from "react-redux";
import TodoInput from "./todoInput";
import axios from '../../config/axios'
import './todos.scss'
import TodoItem from "./todoItem";
import {addTodo} from "../../redux/actions";


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


    get unDeletedTodos() {
        return this.state.todos.filter(t => !t.deleted)
    }

    get unCompeltedTodos() {
        return this.state.todos.filter(t => !t.completed)
    }

    get CompeltedTodos() {
        return this.state.todos.filter(t => t.completed)
    }

    componentDidMount(): void {
        this.getTodos()
    }

    getTodos = async () => {
        try {
            const response = await axios.get('todos')
            const todos = response.data.resources.map((t: any) => {
                return Object.assign({}, t, {editing: false})
            })
            this.setState(() => ({
                todos: todos
            }))
        } catch (e) {
            throw Error(e)
        }
    }
    updateTodo = async (id: number, params: any) => {
        const {todos} = this.state
        try {
            const response = await axios.put(`todos/${id}`, params)
            const newTodos = todos.map(t => {
                if (id === t.id) {
                    return response.data.resource
                } else {
                    return t
                }
            })
            this.setState(() => ({
                todos: newTodos
            }))
        } catch (e) {
            throw Error(e)
        }
    }
    onEdit = (id: number) => {
        const {todos} = this.state
        const newTodos = todos.map(t => {
            if (id === t.id) {
                return Object.assign({}, t, {editing: true})
            } else {
                return Object.assign({}, t, {editing: false})
            }
        })
        this.setState(() => ({
            todos: newTodos
        }))

    }

    render() {
        return (
            <div className="Todos" id="Todos">
                <TodoInput/>
                <div className="todoList">
                    {this.unCompeltedTodos.map((t) => <TodoItem key={t.id} {...t} update={this.updateTodo}
                                                                toEdit={this.onEdit}/>)}
                </div>
                <div>
                    {this.CompeltedTodos.map((t) => <TodoItem key={t.id} {...t} update={this.updateTodo}
                                                              toEdit={this.onEdit}/>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

const mapDispatchToProps = () => ({
    addTodo
})
// const mapStateToProps = (state: any, ownProps: any) => {
//     ({
//         todos: state.todos,
//         ...ownProps
//     })
// }

export default connect(mapStateToProps, mapDispatchToProps)(Todo)