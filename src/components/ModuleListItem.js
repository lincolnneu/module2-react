import React from 'react'
import {Link} from 'react-router-dom'

export default class ModuleListItem extends React.Component{
    render(){
        let me = this;
        return( // return jsx declaration
        <li className="list-group-item">
            <Link to = {`/course/${this.props.courseId}/module/${this.props.module.id}/edit`}>
                {this.props.title}
            </Link>

            <span className="float-right">
                <i onClick={function(){
                    me.props.deleteModule(me.props.module.id);
                }}
                   className="fa fa-times"></i>
            </span>
        </li>
    );
    }
}