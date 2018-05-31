const MODULE_API_URL = 'http://localhost:8080/api/course/CID/module';

let _singleton = Symbol();
export default class ModuleService { // this service is a singleton
    constructor(singletonToken){
        if(_singleton !== singletonToken){
            throw new Error('Singleton!!!');
        }
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

    static get instance(){
        if(!this[_singleton]) {
            this[_singleton] = new ModuleService(_singleton);
        }
         return this[_singleton]
    }
}