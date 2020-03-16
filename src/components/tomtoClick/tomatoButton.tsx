import React from "react";
import {Button} from "antd";
import axios from '../../config/axios'

class TomatoButton extends React.Component {


    startTomto = async () => {
        try {
            const response = await axios.post('tomatoes', {duration: 25 * 60 * 1000})
            console.log(response.data);
        } catch (e) {
            throw new Error(e)
        }
    }

    render() {
        return (
            <div>
                <Button onClick={this.startTomto}>开始时间</Button>
            </div>
        )
    }
}

export default TomatoButton