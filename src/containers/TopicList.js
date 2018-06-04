import React from 'react';
import TopicPill from "../components/TopicPill";
import TopicServiceClient from "../services/TopicServiceClient";
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class TopicList
    extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
            topic: { title: '' },
            topics: []
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.topicService = TopicServiceClient.instance; // once we have the instance we can call it in the createModule.

    }

    setTopics(topics){
        this.setState({topics: topics});
    }

    findAllTopicsForLesson(courseId,moduleId,lessonId){
        this.topicService.findAllTopicsForLesson(courseId,moduleId,lessonId)
            .then((topics) => {this.setTopics(topics)});
    }

    setCourseId(courseId){
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId){
        this.setState({moduleId: moduleId});
    }

    setLessonId(lessonId){
        this.setState({lessonId: lessonId});
    }

    componentDidMount(){
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
        this.findAllTopicsForLesson(newProps.courseId,newProps.moduleId,newProps.lessonId);
    }

    createTopic(event) {
        if(this.state.topic.title === ''){
            this.setState({topic:{title: "new module"}});
        }
        this.topicService
            .createTopic(this.props.courseId,this.props.moduleId, this.props.lessonId, this.state.topic)
            .then(() => { this.findAllTopicsForLesson(this.props.courseId,this.props.moduleId, this.props.lessonId);});
    }

    deleteTopic(topicId) {
        console.log(topicId);
        this.topicService
            .deleteTopic(topicId)
            .then(() => { this.findAllTopicsForLesson(this.props.courseId,this.props.moduleId, this.props.lessonId);});
    }


    titleChanged(event) {
        console.log(event.target.value);
        this.setState({topic: {title: event.target.value}});
    }

    renderListOfTopics() {
        let me = this;
        let topics = this.state.topics.map(function (topic) {
            return (
                <TopicPill key={topic.id} title={topic.title} courseId={me.props.courseId} moduleId={me.props.moduleId} lessonId={me.props.lessonId} topic={topic} deleteTopic={me.deleteTopic}/>
            )
        });
        return topics;
    }



    render(){
        return (

                <div>
                    <div className="row">
                        <div>
                            <input className="form-control"
                                   onChange={this.titleChanged}
                                   placeholder="title"/>

                            <button onClick={this.createTopic} className="btn btn-primary btn-block">
                                <i className="fa fa-plus"></i>
                            </button>

                            <ul className="list-group">
                                <ul className="nav nav-tabs">
                                    {this.renderListOfTopics()}
                                </ul>
                            </ul>
                        </div>
                    </div>

                    <Route path=""></Route>
                </div>

        );
    }
}