import React from 'react'
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseServices"

class CourseList extends React.Component{
    constructor(){
        super();
        this.courseService = CourseService.instance;
    }

    componentDidMount(){ // data is ready to render. Before rendering, what's your last word?
        this.courseService
            .findAllCourses()
            .then((courses) => {
                console.log(courses);
                this.setState({courses: courses});
            })
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