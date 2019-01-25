import React, { Component } from 'react';

class GameInfo extends Component {
    render(){
        return(
            <div style={{position: 'fixed', top: 0, left: 50}}>
            <ul>
               <li>Time: {Math.round(this.props.time)}</li>
               <li>Score: {this.props.score}</li>
               <li>High score: {this.props.highScore}</li>
               </ul>
            </div>
        );
    }
}

export default GameInfo;