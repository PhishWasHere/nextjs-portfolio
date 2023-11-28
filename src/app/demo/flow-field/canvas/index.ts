import { Particle } from './particle';

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
    this.numParticles = 3000; // number of particles
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
    // context.clearRect(0, 0, this.width!, this.height!); 
  }

}

export function animate(effect: Effect, context: CanvasRenderingContext2D) {
  effect.render(context);
  if (effect.stop === true) {
    return;
  }
  requestAnimationFrame(() => animate(effect, context)); // recursively call animate
}
