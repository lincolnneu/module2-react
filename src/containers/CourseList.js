import React from 'react'
import CourseRow from "../components/CourseRow";
import CourseServiceClient from "../services/CourseServiceClient"


class CourseList extends React.Component{
    constructor(){
        super();
        this.state = {
            course: { title: '' },
            courses:[]
        }
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

    checkTitleNull(event){
        if(this.state.course.title === ''){
            this.setState({course:{
                title: "new course",
                created: Date.now(),
                modified: Date.now()
            }})
        }
        return Promise.resolve(event);
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
        let me = this;
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <a className="navbar-brand" href="/courses">Course Manager</a>

                    <form className="input-group form-inline my-2 my-lg-0">
                        <input onChange={this.titleChanged} className="form-control mr-sm-2" id="titleFld" placeholder="cs101"/>
                        <button onClick={
                            (event)=>{
                                me.checkTitleNull(event)
                                    .then(me.createCourse);
                                }
                            } className="btn btn-outline-danger my-2 my-sm-0" type="button">+</button>
                    </form>

                </nav>

                <h2>Course List</h2>
                <table className="table table-striped">
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