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

    renderCourseRows(){
        let courses = null;

        if(this.state){
            courses = this.state.courses.map(
                function(course){
                    return <CourseRow key={course.id} course={course}/>
                }
            )
        }

        return (
            courses
        )
    }

    render(){
        return(
            <div>
                <h2>Course List</h2>
                <table className="table">
                    <thead>
                        <tr><th>Title</th></tr>
                        <th><input className="form-control" id="titleFld" placeholder="cs101"/></th>
                        <th><button className="btn btn-primary">Add</button></th>
                    </thead>
                    <tbody>
                        {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default CourseList;