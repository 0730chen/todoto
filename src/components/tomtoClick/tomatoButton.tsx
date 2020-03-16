import React from "react";
import {Button, Input} from "antd";
import axios from '../../config/axios'
import CouterDown from "./CouterDown";
import CountdownHook from "./CounterDownHooks";

interface ITomatoProps {
    startTomato: () => void
    unfinedTomato: any,
    updateTomato: (payload: any) => any
}

class TomatoButton extends React.Component<ITomatoProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            description: ''
        }
    }

    componentDidMount(): void {
        ;
    }

    EnterUp = (e: any) => {
        const key = e.keyCode
        if (key === 13 && this.state.description !== '') {
            console.log('enter')
            this.description()
        } else {
        }
    }
    onFinish = () => {
        this.render()
    }
    description = async () => {
        try {
            const response = await axios.put(`tomatoes/${this.props.unfinedTomato.id}`, {
                description: this.state.description,
                ended_at: new Date()
            })
            this.props.updateTomato(response.data.resource)
            this.setState(() => ({
                description: ''
            }))
        } catch (e) {
            throw new Error(e)
        }
    }

    render() {
        let html = <div/>
        if (this.props.unfinedTomato === undefined) {
            html = <Button className="startTime" onClick={this.props.startTomato}>开始计时</Button>
        } else {
            const startAt = Date.parse(this.props.unfinedTomato.started_at)
            const duration = this.props.unfinedTomato.duration
            const time = new Date().getTime()
            console.log(time, startAt, duration)
            if (time - startAt > duration) {
                html = <div>
                    <Input placeholder="请输入你的任务" value={this.state.description}
                           onChange={e => this.setState({description: e.target.value})} onKeyUp={e => this.EnterUp(e)}/>
                </div>
            } else if (time - startAt < duration) {
                const timer = duration - time + startAt
                html = <CountdownHook timer={timer} onFinish={this.onFinish}/>
            }
        }

        return (
            <div>
                {html}
            </div>
        )
    }
}

export default TomatoButton