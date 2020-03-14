import React from "react";
import axios from '../../config/axios'
import {Input, Button} from 'antd';
import {UserOutlined, UnlockOutlined,LockOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";


class Login extends React.Component<any> {
    constructor(props: any) {
        super(props)
        this.state = {
            account: '',
            password: '',
            passwordConformation: ''
        }
    }

    onChangeAccount = (e: any) => {
        const account = e.target.value
        this.setState((state) => ({
            account: account
        }))
    }
    onChangePassword = (e: any) => {
        const password = e.target.value
        this.setState((state) => ({
            password: password
        }))
    }
    onChangePasswordConformation = (e: any) => {
        const psc = e.target.value
        this.setState(() => ({
            passwordConformation: psc
        }))
    }
    submit = async () => {
        // @ts-ignore
        const {account, password} = this.state;
        try {
            await axios.post('sign_in/user', {
                account,
                password,
            })
            this.props.history.push('/')
        } catch (e) {
            throw Error(e)
        }
    }

    render() {
        // @ts-ignore
        const {account, password, passwordConformation} = this.state;
        return (
            <div className='SignUp'>
                <h3>土豆时钟</h3>
                <Input placeholder="请输入你的账号" prefix={<UserOutlined/>} value={account} onChange={this.onChangeAccount}/>
                <Input.Password placeholder="请输入你的密码" prefix={<UnlockOutlined/>} value={password}
                                onChange={this.onChangePassword}/>
                <Button type="primary" className="register" onClick={this.submit}>登陆</Button>
                <p>如果你没有账号，请点击<Link  to="/signup" className="login">注册</Link></p>
            </div>
        )
    }
}

export default Login