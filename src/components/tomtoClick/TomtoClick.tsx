import React from 'react'
import './tomto.scss'
import TomatoButton from "./tomatoButton";
import {connect} from "react-redux";
import {addTomato, initTomato, updateTomato} from "../../redux/actions";
import axios from "../../config/axios";
import _ from 'lodash'
import {format, parseISO} from 'date-fns'
import TomatoList from "./tomatoList";

interface ITomatoProps {
    initTomato: (payload: any) => any,
    tomato: any[],
    addTomato: (payload: any) => any,
    updateTomato: (payload: any) => any
}

class TomtoClick extends React.Component<ITomatoProps, any> {
    constructor(props: any) {
        super(props)
    }

    get unfinedTomato() {
        return this.props.tomato.filter(t => !t.description && !t.ended_at && !t.aborted)[0]
    }

    get finishedTomatoList() {
        const finisnedTomato = this.props.tomato.filter(t => t.description && t.ended_at)
        const obj = _.groupBy(finisnedTomato, (tomato) => {
            return format((parseISO(tomato.started_at)), 'yyyy-mm-d')
        })
        return obj
    }

    componentDidMount(): void {
        this.getTomato()
    }

    getTomato = async () => {
        try {
            const response = await axios.get('tomatoes')
            console.log(response.data.resources);
            this.props.initTomato(response.data.resources)
        } catch (e) {
            throw new Error(e)

        }
    }

    startTomto = async () => {
        try {
            const response = await axios.post('tomatoes', {duration: 25 * 60 * 1000})
            this.props.addTomato(response.data.resource)
        } catch (e) {
            throw new Error(e)
        }
    }

    render() {
        return (
            <div className="TomtoClick" id="TomtoClick">
                <TomatoButton startTomato={this.startTomto} unfinedTomato={this.unfinedTomato}
                              updateTomato={this.props.updateTomato}/>
                <TomatoList finishedTomatoList={this.finishedTomatoList}/>
            </div>
        )
    }
}

// const mapStateToProps = (state: any, ownProps: any) => {
//     console.log(state)
// }
const mapStateToProps = (state: any, ownProps: any) => ({
    tomato: state.tomoto,
    ...ownProps
})

const mapDispatchToProps = {
    addTomato,
    initTomato,
    updateTomato,
}


export default connect(mapStateToProps, mapDispatchToProps)(TomtoClick)