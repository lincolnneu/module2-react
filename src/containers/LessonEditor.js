import React from 'react';
import TopicList from './TopicList';


export default class LessonEditor
    extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            moduleId:'',
            courseId:'',
            lessonId:''
        };
        this.selectModule = this.selectModule.bind(this);
        this.selectCourse = this.selectCourse.bind(this);
        this.selectLesson = this.selectLesson.bind(this);
    }


    componentDidMount(){// set course id. When it loads, we parse the parameter. When the component did mount, we call select and extract id.
        this.selectModule(this.props.match.params.moduleId);
        this.selectCourse(this.props.match.params.courseId);
        this.selectLesson(this.props.match.params.lessonId);
    }

    componentWillReceiveProps(newProps){
        this.selectModule(newProps.match.params.moduleId);
        this.selectCourse(newProps.match.params.courseId);
        this.selectLesson(newProps.match.params.lessonId);
    }

    selectModule(moduleId){
        this.setState({moduleId: moduleId});
    }

    selectCourse(courseId){
        this.setState({courseId: courseId})
    }

    selectLesson(lessonId){
        this.setState({lessonId: lessonId})
    }



    render(){
        return (
            <div>
                <TopicList courseId={this.state.courseId} moduleId={this.state.moduleId} lessonId={this.state.lessonId}/>
            </div>
        )
    }
}