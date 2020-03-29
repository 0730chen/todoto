import React from "react";


interface PolygonProps {
    data: any
    totalFinishedCount: number

}

class Polygon extends React.Component<PolygonProps, any> {

    constructor(props: any) {
        super(props)
    }

    point = () => {
        const dates = Object.keys(this.props.data).sort((a, b) => {
            return Date.parse(a) - Date.parse(b)
        })
        console.log(dates)
        const firstDay = dates.filter((t) => {
            if (Date.parse(t)) {
                return t[0]
            }
        })
        console.log(firstDay, Date.parse(firstDay[0]))
        if (firstDay && Date.parse(firstDay[0])) {
            console.log('开始绘制')
            const lastDay = dates[dates.length - 1]
            const range = Date.parse(lastDay) - Date.parse(firstDay[0])
            let finishCount = 0
            let FinishY
            console.log(typeof firstDay);
            const point = dates.map(date => {
                const x = (Date.parse(date) - Date.parse(firstDay[0])) / range * 240
                finishCount += this.props.data[date].length
                const y = (1 - finishCount / this.props.totalFinishedCount) * 60
                FinishY = y
                return `${x},${y}`
            })
            return ['0,60', ...point, `40,${FinishY}`, '240,60'].join('')
        } else {
            return "0,60,240,60,0,60"
        }
    }


    render() {
        return (
            <div>
                <svg>
                    {console.log(this.point())}
                    <polygon fill="rgba(215,78,78,0.1)" stroke="rgba(215,78,78,0.5)" strokeWidth="1"
                             points={this.point()}/>
                </svg>
            </div>
        )
    }
}

export default Polygon