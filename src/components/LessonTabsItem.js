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

    sleep(milliseconds) {
        let start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
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

                </li>
                <span className="nav-link">
                        <Link to = {`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}>
                            {this.props.title}
                        </Link>
                        <button onClick={function(event){
                            me.props.deleteLesson(me.props.lesson.id);
                            me.sleep(2000);
                            window.location.reload();

                        } } type="button" className="fa fa-times"></button>
                    </span>
            </div>
        );
    }
}
