import React from "react";
import {Button, Input, Modal} from "antd";
import axios from '../../config/axios'
import CouterDown from "./CouterDown";
import {CloseOutlined} from '@ant-design/icons';
import CountdownHook from "./CounterDownHooks";
import './tomatoButton.scss'

interface ITomatoProps {
    startTomato: () => void
    unfinedTomato: any,
    updateTomato: (payload: any) => any
}

class TomatoButton extends React.Component<ITomatoProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            description: '',
            visible: false,
        }
    }

    componentDidMount(): void {

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e: any) => {
        this.setState({
            visible: false,
        });
        this.updateTomato({aborted: true})
    };

    handleCancel = (e: any) => {
        this.setState({
            visible: false,
        });
    };

    EnterUp = (e: any) => {
        const key = e.keyCode
        if (key === 13 && this.state.description !== '') {
            this.description()
        } else {
        }
    }
    onFinish = () => {
        this.forceUpdate()
    }
    CancelTomato = async () => {
        this.setState({
            visible: true,
        });
    }
    updateTomato = async (params: any) => {
        try {
            const response = await axios.put(`tomatoes/${this.props.unfinedTomato.id}`, params)
            console.log(response.data.resource)
            this.props.updateTomato(response.data.resource)
        } catch (e) {
            throw new Error(e)
        }

    }
    description = () => {
        this.updateTomato({
            description: this.state.description,
            ended_at: new Date()
        })
        this.setState(() => ({
            description: ''
        }))
    }

    render() {
        let html = <div/>
        console.log(this.props.unfinedTomato);
        if (this.props.unfinedTomato === undefined) {
            html = <Button className="startTime" onClick={this.props.startTomato}>开始计时</Button>
        } else {
            const startAt = Date.parse(this.props.unfinedTomato.started_at)
            const duration = this.props.unfinedTomato.duration
            const time = new Date().getTime()
            if (time - startAt > duration) {
                html = <div>
                    <Input placeholder="请输入你的任务" value={this.state.description}
                           onChange={e => this.setState({description: e.target.value})} onKeyUp={e => this.EnterUp(e)}/>
                </div>
            } else if (time - startAt < duration) {
                const timer = duration - time + startAt
                console.log(timer);
                html = <div className="Couter-wrapper">
                    <CouterDown timer={timer} onFinish={this.onFinish} duration={duration}/>
                    <CloseOutlined onClick={this.CancelTomato}/>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel} cancelText="取消" okText="确定">
                        <p>确定要取消倒计时吗</p>
                    </Modal>
                </div>
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