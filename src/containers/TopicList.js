import React from 'react';
import TopicPill from "../components/TopicPill";
import TopicServiceClient from "../services/TopicServiceClient";
import {BrowserRouter as Route} from 'react-router-dom'
import TopicEditor from "./TopicEditor"


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

    checkTitleNull(event) {
        if(this.state.topic.title === ''){
            let defName = 'new topic';
            this.setState({topic : {title: defName}});
            this.state.topic.title = defName;
        }
        return Promise.resolve(event);
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
        this.topicService
            .deleteTopic(topicId)
            .then(() => { this.findAllTopicsForLesson(this.props.courseId,this.props.moduleId, this.props.lessonId);});
    }


    titleChanged(event) {
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
        let me = this;
        return (

                <div>
                    <div>
                        <form className="input-group form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" onChange={this.titleChanged}
                                   placeholder="new topic"/>

                            <button onClick={
                                (event)=>{
                                    me.checkTitleNull(event)
                                        .then(me.createTopic);
                                }} className="btn btn-primary my-2 my-sm-0" type="button">
                                <i className="fa fa-plus"></i>
                            </button>
                        </form>
                            <ul className="list-group">
                                <ul className="nav nav-tabs">
                                    {this.renderListOfTopics()}
                                </ul>
                            </ul>

                    </div>
                </div>

        );
    }
}