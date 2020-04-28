import React from "react";
import axios from '../../config/axios'
import {Form, Input, Button} from 'antd';
import {UserOutlined, UnlockOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
}

class Login extends React.Component<any> {
    constructor(props: any) {
        super(props)
        this.state = {
            account: '',
            password: '',
            passwordConformation: ''
        }
    }

    onFinish = (values: any) => {
        console.log('Success:', values);
        this.submit()
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
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
            let res = await axios.post('sign_in/user', {
                account,
                password,
            })
            // this.props.history.push('/')
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        // @ts-ignore
        const {account, password, passwordConformation} = this.state;
        return (
            <div className='SignUp'>
                <h3>土豆时钟</h3>
                <Form {...layout}
                      name="basic"
                      initialValues={{remember: true}}
                      onFinish={this.onFinish}
                      onFinishFailed={this.onFinishFailed}>
                    <Form.Item label="用户名" name="username" {...layout} rules={[{required: true, message: '请输入你的账号'}]}>
                        <Input placeholder="请输入你的账号" prefix={<UserOutlined/>} value={account}
                               onChange={this.onChangeAccount}/>
                    </Form.Item>
                    <Form.Item label="密码" name="password" {...layout} rules={[{required: true, message: '请输入你的密码!'}]}>
                        <Input.Password placeholder="请输入你的密码" prefix={<UnlockOutlined/>} value={password}
                                        onChange={this.onChangePassword}/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary"  htmlType={"submit"}>
                            登 陆
                        </Button>
                        <p>如果你没有账号，请点击<Link to="/signup" className="login">注册</Link></p>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Login