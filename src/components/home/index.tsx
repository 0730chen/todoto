import React from "react";
import {Dropdown, Menu} from "antd";
import axios from '../../config/axios'
import {LogoutOutlined, DownOutlined, UserOutlined} from '@ant-design/icons';
import './index.scss'
import history from "../../config/history";
import Todo from "../todo/todo";
import TomtoClick from "../tomtoClick/TomtoClick";

interface IRouter {
    history: any
}

interface IndexState {
    user: any
}

const logout = () => {
    history.push('/login')
}
const menu = (
    <Menu>
        <Menu.Item key="1">
            个人设置<UserOutlined/>
        </Menu.Item>
        <Menu.Item key="2" onClick={logout}>
            注销 <LogoutOutlined/>
        </Menu.Item>
    </Menu>
);

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
            <div className="index" id="index">
                <header>
                    <span>Logo</span>
                    <Dropdown.Button overlay={menu} icon={<DownOutlined/>}>
                        {/*<span>{this.state.user.account}</span>*/}
                        {this.state.user.account}
                    </Dropdown.Button>
                </header>
                <main>
                    <TomtoClick/>
                    <Todo/>
                </main>
            </div>

        )
    }
}

export default Index