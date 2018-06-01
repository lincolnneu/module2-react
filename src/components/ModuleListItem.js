import React from 'react'

export default class ModuleListItem extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        let me = this;
        return( // return jsx declaration
        <li className="list-group-item">
            {this.props.title}
            <span className="float-right">
                <i onClick={function(){
                    console.log("x is clicked");
                    console.log(me.props.module.id);
                    me.props.deleteModule(me.props.module.id);
                }}
                   className="fa fa-times"></i>
            </span>
        </li>
    );
    }
}