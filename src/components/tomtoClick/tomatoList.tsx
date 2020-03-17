import React from "react";
import {format, parseISO} from 'date-fns'

interface TomatoListProps {
    finishedTomatoList: any
}

const TomatoItem = (props: any) => {
    return (
        <div className="Time-Item">
            <span>{format(parseISO(props.started_at), 'h:mm')}-{format(parseISO(props.ended_at), 'h:mm')}</span>
            <span>{props.description}</span>
        </div>
    )
}

class TomatoList extends React.Component<TomatoListProps> {
    constructor(props: any) {
        super(props)
        console.log(this.props);
    }

    get datesSort() {
        const dates = Object.keys(this.props.finishedTomatoList)
        return dates.sort((a, b) => Date.parse(b) - Date.parse(a))
    }

    componentDidMount(): void {
        console.log(this.props);
    }

    render() {
        const List = this.datesSort.map(d => {
            const tomatoes = this.props.finishedTomatoList[d]
            return (
                <div key={d}>
                    <div className="Title">
                        <span>{d}</span>
                        <span>完成了{tomatoes.length}个任务</span>
                    </div>
                    {
                        tomatoes.map((t: any) => {
                            return <TomatoItem key={t.id} {...t}/>
                        })
                    }
                </div>
            )

        })
        return (
            <div className="TomatoList">
                {List}
            </div>
        )
    }
}

export default TomatoList