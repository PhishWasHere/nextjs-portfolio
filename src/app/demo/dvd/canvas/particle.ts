import { Effect } from '.';

export class Particle {
  // The effect that this particle is a part of
  effect : Effect;
  // The x and y coordinates of the particle
  x: number | undefined;
  y: number | undefined;
  // The speed of the particle in the x and y directions
  xSpeed: number | undefined;
  ySpeed: number | undefined;
  // The direction of the particle in the x and y directions
  xDirection: number;
  yDirection: number;
  // The size of the particle
  size: number;
  // The random speed of the particle
  randomSpeed: number;
  image: HTMLImageElement;
  
  constructor(effect: Effect) { // effect is the parent
    this.effect = effect; 
    this.size = 100;
 
    // Initialize the x and y coordinates of the particle within the effect's dimensions
    this.x = Math.floor(Math.random() * (effect.width! - this.size));
    this.y = Math.floor(Math.random() * (effect.height! - this.size));
 
    // The xSpeed and ySpeed are not initialized here, they are set in the update function
    this.xSpeed; 
    this.ySpeed;
 
    // The initial direction of the particle in the x and y directions
    this.xDirection = 1;
    this.yDirection = 1;

    this.image = new Image(this.size, this.size);
    this.image.onload = () => {
      this.image.src = ".dvd.svg"; 
    }
    // The random speed of the particle is a random number between 0.5 and 2.5
    this.randomSpeed = Math.random() * 2 + 0.5;
  }
  
  // Draw the particle on the canvas
  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'blue'; // color of rect
    context.fillRect(this.x!, this.y!, this.size, this.size); // child.x (width), child.y(height)
    // if (this.image.complete) {
      // console.log(this.image.src, 'asdasd2');
      // context.drawImage(this.image, this.x!, this.y!, this.size, this.size); // why no work :(
    // }
  }
 
  // Update the particle's position and direction
  update() { // update the child
    // The speed of the particle in the x and y directions is set to the random speed
    this.xSpeed = this.randomSpeed;
    this.ySpeed = this.randomSpeed;
    
    // Calculate the new x and y coordinates of the particle
    const newX = this.x! + this.xSpeed * this.xDirection;
    const newY = this.y! + this.ySpeed * this.yDirection;
 
    // If the particle hits the border of the effect, reverse its direction
    if (newX > this.effect.width! - this.size || newX < 0) {
      this.xDirection *= -1; // reverse the direction
    }
    if (newY > this.effect.height! - this.size || newY < 0) {
      this.yDirection *= -1; // reverse the direction
    }
 
    // Update the x and y coordinates of the particle
    this.x = newX;
    this.y = newY;
  }
} 