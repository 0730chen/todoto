import React from "react";
import {connect} from "react-redux";
import TodoInput from "./todoInput";
import axios from '../../config/axios'
import './todos.scss'
import TodoItem from "./todoItem";
import {initTodos, updateTodo, toEdit, addTodo} from "../../redux/actions";

class Todo extends React.Component <any> {
    constructor(props: any) {
        super(props)
    }

    get unDeletedTodos() {
        return this.props.todos.filter((t: { deleted: any; }) => !t.deleted)
    }

    get unCompeltedTodos() {
        return this.props.todos.filter((t: { completed: any; }) => !t.completed)
    }

    get CompeltedTodos() {
        return this.props.todos.filter((t: { completed: any; }) => t.completed)
    }

    componentDidMount(): void {
        this.getTodos()
        console.log(this.props);
    }

    getTodos = async () => {
        try {
            const response = await axios.get('todos')
            const todos = response.data.resources.map((t: any) => {
                return Object.assign({}, t, {editing: false})
            })
            this.props.initTodos(todos)
        } catch (e) {
            throw Error(e)
        }
    }
    updateTodo = async (id: number, params: any) => {
        try {
            const response = await axios.put(`todos/${id}`, params)
            this.props.updateTodo(response.data.resource)
        } catch (e) {
            throw Error(e)
        }
    }
    onEdit = (id: number) => {
        const {todos} = this.props
        const newTodos = todos.map((t: { id: number; }) => {
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
                    {this.unCompeltedTodos.map((t: any) => {
                        return <TodoItem key={t.id} {...t} update={this.updateTodo} toEdit={this.onEdit}/>
                    })}
                </div>
                <div>
                    {this.CompeltedTodos.map((t: any, index: number) => {
                        return <TodoItem key={index} {...t} update={this.updateTodo} toEdit={this.onEdit}/>
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

const mapDispatchToProps = {
    addTodo,
    initTodos,
    updateTodo,
    toEdit
}
export default connect(mapStateToProps, mapDispatchToProps)(Todo)