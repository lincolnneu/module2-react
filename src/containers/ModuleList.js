import React from 'react'
import ModuleListItem from '../components/ModuleListItem'
import ModuleServiceClient from '../services/ModuleServiceClient'
import ModuleEditor from './ModuleEditor'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: { title: '' },
            modules: [],
            curModuleId: ''
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.setCurModuleId = this.setCurModuleId.bind(this);
        this.moduleService = ModuleServiceClient.instance; // once we have the instance we can call it in the createModule.

    }

    setModules(modules){
        this.setState({modules: modules});
    }

    setCurModuleId(){
        let curModule = window.location.href.split('/')[6];
        let courseId = this.state.courseId;
        this.setCourseId();
        this.setState({curModuleId: curModule});
        this.setCourseId(courseId);

    }

    findAllModulesForCourse(courseId){
        this.moduleService.findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    setCourseId(courseId){
        this.setState({courseId: courseId});
    }

    componentDidMount(){
        this.setCurModuleId();
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);

    }

    componentDidUpdate(prevProps,prevState){
        let curModule = window.location.href.split('/')[6];
        if(curModule !== prevState.curModuleId){
            this.setCurModuleId();
        }
    }

    checkTitleNull(event) {
        if(this.state.module.title === ''){
            this.setState({module:{title: "new module"}});
        }
        return Promise.resolve(event);
    }

    createModule(event) {
        this.moduleService
            .createModule(this.props.courseId, this.state.module)
            .then(() => { this.findAllModulesForCourse(this.props.courseId);});
    }

    deleteModule(moduleId) {
        let confirmation= window.confirm(`You're about to delete module #${moduleId}, are you sure?`);
        if(confirmation){
            this.moduleService
                .deleteModule(moduleId)
                .then(() => { this.findAllModulesForCourse(this.props.courseId);});
        }

    }

    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
    }

    renderListOfModules() {
        let me = this;
        let modules = this.state.modules.map(function (module) {
            return <ModuleListItem key={module.id} courseId={me.state.courseId} curModuleId={me.state.curModuleId} module={module} deleteModule={me.deleteModule}/>
        });
        return modules;
    }

    render() {
        let me = this;
        return(

                <div>
                    {/*<div className="row">*/}
                        {/*<div className="col-4">*/}
                            <button onClick={
                                (event)=>{
                                    me.checkTitleNull(event)
                                        .then(me.createModule);
                                }

                                } className="btn btn-primary btn-block" type="button">
                                <i className="fa fa-plus"></i>
                            </button>
                            <br/>

                            <input className="form-control"
                                   onChange={this.titleChanged}
                                   placeholder="new module"/>

                            <ul className="list-group">
                                {this.renderListOfModules()}
                            </ul>
                        </div>

        )
    }
}

export default ModuleList;