import React from 'react'
import {Link} from 'react-router-dom'

export default class ModuleListItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            attribute:'',
            moduleId:'',
            curModuleId:''
        }
        this.setAttribute = this.setAttribute.bind(this);
    }

    setAttribute(){
        console.log("16 setting attribute!");
        this.setState({attribute:this.props.attribute});
        console.log(this.state.attribute);
    }

    componentDidMount(){
        this.setAttribute();
    }


    render(){
        let me = this;
        console.log("24 in moduleItem");
        console.log(me.state.curModuleId)
        return( // return jsx declaration
        <li className={`list-group-item ${this.state.attribute}`}>
            <Link to = {`/course/${this.props.courseId}/module/${this.props.module.id}`}
            onClick={function(){
                console.log("26 this module is clicked!")
                this.setAttribute();
            }}>
                {this.props.title}
            </Link>

            <span className="float-right">
                <i onClick={function(){
                    me.props.deleteModule(me.props.module.id);
                }}
                   className="fa fa-times"></i>
            </span>
        </li>
    );
    }
}