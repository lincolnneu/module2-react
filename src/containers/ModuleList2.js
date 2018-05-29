import React from 'react'
import ModuleListItem from '../components/ModuleListItem'
import Stateless from "../components/Stateless";

class ModuleList2 extends React.Component{
    // all render functions only takes single element
    render(){
        return (
            <div>
                <ModuleListItem title="React Module"/>
                <ModuleListItem title="Redux"/>
                <ModuleListItem title="React Native"/>
                <Stateless message={"this is a stateless component"}/>
            </div>
        );
    }
}

export default ModuleList2;