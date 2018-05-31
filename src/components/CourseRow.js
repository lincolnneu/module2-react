import React from 'react';
import {Link} from 'react-router-dom'


class CourseRow extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <tr><td>
                <Link to = {`/course/${this.props.course.id}/edit`}>
                {this.props.course.title}
                </Link>
            </td></tr>
            // this title will be converted into a link
        )
    }
}

export default CourseRow;