import React from 'react'
import {Link} from 'react-router-dom'
import CourseCard from "./CourseCard";

export default class TopicPill extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        let me = this;
        return( // return jsx declaration
            <div>
                <li className="nav-item">
                    <span className="nav-link active" href="#">
                        <Link to = {`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}/edit`}>
                            {this.props.title}
                        </Link>
                        <i onClick={function(){me.props.deleteTopic(me.props.topic.id);}} className="fa fa-times"></i>
                    </span>
                </li>

                <CourseCard/>
                <CourseCard/>
                <CourseCard/>
                <CourseCard/>
                <CourseCard/>
                <CourseCard/>
            </div>
        );
    }
}