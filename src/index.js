// entry point of an app
import React from 'react'
import ReactDOM from 'react-dom' // only need this in high level index
import HelloWorld from './hello'


ReactDOM.render(
    <HelloWorld/>,
    document.getElementById('root') // default id is root
);