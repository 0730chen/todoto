import React from "react";

interface ICounterProps {
    timer: number,
    onFinish: () => any
    duration: number
}

interface CouterDownState {
    countDown: number
}

let timeID: NodeJS.Timeout

class CouterDown extends React.Component<ICounterProps, CouterDownState> {
    constructor(props: any) {
        super(props)
        this.state = {
            countDown: this.props.timer
        }
    }

    componentDidMount(): void {
        timeID = setInterval(() => {
            let timer = this.state.countDown
            this.setState(() => ({countDown: timer - 1000})
            )
            if (timer < 1000) {
                this.props.onFinish()
                clearInterval(timeID)
            }
        }, 1000)
    }

    componentWillUnmount(): void {
        clearInterval(timeID)
    }

    render() {
        const min = Math.floor(this.state.countDown / 1000 / 60)
        const second = Math.floor(this.state.countDown / 1000 % 60)
        const porcess = 1 - this.state.countDown / this.props.duration
        return (
            <div className="Countdown" style={{textAlign: "center"}}>
                <span className="resetTime">{min}:{second > 9 ? second : `0${second}`}</span>
                <div className="progress" style={{width: `${porcess * 100}%`}}/>
            </div>
        )
    }
}

export default CouterDown