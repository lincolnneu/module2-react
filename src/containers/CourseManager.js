// top level application
import React, {Component} from 'react'
import CourseEditor from './CourseEditor'
import CourseList from "./CourseList"
import {BrowserRouter as Router, Route} from 'react-router-dom'

const mainURL = "https://webdev-summer-2018-jiabo-react.herokuapp.com/";
// const mainURL = "http://localhost:3000/";
const Welcome = () =>(
    <h1 className="mr-sm-2 ">Welcome to HW5!!
        <button className="btn btn-outline-success my-2 my-sm-0 pull-middle"  onClick={
            ()=>{
                window.open(window.location.href.split('/')[0] + 'courses');
            }
        }
        >Entrance</button>
        <button className="btn btn-outline-primary my-2 my-sm-0 pull-middle"  onClick={
            ()=>{
                window.open(mainURL);
            }
        }
        >Main Page</button>
    </h1>
)


export default class CourseManager extends Component{
    render(){
        return(
                <Router>
                    {/* a bootstrap class */}
                    <div className="container-fluid">
                        {window.location.href === mainURL && <Welcome/>}
                        <br/><br/>
                        <Route path="/courses" component={CourseList}/>
                        <Route path="/course/:courseId"  component={CourseEditor}/>
                    </div>
                </Router>

        )
    }
}

// export default CourseManager; // or we can declare export before class name.