import React, {Component} from 'react'

class Hello extends Component{
    constructor(props){ // prop means property
        super(props); // pass it to parent.
    }
    render(){
        return(
            <h1>Hello World</h1>
        )
    }
}

export default Hello;