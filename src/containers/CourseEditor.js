import React from 'react'
import ModuleList from './ModuleList'
import CourseServiceClient from "../services/CourseServiceClient";

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
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top box-shadow">
                    <div className="container d-flex justify-content-between">
                        <a className="navbar-brand align-items-center d-flex" href="/courses">{this.state.course.title}</a>
                    </div>
                </nav>
                <br/>
                    <div>
                        <ModuleList courseId={this.state.courseId}/> {/*moduleList will know what to load.*/}
                    </div>

            </div>
        )
    }
}