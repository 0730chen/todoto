import React from "react";
import {Checkbox} from "antd";

interface TodoItemProps {
    id: number
    description: string
    completed: boolean
    update: (id: number, params: any) => {}
}

class TodoItem extends React.Component<any> {
    constructor(props: any) {
        super(props)
    }

    update = (params: any) => {
        this.props.update(this.props.id, params)
    }

    render() {
        return (
            <div>
                <Checkbox checked={this.props.completed} onChange={e => {
                    this.update({completed: e.target.checked})
                }}>{this.props.description}</Checkbox>
            </div>
        )
    }
}

export default TodoItem