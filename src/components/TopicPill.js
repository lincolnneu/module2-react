import React from 'react'
import {Link} from 'react-router-dom'
import App from "../containers/widgetList"
export default class TopicPill extends React.Component{
    render(){
        let me = this;
        return( // return jsx declaration
            <div>
                <li className="nav nav-pills">
                    <span className="nav-link active" href="#">
                        <Link to = {`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}`}
                              style={{ color: '#FFF' }}>
                            {this.props.title}
                        </Link>
                        <i onClick={function(){me.props.deleteTopic(me.props.topic.id);}} className="fa fa-times"></i>
                    </span>

                </li>
                <App/>
            </div>
        );
    }
}