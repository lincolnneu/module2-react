import React from 'react';
import LessonTabsItem from "../components/LessonTabsItem";
import LessonServiceClient from "../services/LessonServiceClient";
import {BrowserRouter as Router, Route} from 'react-router-dom'
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

    componentDidUpdate(prevProps,prevState){
        let curLesson = window.location.href.split('/')[8];
        if(curLesson !== prevState.curLessonId){
            this.setCurLessonId();
        }
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

    sleep(milliseconds) {
        let start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }


    createLesson(event) {
        this.lessonService
            .createLesson(this.props.courseId,this.props.moduleId, this.state.lesson)
            .then(() => { this.findAllLessonsForModule(this.props.courseId,this.props.moduleId);});
    }

    deleteLesson(lessonId) {
        let confirmation= window.confirm(`You're about to delete lesson #${lessonId}, are you sure?`);
        let me = this;
        if(confirmation) {
            this.lessonService
                .deleteLesson(lessonId)
                .then(() => {
                    this.sleep(1000);
                    this.findAllLessonsForModule(this.props.courseId, this.props.moduleId)
                        .catch((err)=>{
                            console.log(err);
                        })
                    ;
                })
            };
        // }
    }


    titleChanged(event) {
        this.setState({lesson: {title: event.target.value}});
    }

    renderListOfLessons() {
        let me = this;
        let lessons = this.state.lessons.map(function (lesson) {
            let at = '';
            if(me.state.curLessonId == lesson.id){
                at = 'active';
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
                    <form className="input-group form-inline my-2 my-lg-0">
                        <ul className="list-group">
                            <ul className="nav nav-tabs">
                                {this.renderListOfLessons()}
                            </ul>
                        </ul>
                        <input className="form-control mr-sm-2" onChange={me.titleChanged} placeholder="new lesson"/>
                        <button onClick={
                            (event)=>{
                                me.checkTitleNull(event)
                                    .then(me.createLesson);
                            }}
                                className="btn btn-primary my-2 my-sm-0" type="button">
                            <i className="fa fa-plus"></i>
                        </button>

                    </form>

                </div>

        );
    }
}