'use client'
import { useDemo } from '@/utils/context';
import { useEffect, useRef } from 'react';
import { Effect, animate } from './index';

let canvas: HTMLElement | null;
let ctx: CanvasRenderingContext2D | null; // canvas context

let effect: Effect;

export default function Page() {
  const { isDemo, setIsDemo } = useDemo();  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // first useEffect is to set canvas size. this stops the canvas from being stretched
  useEffect(() => {
    if (canvasRef.current !== null) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }, []);
 
  useEffect(() => {
    setIsDemo(true);
 
    if (canvasRef.current !== null) {
      ctx = canvasRef.current.getContext('2d');
      canvas = document.getElementById('canvas');
    }
 
    if(ctx) {

      let x = canvas?.clientWidth
      let y = canvas?.clientHeight
      effect = new Effect(x, y);
      animate(effect, ctx);
    }
  
    return () => {
      setIsDemo(false);
    }
  }, []);

  return (
    <>
    <canvas className="bg-black w-full h-full absolute -z-10" id='canvas' ref={canvasRef}>
    </canvas>
      <div  className=''>
        <h1 className='text-4xl font-bold'>flow field</h1>
      </div>
    <button onClick={() => {console.log(effect)}}>click</button>
    </>
    
  )
}