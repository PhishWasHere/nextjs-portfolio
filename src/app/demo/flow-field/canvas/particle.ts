import { Effect } from '.';

export class Particle {
  x: number | undefined;
  y: number | undefined;
  effect: Effect;
  xSpeed: number | undefined;
  ySpeed: number | undefined;
  history: {x: number | undefined, y: number | undefined}[];
  maxLen: number;
  angle: number | undefined;
  randomSpeed: number;
  timer: number;

  colorArr: string[];
  color: string;
  
  constructor(effect: Effect) { // effect is the parent
    this.effect = effect; // parent
    this.x = Math.floor(Math.random() * (effect.width || 0)); // canvas.width
    this.y = Math.floor(Math.random() * (effect.height || 0)); // canvas.height
    this.xSpeed; // xSpeed is the cosine of the angle, this is set in the update function
    this.ySpeed; // same but for ySpeed
    this.randomSpeed = Math.floor(Math.random() * 3 + 1); // random number between 1 and 3
    this.history = [{x: this.x, y: this.y}]; // array of objects that hold the x and y coordinates of the particle
    this.maxLen = Math.floor(Math.random() * 500 + 10); // random number between 10 and 100
    this.timer = this.maxLen * 2; // timer is the maxLen multiplied by 2, this is used to reset the particle

    this.colorArr = ['#4c026b', '#730d9e', '#9622c7', '#b44ae0', '#d96bf1', '#e8aaff', 'pink', 'purple']
    this.color = this.colorArr[Math.floor(Math.random() * this.colorArr.length)];
  }
  
  draw(context: CanvasRenderingContext2D) {
    // context.fillRect(this.x!, this.y!, 5, 5); // child.x (width), child.y(height)
    context.beginPath(); // begin drawing the line
    context.moveTo(this.history[0].x!, this.history[0].y!); // move to the first x and y coordinates in the history array
    for (let i = 0; i < this.history.length; i++) { // loop through the history
      context.lineTo(this.history[i].x!, this.history[i].y!); // draw a line to the x and y coordinates
    }
    context.strokeStyle = this.color;
    context.lineWidth = 0.3;
    context.stroke(); // draw the line
  }

  update() { // update the child
    this.timer--; // decrement the timer
    if (this.timer > 1) {
      let x = Math.floor(this.x! / this.effect.cellSize); // child.x (width) divided by parent.cellSize, this is the x coordinate of the flowfield array
      let y = Math.floor(this.y! / this.effect.cellSize); // same but for y
      let index = x + y * this.effect.cols; // index is x + y * parent.cols (columns), this is the index of the flowfield array that the particle is in
  
      this.angle = this.effect.flowfield[index]; // angle is the flowfield at the index 
  
      this.xSpeed = Math.cos(this.angle!) * 2; // xSpeed is the cosine of the angle, this is set in the update function
      this.ySpeed = Math.sin(this.angle!) * 2; // same but for y
      this.x! += this.xSpeed * this.randomSpeed; // child.x (width) plus xSpeed, this is the new x coordinate
      this.y! += this.ySpeed * this.randomSpeed; // same but for y coordinate
      
      this.history.push({x: this.x, y: this.y}); // push the new x and y coordinates into the history array
  
      if (this.history.length > this.maxLen) { // if the history array is greater than the limit (line 18)
        this.history.shift(); // remove the first element
      }
    } else if (this.history.length > 1) {
      this.history.shift();
    } else {
      this.reset();
    }

  }

  reset() {
    this.x = Math.floor(Math.random() * (this.effect.width || 0)); // canvas.width
    this.y = Math.floor(Math.random() * (this.effect.height || 0)); // canvas.height
    this.history = [{x: this.x, y: this.y}]; // array of objects that hold the x and y coordinates of the particle
    this.timer = this.maxLen * 2; // timer is the maxLen multiplied by 2, this is used to reset the particle
  }
}