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
  colorChangeInterval: number = 100;
  debugMode: boolean;
  stop: boolean;

  constructor(width: number | undefined, height: number | undefined) { // width and height are the parent
    this.width = width;
    this.height = height;
    this.particles = [];
    this.numParticles = 1000; // number of particles
    this.cellSize = 7; // size of the cells
    this.curve = 4; // curve of the wave, bigger number = more curve
    this.zoom = 0.02; // zoom of the wave, bigger number = less zoom
    this.rows;
    this.cols;

    this.stop = false;

    this.debugMode = false;
    this.flowfield = [];
    this.init()

    window.addEventListener('keydown', e => {
      if (e.key === 'd') {
        this.debugMode = !this.debugMode;
        console.log('debug mode: ', this.debugMode);
      }
    })
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

  getGradient(context: CanvasRenderingContext2D): CanvasGradient {
    const gradient = context.createLinearGradient(0, 0, this.width || 0, this.height || 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'purple');
    gradient.addColorStop(1, 'blue');
    return gradient;
  }

  debug(context: CanvasRenderingContext2D) {
    context.save();
    context.strokeStyle = 'white';
    context.lineWidth = 0.3; // set the line width for debugging
    for (let c = 0 ; c < this.cols ; c++) {
      const x = c * this.cellSize;
      context.beginPath();
      context.moveTo(this.cellSize * c, 0);
      context.lineTo(this.cellSize * c, this.height!);
      context.stroke();
    }
    for (let r = 0 ; r < this.rows ; r++) {
      const y = r * this.cellSize;
      context.beginPath();
      context.moveTo(0, this.cellSize * r);
      context.lineTo(this.width!, this.cellSize * r);
      context.stroke();
    }
    context.restore();
  }

  render(context: CanvasRenderingContext2D){ // render the parent
    this.debug(context);
    context.clearRect(0, 0, this.width!, this.height!); // clear the parent
    // context.strokeStyle = this.color //this.getGradient(context); // set the line color
    
    if (context !== undefined) {
      this.particles.forEach((particle: Particle) => { // loop through the particles
        particle.draw(context); 
        particle.update();
      });
    } else {
      console.error('context is undefined');
    }
    this.colorChangeCounter++;
    if (this.colorChangeCounter >= this.colorChangeInterval) {
      this.colorChangeCounter = 0;
      this.getGradient(context);
    }
  }

  stopAnimation() {
    this.stop = true;
    this.numParticles = 0;
  }

}

export function animate(effect: Effect, context: CanvasRenderingContext2D) {
  effect.render(context);
  if (effect.stop === true) {
    return;
  }
  requestAnimationFrame(() => animate(effect, context)); // recursively call animate
}
