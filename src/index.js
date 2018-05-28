// entry point of an app
import React from 'react';
import ReactDOM from 'react-dom'; // only need this in high level index
import HelloWorld from './hello';
import CourseManager from './containers/CourseManager';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

ReactDOM.render(
    <CourseManager/>,
    document.getElementById('root') // default id is root
);