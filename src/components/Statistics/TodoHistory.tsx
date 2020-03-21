import React from "react";
import {format, parseISO} from "date-fns";
import {Tabs} from 'antd';
import _ from 'lodash'
import {connect} from "react-redux";
import './todoHistory.scss'

interface TodoHistoryProps {
    todos: any[]

}

const {TabPane} = Tabs;
const TodoItem = (props: any) => {
    return (
        <div>
            <span>{props.updated_at}</span>
            <span>{props.description}</span>
        </div>
    )
}

class TodoHistory extends React.Component<TodoHistoryProps> {

    constructor(props: any) {
        super(props)
    }

    callback = (key: any) => {
    }

    get finishedTodo() {
        return this.props.todos.filter(t => t.completed && !t.deleted)
    }

    get deletedTodo() {
        return this.props.todos.filter(t => t.deleted)
    }

    get dailyTodo() {
        const obj = _.groupBy(this.finishedTodo, (todo) => {
            if (Date.parse(parseISO(todo.updated_at).toISOString())) {
                return format(parseISO(todo.updated_at), 'yyyy-mm-d')
            }
        })
        return obj
    }

    get dailyDeleted() {
        const obj = _.groupBy(this.deletedTodo, (todo) => {
            if (Date.parse(parseISO(todo.updated_at).toISOString())) {
                return format(parseISO(todo.updated_at), 'yyyy-mm-d')
            }
        })

        return obj
    }

    get DeletedDates() {

        return Object.keys(this.dailyDeleted).sort((a, b) => Date.parse(b) - Date.parse(a))
    }

    get Finishdates() {
        return Object.keys(this.dailyTodo).sort((a, b) => Date.parse(b) - Date.parse(a))
    }

    render() {
        const todoList = this.Finishdates.map((date, index) => {
            return (
                <div key={index} className="Completed">
                    <div className="summary">

                        <div className="date">
                            <span>{date}</span>
                            <p>星期</p>
                        </div>
                        完成了{this.dailyTodo[date].length}个任务
                    </div>
                    <div className="description">
                        {this.dailyTodo[date].map((todo, index) => {
                            return <TodoItem key={index} {...todo}/>
                        })}
                    </div>
                </div>
            )
        })
        const DeletedtodoList = this.DeletedDates.map((date, index) => {
            console.log(this.deletedTodo[index]);
            console.log(this.deletedTodo)
            return (
                <div key={index} className="DeletedHistory">

                    <div className="data">{date}</div>
                    <div className="description">{this.deletedTodo[index].description}</div>
                </div>
            )
        })
        return (
            <div className="TodoHistory">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="已完成的任务" key="1">
                        {todoList}
                    </TabPane>
                    <TabPane tab="已删除的任务" key="2">
                        {DeletedtodoList}
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(TodoHistory)