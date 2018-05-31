import React from 'react';
import {Link} from 'react-router-dom'

class CourseRow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let me = this;
        return (
            <tr>
                <td>
                    <Link to = {`/course/${this.props.course.id}/edit`}>
                    {this.props.course.title}
                    </Link>

                </td>
                <td>me</td>
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