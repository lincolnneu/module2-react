import React from 'react'
import {Link} from 'react-router-dom'

export default class ModuleListItem extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let me = this;
        let at = '';
        if(me.props.curModuleId == me.props.module.id) {
            at = 'bg-success';
        }
        else{
            at = 'bg-dark';
        }

        return( // return jsx declaration
        <li className={`list-group-item ${at}`}>
            <Link to = {`/course/${this.props.courseId}/module/${this.props.module.id}`}
                  style={{ color: '#FFF' }}>
                {this.props.module.title}
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