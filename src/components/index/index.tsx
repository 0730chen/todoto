import React from "react";
import {Button} from "antd";

class Index extends React.Component<any>{
    constructor(props: any) {
        super(props)
    }

    login = () => {
        console.log(this.props)
        this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <Button onClick={this.login}>登陆</Button>
            </div>

        )
    }
}

export default Index