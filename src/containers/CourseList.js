import React from 'react'
import CourseRow from "../components/CourseRow";
import CourseServiceClient from "../services/CourseServiceClient"
import './CourseList.css'


class CourseList extends React.Component{
    constructor(){
        super();
        this.state = {
            course: { title: '' },
            courses:[],
            curUser:{ username: ''}
        }
        this.courseService = CourseServiceClient.instance;
        this.titleChanged = this.titleChanged.bind(this); // bind these methods to this component in constructor.
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.tagCoursePublic = this.tagCoursePublic.bind(this);
        this.tagCoursePrivate = this.tagCoursePrivate.bind(this);

    }

    componentDidMount(){ // data is ready to render. Before rendering, what's your last word?
        this.getCurUser();
        this.findAllCourses();
    }

    getCurUser(){
        let me = this;
        this.courseService
            .getCurUser()
            .then((data)=>{
                this.setState({curUser:{username: data.username}});
            })
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
                    return <CourseRow key={course.id} curU={me.state.curUser.username} course={course} deleteCourse={me.deleteCourse} tagCoursePrivate={me.tagCoursePrivate} tagCoursePublic={me.tagCoursePublic}/>
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



    tagCoursePublic(courseId, course){
        if(course === undefined){return;}
        course.private = false;
        this.courseService
            .updateCourse(courseId, course)
            .then(() => { this.findAllCourses();}); // refresh after pressing createCourse button
    }

    tagCoursePrivate(courseId, course){
        if(course === undefined){return;}
        course.private = true;
        this.courseService
            .updateCourse(courseId, course)
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
                <nav className="navbar navbar-expand-md bg-dark fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/courses" style={{color : "#FFF"}}>Course Manager</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <form className="input-group form-inline my-2 my-lg-0">
                                <input onChange={this.titleChanged} className="form-control mr-sm-2" id="titleFld" placeholder="cs101"/>
                                <button onClick={
                                    (event)=>{
                                        me.checkTitleNull(event)
                                            .then(me.createCourse);
                                    }
                                } className="btn btn-danger my-2 my-sm-0" type="button"><i className="fa fa-plus"></i></button>
                            </form>
                        </div>

                        <button className="btn btn-link bd-search-docs-toggle d-md-none p-0 ml-3 collapsed"
                                type="button" data-toggle="collapse" data-target="#myNavbar"
                                aria-controls="bd-docs-nav" aria-expanded="false" aria-label="Toggle docs navigation">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30"
                                 focusable="false"><title>Menu</title>
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeMiterlimit="10" d="M4 7h22M4 15h22M4 23h22"></path>
                            </svg>
                        </button>

                    </div>
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