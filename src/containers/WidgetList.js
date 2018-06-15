import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import WidgetContainer from "../components/widget";

class WidgetList extends Component{
    constructor(props){
        super(props);
        this.props.findAllWidgetsForTopic(this.props.topicId);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.topicId != this.props.topicId){
            this.props.findAllWidgetsForTopic(nextProps.topicId);
        }
    }

    render(){
        // console.log(this.props);
        let me = this;
        return(
            <div>
                <h1>Widget List {this.props.widgets.length}</h1>
                <button
                    hidden={this.props.previewMode}
                    onClick={function(){
                    me.props.save(me.props.topicId)
                    }
                }>Save</button>
                <button onClick={this.props.preview}>Preview</button>


                <ul>
                    {this.props.widgets.map(widget =>(
                        <WidgetContainer widget={widget}
                                         preview={this.props.previewMode}
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
        widgets: state.widgets,
        previewMode: state.preview
    }
)

const dispatcherToPropsMapper = dispatch =>({
    findAllWidgets: (topicId) => actions.findAllWidgets(dispatch,topicId),
    findAllWidgetsForTopic:(topicId) => actions.findAllWidgetsForTopic(dispatch,topicId),
    addWidget: () => actions.addWidget(dispatch),
    save: (topicId) => actions.save(dispatch,topicId),
    preview: () => actions.preview(dispatch)
})



const WidgetListContainer = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(WidgetList)

export default WidgetListContainer
// It should be the connected container that is supposed to be exported to defualt. Not the component WidgetList.
// // Otherwise the props will be undefined.