import React from 'react'
import ModuleList from './ModuleList'
import CourseServiceClient from "../services/CourseServiceClient";

export default class CourseEditor
    extends React.Component{
    constructor(props){
        super(props);
        this.state = {courseId: ''};
        this.selectCourse = this.selectCourse.bind(this);
        this.courseService = CourseServiceClient.instance;
    }

    componentDidMount(){// set course id. When it loads, we parse the parameter. When the component did mount, we call select and extract id.
        this.selectCourse(this.props.match.params.courseId);
    }

    selectCourse(courseId){
        this.setState({courseId: courseId});
    }

    render(){
        return (
            <div>
                <h2>Editing course: #{this.state.courseId}</h2>
                    <div>
                        <ModuleList courseId={this.state.courseId}/> {/*moduleList will know what to load.*/}
                    </div>

            </div>
        )
    }
}