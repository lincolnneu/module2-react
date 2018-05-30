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
// import ModuleList from "./containers/ModuleList"
import App from "./examples/App"

// className={"container-fluid"} add some paddings to both side.
ReactDOM.render(
    <div className={"container-fluid"}>
        <App/>
        <CourseManager/>
        {/*<Stateless message={"this is a stateless component"}/>*/}
    </div>,
    document.getElementById('root') // default id is root
); // render function can only have single element. More elements can be rendered inside div.