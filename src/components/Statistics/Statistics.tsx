import React from "react";
import './Statistics.scss'
import {connect} from "react-redux";

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

    render() {
        return (
            <div className="Statistics" id="Statistics">
                < ul>
                    <li>统计</li>
                    <li>目标</li>
                    <li>番茄历史</li>
                    <li>累计完成<span id="finished">{this.finishedTodos.length}</span>个任务</li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(Statistics)