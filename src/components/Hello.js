import React, {Component} from 'react'

class Hello extends Component{
    constructor(props){ // prop means property
        super(props); // pass it to parent.
    }
    render(){
        return(
            <h1>{this.props.message}</h1>
        )
    }
}

export default Hello;