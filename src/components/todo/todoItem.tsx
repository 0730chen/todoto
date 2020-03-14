import React from "react";
import {Checkbox, Input} from "antd";
import {EnterOutlined, DeleteOutlined} from '@ant-design/icons';

interface TodoItemProps {
    id: number
    description: string
    completed: boolean
    update: (id: number, params: any) => {}
    editing: boolean
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

    update = (params: any) => {

        this.props.update(this.props.id, params)
    }
    edit = () => {
        console.log('edit')
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
                    <DeleteOutlined onClick={e => this.update({deleted: true})}/>
                </div>
            </div>
        )
        const span = (
            <span className="text-wrapper">
                    <span onDoubleClick={this.edit}>{this.props.description}</span>
                    </span>
        )
        return (
            <div>
                <Checkbox checked={this.props.completed} onChange={e => {
                    this.update({completed: e.target.checked})
                }}/>
                {this.props.editing ? Edit :
                    span
                }
            </div>
        )
    }
}

export default TodoItem