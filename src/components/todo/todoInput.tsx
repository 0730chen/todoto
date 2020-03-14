import React from "react";
import {Input} from 'antd';
import {EnterOutlined} from '@ant-design/icons';

interface TodoInputState {
    description: string

}

interface addTodoProps {
    addTodo: (pramas: any) => any
}

class TodoInput extends React.Component<any, TodoInputState> {

    constructor(props: any) {
        super(props)
        this.state = {
            description: ''
        }
    }

    onChange = (e: any) => {
        const value = e.target.value
        this.setState((state) => ({
            description: value
        }))
    }
    EnterUp = (e: any) => {
        const key = e.keyCode
        if (key === 13 && this.state.description !== '') {
            this.props.addTodo({description: this.state.description})
            this.setState(() => ({
                description: ''
            }))
        } else {
        }
    }
    addTodo = () => {
        if (this.state.description === '') {
        } else {
            this.props.addTodo({description: this.state.description})
            this.setState(() => ({
                description: ''
            }))
        }

    }

    render() {
        const {description} = this.state
        return (
            <div>
                <Input placeholder="输入新任务内容" suffix={description ? <EnterOutlined onClick={this.addTodo}/> : <></>}
                       onChange={this.onChange}
                       value={description} onKeyUp={this.EnterUp}/>
            </div>
        )
    }
}

export default TodoInput