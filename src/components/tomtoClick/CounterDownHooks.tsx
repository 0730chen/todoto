import React, {useState, useEffect} from "react";

// @ts-ignore
let timeID:NodeJS.TimeOut
const CountdownHook = (props: any) => {
    const [CountDown, setCountDown] = useState(props.timer)
    const min = Math.floor(CountDown / 1000 / 60)
    const second = Math.floor(CountDown / 1000 % 60)
    const timer = `${min}:${second > 10 ? second : `0${second}`}`
    useEffect(() => {
        document.title = `${timer}-土豆倒计时`
        timeID = setInterval(() => {
            let timer = CountDown
            setCountDown(CountDown - 1000)
            if (timer < 0) {
                props.onFinish()
                clearInterval(timeID)
            }
        }, 1000)
        return function clearup() {
            clearInterval(timeID)
        }
    })

    //实现componentWillunMounted
    return (
        <div>{timer}</div>
    )
}

export default CountdownHook