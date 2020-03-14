import React from "react";
import axios from '../../config/axios'
import {Input, Button} from 'antd';
import {UserOutlined, UnlockOutlined} from '@ant-design/icons';


class SignUp extends React.Component<any> {
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
        const {account, password, passwordConformation} = this.state;
        console.log(account,password,passwordConformation);
        try {
            await axios.post('sign_up/user', {
                account,
                password,
                password_confirmation: passwordConformation,
            })
            console.log('ok')
        } catch (e) {
            throw Error(e)
        }
    }

    render() {
        // @ts-ignore
        const {account, password, passwordConformation} = this.state;
        return (
            <div className='SignUp'>
                <Input placeholder="请输入你的账号" prefix={<UserOutlined/>} value={account} onChange={this.onChangeAccount}/>
                <Input.Password placeholder="请输入你的密码" prefix={<UnlockOutlined/>} value={password}
                                onChange={this.onChangePassword}/>
                <Input.Password placeholder="确认密码" prefix={<UnlockOutlined/>} value={passwordConformation}
                                onChange={this.onChangePasswordConformation}/>
                <Button type="primary" onClick={this.submit}>注册</Button>
            </div>
        )
    }
}

export default SignUp