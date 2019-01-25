import React, { Component } from 'react';
import './App.css';
import Logo from './Logo.js';
import Target from './Target.js';
import GameInfo from './GameInfo.js'

const buttonTextStart = "Start game!";
const buttonTextStop = "Reset game";
const collisionDistance = 50;
let buttonText = buttonTextStart;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      game_started: false,
      score: 0,
      highScore: 0,
      timeRemaining: 20,

      x_pos: 0,
      y_pos: 100,
      x_mouse: 0,
      y_mouse: 0,

      target_x_pos: 150, //start pos
      target_y_pos: 150, //start pos
      target_x_speed: 0,
      target_y_speed: 0,
    };

    this.keyFunction = this.keyFunction.bind(this);
    this.mouseFunction = this.mouseFunction.bind(this);
    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.buttonPress = this.buttonPress.bind(this);
  }

  tick(){
    if(this.state.game_started){
      this.setState({ 
      target_x_pos: this.moveTargetX(),
      target_y_pos: this.moveTargetY(),
      x_pos: this.update_x_pos(),
      y_pos: this.update_y_pos(),
      timeRemaining: this.state.timeRemaining - 0.02
      });
      this.checkCollision();
      this.checkTimer();
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.keyFunction, false);
    this.interval = setInterval(() => this.tick(), 20);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyFunction, false);
    document.removeEventListener("mousemove", this.mouseFunction, false);
    clearInterval(this.interval);
  }

  moveTargetX(){
    if(this.state.target_x_pos > 1000 || this.state.target_x_pos < 0){
      this.reverseXDirection();
    }
    return this.state.target_x_pos+this.state.target_x_speed;
  }
  moveTargetY(){
    if(this.state.target_y_pos > 650 || this.state.target_y_pos < 0){
      this.reverseYDirection();
    }
    return this.state.target_y_pos+this.state.target_y_speed;
  }

  update_x_pos(){
    let x_dist = this.state.x_pos - this.state.x_mouse;
    let x_upd = x_dist / 40;
    
    if(Math.abs(x_upd) < 0.5)
    {x_upd = 0;}

    //return this.state.x_pos - x_upd;
    return this.state.x_mouse;
  }
  update_y_pos(){
    let y_dist = this.state.y_pos - this.state.y_mouse;
    let y_upd = y_dist / 40;

    if(Math.abs(y_upd) < 0.5)
    {y_upd = 0;}
    
    //return this.state.y_pos - y_upd;
    return this.state.y_mouse;
  }

  buttonPress(){
    if(this.state.game_started){
      this.resetGame();
    }else {
      this.startGame();
    }
  }

  checkCollision(){
    //alert("checking collisions");
    if(Math.abs(this.state.x_pos - this.state.target_x_pos)<collisionDistance && 
       Math.abs(this.state.y_pos - this.state.target_y_pos)<collisionDistance){
        //collision!
        //alert("collisions!");
        this.score();
    }
    else{
      //alert("no collisions. x_pos=" +this.x_pos +", mouse pos=" +this.target_x_pos);
    }
  }

  checkTimer(){
    if(this.state.timeRemaining < 0){
      this.gameOver();
    }
  }

  score(){
    //alert("score!");
    this.setState({ 
      score: this.state.score +1,
      target_x_speed: this.state.target_x_speed < 0 ? this.state.target_x_speed - 0.4 : this.state.target_x_speed + 0.4,
      target_y_speed: this.state.target_y_speed < 0 ? this.state.target_y_speed - 0.4 : this.state.target_y_speed + 0.4
    })
  }

  gameOver(){
    alert("Game over man, game over!  Your score was " +this.state.score);
    this.resetGame();
  }
  startGame(){
    //alert("game started!");
    document.addEventListener("mousemove", this.mouseFunction, false);
    buttonText = buttonTextStop;

    this.setState({ 
      game_started: true,
      target_x_speed: 1,
      target_y_speed: 1
    })
  }
  resetGame(){
    //alert("game stopped!");
    buttonText = buttonTextStart;

    this.setState({ 
      game_started: false,
      target_x_speed: 0,
      target_y_speed: 0,
      highScore: this.state.highScore > this.state.score ? this.state.highScore : this.state.score,
      score: 0,
      timeRemaining: 20
    })
  }
  mouseFunction(event){
    //alert("mouse move! x=" +event.screenX +", y=" +event.screenY);
    //this.mouseUpdate();
    this.setState({
      x_mouse: event.screenX -110,
      y_mouse: event.screenY -190
    })
  }
 
 keyFunction(event){
   //37, 38, 39, 40: left, up, right, down
  //alert("onKeyPressed! " +event.keyCode);
  
  if(event.keyCode===37){
    //alert("left");
    this.goLeft();
  }
  else if(event.keyCode===38){
    //alert("up");
    this.goUp();
  }
  else if(event.keyCode===39){
    //alert("right");
    this.goRight();
  }
  else if(event.keyCode===40){
    //alert("down");
    this.goDown();
  } 
}
  
  render() {
    
    return ( 
      <div className="App" onKeyDown={this.onKeyPressed}>
        <header className="App-header">
          <Logo top={this.state.y_pos} left={this.state.x_pos}/>
          <Target top={this.state.target_y_pos} left={this.state.target_x_pos}/>
          <GameInfo score={this.state.score} time={this.state.timeRemaining} highScore={this.state.highScore}/>
          <button style={{position: 'absolute', top: 50, left: 650}}onClick={this.buttonPress}>{buttonText}</button>
        </header>
      </div>
    );
  }

  //Helper functions:
  reverseXDirection(){
    let x_new = -this.state.target_x_speed;
    this.setState({
      target_x_speed: x_new
    })
  }
  reverseYDirection(){
    let y_new = -this.state.target_y_speed;
    this.setState({
      target_y_speed: y_new
    })
  }

  goRight(){  
    let x_new = this.state.x_pos + 10;
    this.setState({
      x_pos: x_new
    })
  }
  goLeft(){  
    let x_new = this.state.x_pos - 10;
    this.setState({
      x_pos: x_new
    })
  }

  goUp(){  
    let y_new = this.state.y_pos - 10;
    this.setState({
      y_pos: y_new
    })
  }
  goDown(){  
    let y_new = this.state.y_pos + 10;
    this.setState({
      y_pos: y_new
    })
  }
}

export default App;