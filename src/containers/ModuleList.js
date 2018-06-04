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
            modules: []
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.moduleService = ModuleServiceClient.instance; // once we have the instance we can call it in the createModule.

    }

    setModules(modules){
        this.setState({modules: modules});
    }

    findAllModulesForCourse(courseId){
        this.moduleService.findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    setCourseId(courseId){
        this.setState({courseId: courseId});
    }

    componentDidMount(){
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);
    }


    createModule(event) {
        if(this.state.module.title === ''){
            this.setState({module:{title: "new module"}});
        }
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
        console.log(event.target.value);
        this.setState({module: {title: event.target.value}});
    }

    renderListOfModules() {
        let me = this;
        let modules = this.state.modules.map(function (module) {
            return <ModuleListItem key={module.id} title={module.title} courseId={me.props.courseId} module={module} deleteModule={me.deleteModule}/>
        });
        return modules;
    }

    render() {
        return(
            <Router>
                <div>
                    <div className="row">
                        <div className="col-4">
                            <input className="form-control"
                                   onChange={this.titleChanged}
                                   placeholder="title"/>

                            <button onClick={this.createModule} className="btn btn-primary btn-block">
                                <i className="fa fa-plus"></i>
                            </button>

                            <ul className="list-group nav nav-tabs">
                                {this.renderListOfModules()}
                            </ul>
                        </div>
                        <div className="col-8">
                            <Route path="/course/:courseId/module/:moduleId"
                                    component={ModuleEditor}>
                            </Route>

                        </div>
                    </div>

                </div>
            </Router>
        )
    }
}

export default ModuleList;