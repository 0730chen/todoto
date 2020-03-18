import React from "react";
import './Statistics.scss'
import {connect} from "react-redux";
import Polygon from "./polygon";
import _ from "lodash";
import {format, parseISO} from "date-fns";
import TodoHistory from "./TodoHistory";

interface StatisticsProps {
    todos: any[]
}

class Statistics extends React.Component<StatisticsProps> {

    constructor(props: any) {
        super(props)
    }

    get finishedTodos() {
        return this.props.todos.filter(t => t.completed && !t.deleted)
    }

    get dailyTodos() {

        const obj = _.groupBy(this.finishedTodos, (todo) => {
            return format((parseISO(todo.updated_at)), 'yyyy-mm-d')
        })
        return obj

    }

    render() {
        return (
            <div className="Statistics" id="Statistics">
                < ul>
                    <li>统计</li>
                    <li>目标</li>
                    <li>番茄历史</li>
                    <li>累计完成<span id="finished">{this.finishedTodos.length}</span>
                        <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
                    </li>
                </ul>
                <TodoHistory/>
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(Statistics)