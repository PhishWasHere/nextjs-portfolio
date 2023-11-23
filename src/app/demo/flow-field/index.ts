class Particle {
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
  }
  
  draw(context: CanvasRenderingContext2D) {
    // context.fillRect(this.x!, this.y!, 5, 5); // child.x (width), child.y(height)
    context.beginPath(); // begin drawing the line
    context.moveTo(this.history[0].x!, this.history[0].y!);

    for (let i = 0; i < this.history.length; i++) { // loop through the history
      context.lineTo(this.history[i].x!, this.history[i].y!); // draw a line to the x and y coordinates
    }
    context.stroke(); // draw the line
  }

  update() { // update the child
    this.timer--; // decrement the timer
    if (this.timer > 1) {
      let x = Math.floor(this.x! / this.effect.cellSize); // child.x (width) divided by parent.cellSize
      let y = Math.floor(this.y! / this.effect.cellSize); // child.y (height) divided by parent.cellSize
      let index = x + y * this.effect.cols; // index is x + y * parent.cols (columns)
  
      this.angle = this.effect.flowfield[index]; // angle is the flowfield at the index 
  
      this.xSpeed = Math.cos(this.angle!) * 2; // xSpeed is the cosine of the angle
      this.ySpeed = Math.sin(this.angle!) * 2; // ySpeed is the sine of the angle
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


    // // border collision detection (not needed)
    // if (this.x! > this.effect.width! || this.x! < 0) { // if child.x (width) is greater than parent.width or less than 0
    //   this.xSpeed *= -1; // reverse the direction
    // }
    // if (this.y! > this.effect.height! || this.y! < 0) { // if child.y (height) is greater than parent.height or less than 0
    //   this.ySpeed *= -1; // reverse the direction
    // }
  }

  reset() {
    this.x = Math.floor(Math.random() * (this.effect.width || 0)); // canvas.width
    this.y = Math.floor(Math.random() * (this.effect.height || 0)); // canvas.height
    this.history = [{x: this.x, y: this.y}]; // array of objects that hold the x and y coordinates of the particle
    this.timer = this.maxLen * 2; // timer is the maxLen multiplied by 2, this is used to reset the particle
  }
}

export class Effect {
  width: number | undefined;
  height: number | undefined;
  particles: Particle[];
  numParticles: number;
  cellSize: number;
  rows: any;
  cols: any;
  flowfield: number[];
  curve: number;
  zoom: number;
  colorChangeCounter: any;

  constructor(width: number | undefined, height: number | undefined) { // width and height are the parent
    this.width = width;
    this.height = height;
    this.particles = [];
    this.numParticles = 1000; // number of particles
    this.cellSize = 5; // size of the cells
    this.curve = 4; // curve of the wave, bigger number = more curve
    this.zoom = 0.02; // zoom of the wave, bigger number = less zoom
    this.rows;
    this.cols;
    this.flowfield = [];
    this.init()
  }

  init(){ // initialize the parent
    this.rows = Math.floor(this.width! / this.cellSize) * 3; // parent.width divided by parent.cellSize, rounded down to the nearest integer
    this.cols = Math.floor(this.height! / this.cellSize) * 3;
    for (let y = 0; y < this.rows; y++) { // loop through the rows
      for (let x = 0; x < this.cols; x++) { // loop through the columns
        // let angle = Math.random() * Math.PI * 2; // random angle
        let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve; // angle is the cosine of x * zoom plus the sine of y * zoom, multiplied by the curve, this creates a wave
        this.flowfield.push(angle); // push the angle into the flowfield array
      }
    }
    
    for (let i = 0; i < this.numParticles; i++) { // loop through the number of particles
      this.particles.push(new Particle(this));  // push a new particle into the array
    }
  }

  render(context: CanvasRenderingContext2D){ // render the parent
    context.clearRect(0, 0, this.width!, this.height!); // clear the parent
    context.lineWidth = 1; // set the line width
    context.strokeStyle =  '#ffffff'; // set the line color
    if (context !== undefined) {
      this.particles.forEach((particle: Particle) => { // loop through the particles
        particle.draw(context); 
        particle.update();
      });
    } else {
      console.log('context is undefined');
    }
  }
}


export function animate(effect: Effect, context: CanvasRenderingContext2D) {
  effect.render(context);
  requestAnimationFrame(() => animate(effect, context)); // recursively call animate
}