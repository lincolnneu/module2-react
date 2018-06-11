import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import WidgetContainer from "../components/widgets";

class WidgetList extends Component{
    constructor(props){
        super(props);
        this.props.findAllWidgets()
    }
    render(){
        return(
            <div>
                <h1>Widget List {this.props.widgets.length}</h1>
                <button onClick={this.props.save}>Save</button>
                <ul>
                    {this.props.widgets.map(widget =>(
                        <WidgetContainer widget={widget}
                                         key={widget.id}/>
                    ))}
                </ul>
                <button onClick={this.props.addWidget}>Add widget</button>
            </div>

        )
    }
}

const stateToPropertiesMapper = (state) =>(
    {
        widgets: state.widgets
    }
)

const dispatcherToPropsMapper = dispatch =>({
    findAllWidgets: () => actions.findAllWidgets(dispatch),
    addWidget: () => actions.addWidget(dispatch),
    save: () => actions.save(dispatch)
})



const App = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(WidgetList)

export default App