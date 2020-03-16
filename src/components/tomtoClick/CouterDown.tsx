import React from "react";

interface ICounterProps {
    timer: number
}

interface CouterDownState {
    countDown: number
}


class CouterDown extends React.Component<ICounterProps, CouterDownState> {
    constructor(props: any) {
        super(props)
        this.state = {
            countDown: this.props.timer
        }
    }

    componentDidMount(): void {
        setInterval(() => {
            let timer = this.state.countDown
            this.setState(() => ({countDown: timer - 1000})
            )
            if (timer < 0) {
                //TODO 父组件完成倒计时
            }
        }, 1000)
    }

    render() {
        const min = Math.floor(this.state.countDown / 1000 / 60)
        const second = Math.floor(this.state.countDown / 1000 % 60)
        return (
            <div>{min}:{second > 10 ? second : `0${second}`}</div>
        )
    }
}

export default CouterDown