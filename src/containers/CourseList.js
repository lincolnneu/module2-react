import React from 'react'
import CourseRow from "../components/CourseRow";
import CourseServiceClient from "../services/CourseServiceClient"

class CourseList extends React.Component{
    constructor(){
        super();
        this.courseService = CourseServiceClient.instance;
        this.titleChanged = this.titleChanged.bind(this); // bind these methods to this component in constructor.
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);

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
        let me = this;
        if(this.state){
            courses = this.state.courses.map(
                function(course){
                    return <CourseRow key={course.id} course={course} deleteCourse={me.deleteCourse}/>
                }
            );
        }

        return (
            courses
        )
    }

    titleChanged(event){ // event is a standard signature for this event handlers when infrastructure passes the event originated when the event occur. We need a reference back to the input field.
        this.setState({ // accumulate the event to save the key into title.
            course: {
                title: event.target.value,
                created: Date.now(),
                modified: Date.now()
            }
        });
    }
    createCourse(){
        this.courseService
            .createCourse(this.state.course)
            .then(() => { this.findAllCourses();}); // refresh after pressing createCourse button
    }

    deleteCourse(courseId){
        console.log("deleting" + courseId);
        this.courseService
            .deleteCourse(courseId)
            .then(() => { this.findAllCourses();});
    }

    render(){
        return(
            <div>
                <div className="form-group row">
                    <input onChange={this.titleChanged}
                           className="form-control col-sm-11" id="titleFld" placeholder="cs101"/>
                    <i onClick={this.createCourse}
                       className="fa fa-plus-circle col-sm-1"></i>
                </div>
                <h2>Course List</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Owned By</th>
                        <th>Last modified</th>
                    </tr>
                    <tr>

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