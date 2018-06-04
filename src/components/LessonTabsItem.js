import React from 'react'
import {Link} from 'react-router-dom'

export default class ModuleListItem extends React.Component{
    render(){
        let me = this;
        return( // return jsx declaration
            <div>
                <li className="nav-item">
                    <span className="nav-link active" href="#">
                        <Link to = {`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}>
                            {this.props.title}
                        </Link>
                        <i onClick={function(){me.props.deleteLesson(me.props.lesson.id);}} className="fa fa-times"></i>
                    </span>
                </li>
            </div>
        );
    }
}