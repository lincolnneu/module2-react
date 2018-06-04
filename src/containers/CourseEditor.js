import React from 'react'
import ModuleList from './ModuleList'
import CourseServiceClient from "../services/CourseServiceClient";
import CourseTitle from '../components/CourseTitle';

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
                <CourseTitle courseId={this.state.courseId} courseTitle={this.state.course.title}/>
                    <div>
                        <ModuleList courseId={this.state.courseId}/> {/*moduleList will know what to load.*/}
                    </div>

            </div>
        )
    }
}