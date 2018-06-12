import React from 'react';
import WidgetListContainer from './WidgetList';
import {createStore} from "redux";
import {widgetReducer} from "../reducers/widgetReducer";
import {Provider} from 'react-redux'


let store = createStore(widgetReducer);

export default class TopicEditor
    extends React.Component{
    constructor(props){
        alert("Topic Editor!!!!!");
        super(props);
        this.state = {
            moduleId:'',
            courseId:'',
            lessonId:'',
            topicId:''
        };

    }

    render(){
        return (
            <Provider store={store}>
                <WidgetListContainer
                    courseId={this.props.match.params.courseId}
                    moduleId={this.props.match.params.moduleId}
                    lessonId={this.props.match.params.lessonId}
                    topicId={this.props.match.params.topicId}/>
            </Provider>
        )
    }
}