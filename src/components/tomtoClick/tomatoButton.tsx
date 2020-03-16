import React from "react";
import {Button, Input} from "antd";
import axios from '../../config/axios'
import CouterDown from "./CouterDown";

interface ITomatoProps {
    startTomato: () => void
    unfinedTomato: any
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
    description = async () => {
        try {
            const response = await axios.put(`tomatoes/${this.props.unfinedTomato.id}`, {description: this.state.description})
            console.log(response.data);
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
            html = <Button className="startTime" onClick={this.props.startTomato}>开始记录</Button>
        } else {
            const startAt = Date.parse(this.props.unfinedTomato.started_at)
            const duration = this.props.unfinedTomato.duration
            const time = new Date().getTime()
            if (time - startAt > duration) {
                html = <div>
                    <Input value={this.state.description}
                           onChange={e => this.setState({description: e.target.value})} onKeyUp={e => this.EnterUp(e)}/>
                </div>
            } else if (time - startAt < duration) {
                html = <CouterDown></CouterDown>
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