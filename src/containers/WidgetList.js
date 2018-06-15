import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import WidgetContainer from "../components/widget";
import '../index.css'

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
                <div className="form-inline float-right">
                <button
                    className="btn btn-success"
                    style={{marginRight: "5px"}}
                    hidden={this.props.previewMode}
                    onClick={function(){
                    me.props.save(me.props.topicId)
                    }
                }>Save</button>
                <span className="font-weight-normal align-text-bottom"
                   style={{marginRight: "5px"}}>Preview</span>
                <label className="switch">
                    <input type="checkbox"
                           onClick={this.props.preview}
                    />
                    <span className="slider round"></span>
                </label>
                </div>

                <br/>
                <br/>

                <ul className="list-group">
                    {this.props.widgets.map(widget =>(
                        <WidgetContainer widget={widget}
                                         preview={this.props.previewMode}
                                         key={widget.id}/>
                    ))}

                </ul>

                <br/>
                <button
                    className="btn-sm btn-danger float-right"
                    onClick={this.props.addWidget}><i className="fa fa-plus-circle"></i></button>
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