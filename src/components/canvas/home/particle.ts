import p5 from 'p5';
import p5Types from 'p5';

export class Particle {
  p5: p5;
  loc: any;
  dir: any;
  speed: number;
  art: p5.Graphics;
  maxLen: number;
  timer: number;
  history: { x: any; y: any; z: any; }[];
  
  constructor(p5: p5Types, loc: any, dir: any, speed: number, art: p5.Graphics) {
    this.art = art;
    this.p5 = p5;
    this.loc = loc;
    this.dir = dir;
    this.speed = speed;
    this.history = [{x: this.loc.x, y: this.loc.y, z: this.loc.z}];
    this.maxLen = Math.floor(Math.random() * 500 + 10);
    this.timer = this.maxLen * 2;
  }
  
  draw() {
    this.move(this.p5);
    // this.update(this.art);
  }

  move(p5: p5Types) {
    let angle = p5.noise(this.loc.x, this.loc.y) * p5.TWO_PI * 10; // 10 is the frequency
    this.dir.x = p5.cos(angle);
    this.dir.y = p5.sin(angle);
    let vel = this.dir.copy();
    vel.mult(this.speed / 2);
    this.loc.add(vel);
  }

  update(art: p5.Graphics) {
    this.timer--;
    if (this.timer > 1) {
        art.fill(255, 255, 255, 5);
        // art.ellipse(this.loc.x, this.loc.y, 1, 1);
        art.line(this.loc.x, this.loc.y, this.loc.x + 1, this.loc.y + 1);
        this.history.push(this.loc.x, this.loc.y, this.loc.z);
        
      if (this.history.length > this.maxLen) {      
        this.history.shift();
      }
    } else if (this.history.length > 1) {
      this.history.shift();
    } else {
      return
    }
  }

}
