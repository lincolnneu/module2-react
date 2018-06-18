const HOST='https://webdev-summer-2018-lincoln.herokuapp.com/';
let MODULE_API_URL = HOST + '/api/course/CID/module';

let _singleton = Symbol();
export default class ModuleServiceClient { // this service is a singleton
    constructor(singletonToken){
        if(_singleton !== singletonToken){
            throw new Error('Singleton!!!');
        }
    }

    findAllModulesForCourse(courseId){
        return fetch(
            MODULE_API_URL.replace('CID', courseId))
                .then(function(response){
                    return response.json();
                });
    }


    createModule(courseId, module){
        return fetch(MODULE_API_URL.replace('CID', courseId),{ // CID is a place holder
            body: JSON.stringify(module),
            headers: {'Content-Type' : 'application/json'},
            method: 'POST'
        }).then(function(response){
            return response.json();
        })
    }

    deleteModule(moduleId){
        return fetch(MODULE_API_URL.replace('course/CID/', '') + '/' + moduleId, {
            method: 'DELETE'
        });
    }

    static get instance(){
        if(!this[_singleton]) {
            this[_singleton] = new ModuleServiceClient(_singleton);
        }
        return this[_singleton];
    }
}