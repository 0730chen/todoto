import React from "react";
import './tomto.scss'
import TomatoButton from "./tomatoButton";
import {connect} from "react-redux";
import {addTomato, initTomato} from "../../redux/actions";

class TomtoClick extends React.Component {

    render() {
        return (
            <div className="TomtoClick" id="TomtoClick">
                <TomatoButton/>
                TomtoClick
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todos,
    ...ownProps
})

const mapDispatchToProps = {
    addTomato,
    initTomato
}


export default connect(mapStateToProps, mapDispatchToProps)(TomtoClick)