import * as constants from "../constants";


let _singleton = Symbol();

let COURSE_API_URL = constants.HOST+'/api/course';
class CourseServiceClient {
    constructor(singletonToken){
        if(_singleton !== singletonToken) throw new Error('Cannot instantiate directly');
    }
    static get instance(){
        if(!this[_singleton]) this[_singleton] = new CourseServiceClient(_singleton);
        return this[_singleton];
    }

    getCurUser(){
        return fetch(COURSE_API_URL.replace('course','curUser'))
            .then(function(response){
                return response.json();
            });

    }

    findAllCourses(){
        return fetch(COURSE_API_URL)
            .then(function(response){
                return response.json();
            });
    }

    findCourseById(courseId){
        return fetch(COURSE_API_URL + '/' + courseId)
            .then(function(response){
                return response.json();
            });
    }

    createCourse(course){
        return fetch(COURSE_API_URL, {
            body: JSON.stringify(course),
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response){
            return response.json();
        });
    }

    updateCourse(courseId, course){
        return fetch(COURSE_API_URL+ '/' + courseId, {
            body: JSON.stringify(course),
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
    }

    deleteCourse(courseId){
        return fetch(COURSE_API_URL + '/' + courseId, {
            method: 'DELETE'
        });
    }

}
export default CourseServiceClient;