import React from 'react'
import {Link} from 'react-router-dom'

export default class LessonTabsItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            attribute:'',
            moduleId:'',
            curModuleId:''
        }
        this.setAttribute = this.setAttribute.bind(this);
    }

    setAttribute(){
        this.setState({attribute:this.props.attribute});
        this.state.attribute = this.props.attribute;
    }

    componentDidMount(){
        this.setAttribute();
    }


    render(){
        let me = this;
        return( // return jsx declaration
            <div>
                <li className={`nav-item active ${this.props.attribute}`}
                    onClick={
                        function reloadPage (){
                            window.location.reload()
                        }
                    }>
                    <span className="nav-link" href="#">
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
