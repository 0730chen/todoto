import React from "react";
import './tomto.scss'
import TomatoButton from "./tomatoButton";
import {connect} from "react-redux";
import {addTomato, initTomato} from "../../redux/actions";
import axios from "../../config/axios";

interface ITomatoProps {
    tomato: any[],
    addTomato: (payload: any) => any
}

class TomtoClick extends React.Component<ITomatoProps> {
    constructor(props: any) {
        super(props)
    }

    get unfinedTomato() {
        return this.props.tomato.filter(t => !t.description && !t.ended_at)[0]
    }

    componentDidMount(): void {
        this.getTomato()
    }

    getTomato = async () => {
        try {
            const response = await axios.get('tomatoes')
            console.log(response.data)

        } catch (e) {
            throw new Error(e)

        }
    }

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
            <div className="TomtoClick" id="TomtoClick">
                <TomatoButton startTomato={this.startTomto} unfinedTomato={this.unfinedTomato}/>
                TomtoClick
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
    initTomato
}


export default connect(mapStateToProps, mapDispatchToProps)(TomtoClick)