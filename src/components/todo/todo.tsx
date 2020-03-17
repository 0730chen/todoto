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
        return this.props.todos.filter((t: { deleted: boolean; }) => !t.deleted)
    }

    get unCompeltedTodos() {
        return this.props.todos.filter((t: { completed: boolean; }) => !t.completed)
    }

    get CompeltedTodos() {
        return this.props.todos.filter((t: { completed: boolean; }) => t.completed)
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
            this.props.initTodos(todos)
        } catch (e) {
            throw Error(e)
        }
    }

    render() {
        return (
            <div className="Todos" id="Todos">
                <TodoInput/>
                <div className="todoList">
                    {this.unCompeltedTodos.map((t: any) => {
                        return <TodoItem key={t.id} {...t}/>
                    })}
                </div>
                {/*<div className="todoList">*/}
                {/*    {this.CompeltedTodos.map((t: any, index: number) => {*/}
                {/*        return <TodoItem key={index} {...t} />*/}
                {/*    })}*/}
                {/*</div>*/}
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