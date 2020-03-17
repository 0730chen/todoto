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
        console.log(this.props)
        const dates = Object.keys(this.props.data).sort((a, b) => {
            return Date.parse(a) - Date.parse(b)
        })
        const firstDay = dates[0]
        if (firstDay && Date.parse(firstDay)) {
            const lastDay = dates[dates.length - 1]
            const range = Date.parse(lastDay) - Date.parse(firstDay)
            let finishCount = 0
            console.log(typeof firstDay);
            let s = "0,60 20,60 30,49.5 228,0 238,0 238,59.5"
            const point = dates.map(date => {
                const x = (Date.parse(date) - Date.parse(firstDay)) / range * 240
                finishCount += this.props.data[date].length
                const y = (1 - finishCount / this.props.totalFinishedCount) * 60
                return `${x},${y}`
            })
            return ['0,60', ...point, '240', '60'].join(' ')
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