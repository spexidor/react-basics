import React, { Component } from 'react';
import logo from './logo.svg';

class Logo extends Component {
    render(){
        return(
            <div>
            <img src={logo} className="App-logo" alt="React-Logo" 
            style={{width: 200, height: 200, position: 'absolute', top: this.props.top, left: this.props.left}}/>
            </div>
        );
    }
}

export default Logo;