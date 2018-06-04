import React from 'react'
import {Link} from 'react-router-dom'

export default class TopicPill extends React.Component{
    render(){
        let me = this;
        return( // return jsx declaration
            <div>
                <li className="nav nav-tabs">
                    <span className="nav-link active" href="#">
                        <Link to = {`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}`}>
                            {this.props.title}
                        </Link>
                        <i onClick={function(){me.props.deleteTopic(me.props.topic.id);}} className="fa fa-times"></i>
                    </span>
                </li>
            </div>
        );
    }
}