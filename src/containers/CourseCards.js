import React from 'react'
import CourseCard from '../components/CourseCard'


export default class CourseCards
    extends React.Component{

    render(){
        return(
            <div>
                <CourseCard/>
                <CourseCard/>
                <CourseCard/>
                <CourseCard/>
                <CourseCard/>
            </div>
        );
    }
}