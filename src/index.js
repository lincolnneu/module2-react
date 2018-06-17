// entry point of an app
import React from 'react';
import ReactDOM from 'react-dom'; // only need this in high level index
import CourseManager from './containers/CourseManager';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';


const bootstrap = require('bootstrap');
// className={"container-fluid"} add some paddings to both side.
ReactDOM.render(

        <CourseManager/>,
    document.getElementById('root') // default id is root
); // render function can only have single element. More elements can be rendered inside div.