
// const image = new Image();
// image.src = './dvd.svg';

export class Effect {
  width: number | undefined;
  height: number | undefined;
  stop: boolean;
  xPos: number;
  yPos: number;
  xSpeed: number;
  ySpeed: number;
  image: any;
  
  constructor(canvas: any | undefined, image: any) {
    this.width = canvas.width;
    this.height = canvas.height;

    this.image = image;
    
    this.xPos = 0;
    this.yPos = 0;

    this.xSpeed = 1;
    this.ySpeed = 1;

    this.stop = false;
  }
  
  animate(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, this.width!, this.height!);
 
    context.drawImage(this.image, this.xPos, this.yPos);
 
    this.xPos += this.xSpeed;
    this.yPos += this.xSpeed;
 
    // border collision detection 
    if (this.xPos! > this.width! || this.xPos! < 0) { // if child.x (width) is greater than parent.width or less than 0
      this.xSpeed *= -1; // reverse the direction
    }
    if (this.yPos! > this.height! || this.yPos! < 0) { // if child.y (height) is greater than parent.height or less than 0
      this.ySpeed *= -1; // reverse the direction
    }
 
    requestAnimationFrame(() => this.animate(context)); // recursively call animate
  }
 
  update(context: CanvasRenderingContext2D) {
    this.animate(context); // Start the animation
  }
}
