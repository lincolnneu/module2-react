import React from 'react'
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseServices"

class CourseList extends React.Component{
    constructor(){
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this); // bind these methods to this component in constructor.
        this.createCourse = this.createCourse.bind(this);
    }

    componentDidMount(){ // data is ready to render. Before rendering, what's your last word?
        this.findAllCourses();
    }

    findAllCourses(){
        this.courseService
            .findAllCourses()
            .then((courses) => {
                console.log(courses);
                this.setState({courses: courses});
            })
    }

    renderCourseRows(){
        let courses = null;
        console.log("render course rows");
        console.log(this.state);
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

    titleChanged(event){ // event is a standard signature for this event handlers when infrastructure passes the event originated when the event occur. We need a reference back to the input field.
        this.setState({ // accumulate the event to save the key into title.
            course: { title: event.target.value }
        });
    }
    createCourse(){
        this.courseService
            .createCourse(this.state.course)
            .then(() => { this.findAllCourses();}); // refresh after pressing createCourse button
    }

    render(){
        return(
            <div>
                <h2>Course List</h2>
                <table className="table">
                    <thead>
                        <tr><th>Title</th></tr>
                        <tr>
                            <th><input onChange={this.titleChanged}
                                className="form-control" id="titleFld" placeholder="cs101"/></th>
                            <th><button onClick={this.createCourse}
                                className="btn btn-primary">Add</button></th>
                        </tr>
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