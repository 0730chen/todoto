import React from "react";
import {Button} from "antd";
import axios from '../../config/axios'

interface IRouter {
    history: any
}

interface IndexState {
    user: any
}

class Index extends React.Component<IRouter, IndexState> {
    constructor(props: any) {
        super(props)
        this.state = {
            user: {}
        }
    }

    login = () => {
        this.props.history.push('/login')
    }

    async componentWillMount() {
        await this.getMe()
    }

    getMe = async () => {
        try {
            const response = await axios.get('/me')
            this.setState((state) => ({
                user: response.data
            }))
        } catch (e) {
            throw Error('获取失败')
        }
    }

    render() {
        return (
            <div>
                <div>欢迎</div>
                <p>{this.state.user.account}</p>
                <Button type="primary" onClick={this.login}>登出</Button>
            </div>

        )
    }
}

export default Index