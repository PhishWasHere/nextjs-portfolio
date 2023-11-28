import { Particle } from './particle';

export class Effect {
  // The width and height of the effect
  width: number | undefined;
  height: number | undefined;
  // A flag to indicate whether the effect should stop
  stop: boolean;
  // An array of particles that are part of the effect
  particles: Particle[];
  // The number of particles in the effect
  numParticles: number;
 
  constructor(width: number | undefined, height: number | undefined, numParticles?: number) { 
    this.width = width;
    this.height = height;
 
    this.particles = [];
    this.numParticles = numParticles || 1; // number of particles
    
    this.stop = false;


    this.init()
  }
 
  // Initialize the effect by creating the specified number of particles
  init(){
    for (let i = 0; i < this.numParticles; i++) { // loop through the number of particles
      this.particles.push(new Particle(this)); // push a new particle into the array
    }
  }
 
  // Render the effect on the canvas
  render(context: CanvasRenderingContext2D){ // render the parent
    context.clearRect(0, 0, this.width!, this.height!); // clear the parent
    // context.fillStyle = 'black'; // bg color
    // context.fillRect(0, 0, this.width!, this.height!);

 
    if (context !== undefined) {
      this.particles.forEach((particle: Particle) => { // loop through the particles
        particle.draw(context); 
        particle.update();
      });
    } else {
      console.error('context is undefined');
    }
  }
 
  // Reset the effect by removing all particles and re-initializing them
  reset() {
    this.particles = [];
    this.init();
  }

  stopAnimation() {
    this.stop = true;
    this.numParticles = 0;
  }
}
 
// Animate the effect by repeatedly rendering it until the stop flag is set
export function animate(effect: Effect, context: CanvasRenderingContext2D) {
  effect.render(context);
  if (effect.stop === true) {
    return;
  }
  requestAnimationFrame(() => animate(effect, context)); // recursively call animate
}