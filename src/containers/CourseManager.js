// top level application
import React, {Component} from 'react'
import CourseCard from './CourseCard'


export default class CourseManager extends Component{
    render(){
        return( // a bootstrap class
            // className="card-deck: This part could be assigned as another container.js
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <div className="card-deck">
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                </div>
            </div>
        )
    }
}

// export default CourseManager; // or we can declare export before class name.