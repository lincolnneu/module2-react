// top level application
import React, {Component} from 'react'
import CourseEditor from './CourseEditor'
import CourseList from "./CourseList"
import {BrowserRouter as Router, Route} from 'react-router-dom' // call BrowserRouter locally as Router.

export default class CourseManager extends Component{
    render(){
        return(
            <Router>
                {/* a bootstrap class */}
                {/* className="card-deck: This part could be assigned as another container.js */}
                <div className="container-fluid">
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