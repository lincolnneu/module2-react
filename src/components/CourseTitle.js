import React from 'react'
import ModuleListItem from './ModuleListItem'
import ModuleServiceClient from '../services/ModuleServiceClient'
import ModuleEditor from '../containers/ModuleEditor'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class CourseTitle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            course: { title: '' },
        };

        this.setCourse = this.setCourse.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.moduleService = ModuleServiceClient.instance; // once we have the instance we can call it in the createModule.

    }

    setCourse(courseTitle){
        this.setState({title: courseTitle});
    }

    setCourseId(courseId){
        this.setState({courseId: courseId});
    }

    componentDidMount(){
        this.setCourseId(this.props.courseId);
        this.setCourse(this.props.courseTitle);
    }

    componentWillReceiveProps(newProps){
        this.setCourse(newProps.courseTitle);
        this.setCourseId(newProps.courseId);
    }

    renderCourseName(){
        return <h2>Editing course: {this.props.courseTitle}</h2>
    }

    render() {
        return(

            <div>
                {this.renderCourseName()}
            </div>

        )
    }
}

export default CourseTitle;