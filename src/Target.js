import React, { Component } from 'react';
import target from './target.svg';

class Target extends Component {
    render(){
        return(
            <div>
            <img src={target} className="App-logo" alt="React-Logo" 
            style={{width: 100, height: 100, position: 'absolute', top: this.props.top, left: this.props.left}}/>
            </div>
        );
    }
}

export default Target;