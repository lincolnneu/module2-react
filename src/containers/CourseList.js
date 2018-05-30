import React from 'react'
import CourseRow from "../components/CourseRow";
class CourseList extends React.Component{
    constructor(){ // dummy constructor doesn't do anything
        super();
    }
    render(){
        return(
            <div>
                <h2>Course List</h2>
                <table className="table">
                    <thead><tr><th>Title</th></tr></thead>
                    <tbody>
                        <CourseRow/>
                        <CourseRow/>
                        <CourseRow/>
                        <CourseRow/>
                        <CourseRow/>
                        <CourseRow/>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default CourseList;