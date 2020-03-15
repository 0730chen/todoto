import React from "react";
import {Checkbox, Input} from "antd";
import {EnterOutlined, DeleteOutlined} from '@ant-design/icons';
import './todoitem.scss'
import {connect} from "react-redux";
import ClassName from 'classname'
import {addTodo, initTodos, toEdit, updateTodo} from "../../redux/actions";
import axios from "../../config/axios";

interface TodoItemProps {
    id: number
    description: string
    completed: boolean
    update: (id: number, params: any) => {}
    editing: boolean,


}

interface TodoItemState {
    EditText: string
}

class TodoItem extends React.Component<any, TodoItemState> {
    constructor(props: any) {
        super(props)
        this.state = {
            EditText: this.props.description
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
    edit = () => {
        this.props.toEdit(this.props.id)
    }
    onEditText = (e: any) => {
        const text = e.target.value
        this.setState((state) => ({
            EditText: text
        }))

    }
    EnterUp = (e: any) => {
        const key = e.keyCode
        if (key === 13 && this.state.EditText !== '') {
            this.props.update(this.props.id, {description: this.state.EditText})
            this.setState(() => ({
                EditText: ''
            }))
        } else {
        }
    }

    render() {
        const Edit = (
            <div className="Editer">
                <Input type="text" value={this.state.EditText} onChange={this.onEditText} onKeyUp={this.EnterUp}/>
                <div className="icon-wrapper">
                    <EnterOutlined onClick={this.EnterUp}/>
                    <DeleteOutlined onClick={e => this.updateTodo(this.props.id, {deleted: true})}/>
                </div>
            </div>
        )
        const span = (
            <span className="text-wrapper">
                    <span>{this.props.description}</span>
                    </span>
        )
        const todoItemclassNane = ClassName({
            TodoItem: true,
            editing: this.props.editing,
            completed: this.props.completed
        })
        return (
            <div className={todoItemclassNane} id="todoItem" onDoubleClick={this.edit}>
                <Checkbox checked={this.props.completed} onChange={e => {
                    this.updateTodo(this.props.id, {completed: e.target.checked})
                }}/>
                {this.props.editing ? Edit :
                    span
                }
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

const mapDispatchToProps = {
    updateTodo,
    toEdit
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)