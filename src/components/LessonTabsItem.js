import React from 'react'
import {Link} from 'react-router-dom'

export default class LessonTabsItem extends React.Component{
    constructor(props){
        super(props);
    }

    sleep(milliseconds) {
        let start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    render(){
        let me = this;
        return( // return jsx declaration
            <div>
                <li className={"nav-item"} style={{backgroundColor: "#666", marginRight: "5px"}}>
                    <span className={`nav-link ${me.props.attribute}`} >
                            <Link to = {`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`} style={{color: "#FFF"}}>
                                {this.props.title}&nbsp;&nbsp;&nbsp;&nbsp;
                            </Link>
                            <i onClick={function(event){
                                me.props.deleteLesson(me.props.lesson.id);
                                me.sleep(2000);
                                window.location.reload();

                            } } className="fa fa-times"></i>
                        </span>
                </li>
            </div>
        );
    }
}
