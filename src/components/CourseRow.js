import React from 'react';
import {Link} from 'react-router-dom'
import CourseServiceClient from "../services/CourseServiceClient"


class CourseRow extends React.Component{
    constructor(props){
        super(props);
        this.courseService = CourseServiceClient.instance;
    }

    render(){
        let me = this;
        let u = this.props.course.owner;
        let curU = this.props.curU;
        if(u === curU){
            u = "me";
        }
        return (
            <tr>
                <td>
                    <Link to = {`/course/${this.props.course.id}/edit`}>
                        {this.props.course.title}
                    </Link>

                </td>
                <td>{u}</td>
                <td>{this.props.course.modified}</td>
                <td>
                    <i onClick={function(){me.props.deleteCourse(me.props.course.id)}}
                       className="fa fa-times float-right"></i>
                </td>
            </tr>
            // this title will be converted into a link
        )


    }
}

export default CourseRow;