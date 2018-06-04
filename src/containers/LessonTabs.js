import React from 'react';
import LessonTabsItem from "../components/LessonTabsItem";
import LessonServiceClient from "../services/LessonServiceClient";
import {BrowserRouter as Route} from 'react-router-dom'
import LessonEditor from "./LessonEditor";

export default class LessonTabs
    extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lesson: { title: '' },
            lessons: [],
            curLessonId: ''
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.setCurLessonId = this.setCurLessonId.bind(this);
        this.lessonService = LessonServiceClient.instance; // once we have the instance we can call it in the createModule.

    }

    setLessons(lessons){
        this.setState({lessons: lessons});
    }

    setCurLessonId(){
        let curLesson = window.location.href.split('/')[8];
        this.setState({curLessonId: curLesson});
        this.state.curLessonId = curLesson;
    }

    findAllLessonsForModule(courseId,moduleId){
        this.lessonService.findAllLessonsForModule(courseId,moduleId)
            .then((lessons) => {this.setLessons(lessons)});
    }

    setCourseId(courseId){
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId){
        this.setState({moduleId: moduleId});
    }

    componentDidMount(){
        this.setCurLessonId();
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.findAllLessonsForModule(newProps.courseId,newProps.moduleId);
    }

    checkTitleNull(event) {
        if(this.state.lesson.title === ''){
            let defName = 'new lesson';
            this.setState({lesson : {title: defName}});
            this.state.lesson.title = defName;
        }
        return Promise.resolve(event);
    }


    createLesson(event) {
        this.lessonService
            .createLesson(this.props.courseId,this.props.moduleId, this.state.lesson)
            .then(() => { this.findAllLessonsForModule(this.props.courseId,this.props.moduleId);});
    }

    deleteLesson(lessonId) {
        let confirmation= window.confirm(`You're about to delete lesson #${lessonId}, are you sure?`);
        if(confirmation) {
            this.lessonService
                .deleteLesson(lessonId)
                .then(() => {
                    this.findAllLessonsForModule(this.props.courseId, this.props.moduleId);
                });
        }
    }


    titleChanged(event) {
        this.setState({lesson: {title: event.target.value}});
    }

    renderListOfLessons() {
        let me = this;
        let lessons = this.state.lessons.map(function (lesson) {
            let at = '';
            if(me.state.curLessonId === lesson.id){
                at = 'show';
            }
            return (
                    <LessonTabsItem key={lesson.id} attribute={at} title={lesson.title} courseId={me.props.courseId} moduleId={me.props.moduleId} lesson={lesson} deleteLesson={me.deleteLesson}/>
            )
        });
        return lessons;
    }



    render(){
        let me = this;
        return (

                <div className="container">
                    <div className="row">
                        <div>
                            <input className="form-control" onChange={me.titleChanged} placeholder="title"/>
                            <button onClick={
                                (event)=>{
                                me.checkTitleNull(event)
                                    .then(me.createLesson);
                            }}
                                    className="btn btn-primary btn-block">
                                <i className="fa fa-plus"></i>
                            </button>
                            </div>
                            <ul className="list-group">
                                <ul className="nav nav-tabs">
                                    {this.renderListOfLessons()}
                                </ul>
                            </ul>
                        </div>


                    <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                           component={LessonEditor} >

                    </Route>
                </div>

        );
    }
}