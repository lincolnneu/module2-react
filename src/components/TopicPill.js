import React from 'react'
import {Link} from 'react-router-dom'
import WidgetListContainer from "../containers/WidgetList"
export default class TopicPill extends React.Component{
    render(){
        let me = this;
        let s = {color : '#FFF'}
        // if(me.props.attribute == 'active'){
        //     s = { color: '#FFF' }
        // }
        return( // return jsx declaration
            <div>
                <li className="nav nav-pills" style={{backgroundColor: "#666", marginRight: "5px"}}>
                    <span className={`nav-link ${this.props.attribute}`}>
                        <Link to = {`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}`}
                            style={s}>
                            {this.props.title}&nbsp;&nbsp;&nbsp;&nbsp;
                        </Link>

                        <i onClick={function(){me.props.deleteTopic(me.props.topic.id);}} className="fa fa-times"></i>
                    </span>

                </li>
            </div>
        );
    }
}