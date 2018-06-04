const HOST='https://webdev-summer-2018-lincoln.herokuapp.com';
let TOPIC_API_URL = HOST+ '/api/course/CID/module/MID/lesson/LID/topic';

let _singleton = Symbol();
export default class TopicServiceClient { // this service is a singleton
    constructor(singletonToken){
        if(_singleton !== singletonToken){
            throw new Error('Singleton!!!');
        }
    }

    findAllTopicsForLesson(courseId,moduleId,lessonId){
        return fetch(TOPIC_API_URL.replace('CID', courseId).replace('MID',moduleId).replace('LID',lessonId))
                .then(function(response){
                return response.json();
            });
    }


    createTopic(courseId, moduleId, lessonId, topic){
        return fetch(TOPIC_API_URL.replace('CID', courseId).replace('MID',moduleId).replace('LID',lessonId),{
            body: JSON.stringify(topic),
            headers: {'Content-Type' : 'application/json'},
            method: 'POST'
        }).then(function(response){
            return response.json();
        });
    }

    deleteTopic(topicId){
        return fetch(TOPIC_API_URL.replace('course/CID/module/MID/lesson/LID', '') + '/' + topicId, {
            method: 'DELETE'
        });
    }

    static get instance(){
        if(!this[_singleton]) {
            this[_singleton] = new TopicServiceClient(_singleton);
        }
        return this[_singleton];
    }
}