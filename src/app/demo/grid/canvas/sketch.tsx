'use client'
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import p5Types from 'p5';

const importFunction = () => import('react-p5').then((mod) => mod.default)
let Sketch: any = null
if (typeof window !== 'undefined') {
  Sketch = dynamic(importFunction, { ssr: false })
}

let cols: number, rows: number;
let spacing = 13;
let size: number[][] = [];
let scale = 0.06;
let isOnScreen = false;


export default function Canvas() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    return () => {
      const remove = (p5: p5Types) => {
        p5.remove();
      }
      remove;
      isOnScreen = false;
      setHasMounted(false);
    }
  }, []);
 
  if (!hasMounted) return null;
  
 
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    cols = p5.floor(p5.width / spacing);
    rows = p5.floor(p5.height / spacing);
    
    p5.mouseX = p5.width / 2;
    p5.mouseY = p5.height / 2;
  }

  const draw = (p5: p5Types) => {
    p5.clear(0, 0, 0, 0); // clear bg
    
    for (let i = 0; i < cols; i++) { // create 2d array
      size[i] = [];
      for (let j = 0; j < rows; j++) {
        let x = spacing/2 + i * spacing;
        let y = spacing/2 + j * spacing;
        size[i][j] = (p5.dist(p5.mouseX, p5.mouseY, x, y))*scale; // distance from mouse

      }
    }

    // grid logic
    for (let i = 0; i < cols; i++) { // draw squares
      for (let j = 0; j < rows; j++) {
        let x = spacing/2 + i * spacing;
        let y = spacing/2 + j * spacing;
        p5.noStroke();
        p5.fill(0, 0, 0, 255);
        p5.rectMode(p5.CENTER);
        p5.rect(x, y, size[i][j], size[i][j]);
      }
    }
  } 
    
  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    cols = p5.floor(p5.width / spacing);
    rows = p5.floor(p5.height / spacing);
  }

  return (
    <>
      {Sketch ? <Sketch className=' overflow-hidden' setup={setup} draw={draw} windowResized={windowResized}/> : <div className='text-6xl text-red-500'>Hydration Error</div>}
    </>
  )
}
