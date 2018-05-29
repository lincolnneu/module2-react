// entry point of an app
import React from 'react';
import ReactDOM from 'react-dom'; // only need this in high level index
import HelloWorld from './hello';
import CourseManager from './containers/CourseManager';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Hello from './components/Hello'
import Stateless from './components/Stateless'
import ModuleListItem from "./components/ModuleListItem";
import ModuleList2 from "./containers/ModuleList2"


ReactDOM.render(
    <ModuleList2/>,
    document.getElementById('root') // default id is root
); // render function can only have single element. More elements can be rendered inside div.