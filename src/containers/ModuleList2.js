import React from 'react'
import ModuleListItem from '../components/ModuleListItem'
import Stateless from "../components/Stateless";

class ModuleList2 extends React.Component{

    constructor(){
        super();
        this.state = {
            modules: [
                {title : 'Module 1 - jQuery', id: 123},
                {title : 'Module 2 - React', id: 234},
                {title : 'Module 3 - Redux', id: 345},
                {title : 'Module 4 - Angular', id: 456},
                {title : 'Module 5 - Node.js', id: 567},
                {title : 'Module 6 - MongoDB', id: 678}
            ]
        };
    }

    renderListOfModules(){
        let modules = <div>
            <ModuleListItem title="React Module"/>
            <ModuleListItem title="Redux"/>
            <ModuleListItem title="React Native"/>
            <ModuleListItem title="Angular"/>
            <Stateless message={"this is a stateless component"}/>
        </div>;
            return modules;
    }



    // all render functions only takes single element
    render(){
        return (
            <div>
            {this.renderListOfModules()}
            </div>
        )
    }
}

export default ModuleList2;