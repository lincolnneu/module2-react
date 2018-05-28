import React from 'react'

class HelloWorld extends React.Component{ // inherent Component
    render(){
        return(
            <h1> Hello World from component !</h1>
        )
    }
}

// export to make this file also be accessible by other files.

export default HelloWorld;// default package nameSpace