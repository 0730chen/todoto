import React from "react";
import {Button} from "antd";
import axios from '../../config/axios'

interface ITomatoProps {
    startTomato: () => void
    unfinedTomato: () => any
}

class TomatoButton extends React.Component<ITomatoProps> {
    constructor(props: any) {
        super(props)
        console.log(props)
    }


    render() {
        return (
            <div>
                <Button onClick={() => {
                    this.props.startTomato()
                }}>开始时间</Button>
            </div>
        )
    }
}

export default TomatoButton