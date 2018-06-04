// top level application
import React, {Component} from 'react'
import CourseEditor from './CourseEditor'
import CourseList from "./CourseList"
import {BrowserRouter as Router, Route} from 'react-router-dom' // call BrowserRouter locally as Router.

export default class CourseManager extends Component{
    render(){
        let me = this;
        return(
            <Router>
                {/* a bootstrap class */}

                <div className="container-fluid">
                    <h1 className="mr-sm-2 ">Welcome to hw2!!
                    <button className="btn btn-outline-success my-2 my-sm-0 pull-middle"  onClick={
                        ()=>{
                            window.open(window.location.href.split('/')[0] + 'courses');
                        }
                    }
                    >Entrance</button>
                        <button className="btn btn-outline-primary my-2 my-sm-0 pull-middle"  onClick={
                            ()=>{
                                let mainURL = "https://webdev-summer-2018-lincoln.herokuapp.com/";
                                window.open(mainURL);
                            }
                        }
                        >Main Page</button>
                    </h1>
                    <br/>
                    <br/>
                    <Route path="/courses" component={CourseList}>
                        {/*display the courselist only when we navigate to /courses*/}
                    </Route>
                    <Route path="/course/:courseId"
                           component={CourseEditor}>
                    </Route>

                </div>
            </Router>
        )
    }
}

// export default CourseManager; // or we can declare export before class name.