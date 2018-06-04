const HOST='https://webdev-summer-2018-lincoln.herokuapp.com';
const LESSON_API_URL = HOST+'/api/course/CID/module/MID/lesson';

let _singleton = Symbol();
export default class LessonServiceClient { // this service is a singleton
    constructor(singletonToken){
        if(_singleton !== singletonToken){
            throw new Error('Singleton!!!');
        }
    }

    findAllLessonsForModule(courseId,moduleId){
        return fetch(LESSON_API_URL.replace('CID', courseId).replace('MID',moduleId))
                .then(function(response){
                return response.json();
            });
    }


    createLesson(courseId, moduleId, lesson){
        return fetch(LESSON_API_URL.replace('CID', courseId).replace('MID',moduleId),{ // CID is a place holder
            body: JSON.stringify(lesson),
            headers: {'Content-Type' : 'application/json'},
            method: 'POST'
        }).then(function(response){
            return response.json();
        })
    }

    deleteLesson(lessonId){
        console.log("31 deleting course")
        console.log(lessonId)
        console.log("the api url is")
        console.log(LESSON_API_URL.replace('course/CID/module/MID/', '') + '/' + lessonId)
        return fetch(LESSON_API_URL.replace('course/CID/module/MID/', '') + '/' + lessonId, {
            method: 'DELETE'
        }).then(function(response){
            return Promise.resolve(lessonId);
        });
    }

    static get instance(){
        if(!this[_singleton]) {
            this[_singleton] = new LessonServiceClient(_singleton);
        }
        return this[_singleton];
    }
}