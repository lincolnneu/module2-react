// entry point of an app
import React from 'react';
import ReactDOM from 'react-dom'; // only need this in high level index
import HelloWorld from './hello';
import CourseManager from './containers/CourseManager';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Hello from './components/Hello'
import Stateless from './components/Stateless'
ReactDOM.render(
    <Stateless message={"this is a stateless component"}/>,
    document.getElementById('root') // default id is root
);