import React from "react";
import {Input} from 'antd';
import {EnterOutlined} from '@ant-design/icons';
import {addTodo, updateTodo} from "../../redux/actions";
import {connect} from "react-redux";
import axios from '../../config/axios'

interface TodoInputState {
    description: string

}

interface addTodoProps {
    addTodo: (payload: any) => any
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
            this.postTodo()
        } else {
        }
    }
    postTodo = async () => {
        if (this.state.description === '') {
        } else {
            try {
                const response = await axios.post('todos', {description: this.state.description})
                this.props.addTodo(response.data.resource)
                this.setState(() => ({
                    description: ''
                }))
            } catch (e) {
                throw new Error(e)
            }
        }

    }

    render() {
        const {description} = this.state
        return (
            <div>
                <Input placeholder="输入新任务内容" suffix={description ? <EnterOutlined onClick={this.postTodo}/> : <></>}
                       onChange={this.onChange}
                       value={description} onKeyUp={this.EnterUp}/>
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

const mapDispatchToProps = {
    addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput)