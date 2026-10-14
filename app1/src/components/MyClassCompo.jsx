import React, { Component } from 'react';
export default class MyClassCompo extends Component {
    constructor() {
       super();
       this.state = {
           name: "Ajay kumar"
         };   
    }

    
    componentWillMount() {
        console.log("MyClassCompo componentWillMount called");
        console.log("MyClassCompo componentWillMount state.name: " + this.state.name); 
    }


    componentDidMount() {
        this.setState({ name: "Vimal" });
        console.log("MyClassCompo componentDidMount called");
        console.log("MyClassCompo componentDidMount state.name: " + this.state.name);
    
    }
    
    render() {
        return (
            <div>
                <h1>Welcome with class component</h1>
                <p>MyClassCompo state.name: {this.state.name}</p>
                <hr/>
                
            </div>
        );
    }

}