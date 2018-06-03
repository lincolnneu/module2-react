import React from 'react'
import LessonTabs from './LessonTabs'


export default class ModuleEditor
    extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            moduleId:'',
            courseId:''
        };
        this.selectModule = this.selectModule.bind(this);
        this.selectCourse = this.selectCourse.bind(this);
    }


    componentDidMount(){// set course id. When it loads, we parse the parameter. When the component did mount, we call select and extract id.
        this.selectModule(this.props.match.params.moduleId);
        this.selectCourse(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps){
        this.selectModule(newProps.match.params.moduleId);
        this.selectCourse(newProps.match.params.courseId);
    }

    selectModule(moduleId){
        this.setState({moduleId: moduleId});
    }

    selectCourse(courseId){
        this.setState({courseId: courseId})
    }


    render(){
        return (
            <div>
                <h2>Editing module: {this.state.moduleId}</h2>
                <LessonTabs courseId={this.state.courseId} moduleId={this.state.moduleId}/>
            </div>
        )
    }
}