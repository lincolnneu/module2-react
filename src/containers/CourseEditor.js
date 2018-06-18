import React from 'react'
import ModuleList from './ModuleList'
import CourseServiceClient from "../services/CourseServiceClient";
import ModuleEditor from "./ModuleEditor";
import {Route} from 'react-router-dom'
import LessonEditor from "./LessonEditor";
import './CourseList.css'

export default class CourseEditor
    extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            courseId: '',
            course:{title:''}
        };
        this.selectCourse = this.selectCourse.bind(this);
        this.courseService = CourseServiceClient.instance;
    }

    componentDidMount(){// set course id. When it loads, we parse the parameter. When the component did mount, we call select and extract id.
        this.selectCourse(this.props.match.params.courseId);
        this.findCourseTitleById(this.props.match.params.courseId);
    }



    selectCourse(courseId){
        this.setState({courseId: courseId});
    }

    setCourse(courseTitle){
        this.setState({course:{title: courseTitle}});
    }

    findCourseTitleById(curCourseId){
        this.courseService
            .findCourseById(curCourseId)
            .then(data =>{
                this.setCourse(data.title);
            });
    }


    render(){
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top box-shadow">
                    <div className="container-fluid d-flex justify-content-between">
                        <div className="navbar-header">
                            <a className="navbar-brand align-items-center d-flex" href="/courses">{this.state.course.title}</a>
                        </div>
                        <div className=" collapse navbar-collapse col-sm-9" id="myNavbar">
                            <Route path="/course/:courseId/module/:moduleId" component={ModuleEditor}/>
                        </div>

                        <button className="btn btn-link bd-search-docs-toggle d-md-none p-0 ml-2 collapsed"
                                type="button" data-toggle="collapse" data-target="#myNavbar"
                                aria-controls="bd-docs-nav" aria-expanded="false" aria-label="Toggle docs navigation">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30"
                                 focusable="false"><title>Menu</title>
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeMiterlimit="10" d="M4 7h22M4 15h22M4 23h22"></path>
                            </svg>
                        </button>
                    </div>
                </nav>
                <br/>
                    <div>
                        <div className="row content">
                            <div className="col-sm-3 sidenav">
                                <ModuleList courseId={this.state.courseId}/> {/*moduleList will know what to load.*/}
                            </div>
                            <div className="col-sm-9">
                        <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId" component={LessonEditor}/>


                            </div>
                        </div>
                    </div>



            </div>
        )
    }
}