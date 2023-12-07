'use client'
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import p5 from 'p5';
import p5Types from 'p5';
import { Particle } from './particle';

const importFunction = () => import('react-p5').then((mod) => mod.default)
let Sketch: any = null
if (typeof window !== 'undefined') {
  Sketch = dynamic(importFunction, { ssr: false })
}

let isOnScreen = false;
let radius = 220;

let scl = 10;
let cols: number, rows: number, depth: number;
let particles: Particle[] = [];
let flowField: p5.Vector[] = [];
let art: p5.Graphics;

export default function HomeCanvas() {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);

    return () => {
      const remove = (p5: p5Types) => {
        p5.remove();
      }
      remove;
      // isOnScreen = false;
      setHasMounted(false);
    }
  }, []);
 
  if (!hasMounted) return null;
  
 
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    // p5.stroke(255);
    p5.noStroke();
    p5.noFill();
    p5.frameRate(60);

    cols = Math.floor(p5.width / scl);
    rows = Math.floor(p5.height / scl);

    art = p5.createGraphics(p5.width, p5.height);

    for (let i = 0; i < 100; i++) {
      let location = p5.createVector(p5.random(p5.width), p5.random(p5.height), 2); // 2 is depth
      let angle = 0
      let direction = p5.createVector(p5.cos(angle), p5.sin(angle));
      let speed = p5.random(1, 3) * 5;
      particles.push(new Particle(p5, location, direction, speed, art));
    }
  }

  const draw = (p5: p5Types) => {
    p5.clear(0, 0, 0, 0); // clear bg
    p5.orbitControl(2,2);
    p5.rotateY(90);
    p5.rotateZ(40);

    art.beginShape();

    for (let i=0; i < particles.length; i++) {
      particles[i].draw();
      particles[i].update(art);
    }
    art.endShape();

    p5.texture(art);
    p5.sphere(radius);
    // beginShape(p5);
  }

  const beginShape = (p5: p5Types) => {
    p5.beginShape();
    for (let i = 0; i < 360; i += 0.1) {
      let x = radius * p5.cos(i * 8);
      let y = radius * p5.sin(i * 8) * p5.sin(i * 9);
      let z = radius * p5.sin(i * 8) * p5.cos(i * 9);
      p5.vertex(x, y, z);
    } 

    p5.endShape();
  }
    
  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }

  return (
    <>
      {Sketch ? <Sketch className=' overflow-hidden' setup={setup} draw={draw} windowResized={windowResized}/> : <div className='text-6xl text-red-500'>Hydration Error</div>}
    </>
  )
}
