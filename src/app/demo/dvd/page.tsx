'use client'
import { useEffect, useRef } from "react"
import { useDemo } from "@/utils/context"
import { Effect } from "./index"

// just use css for this one

let canvas: HTMLElement | null;
let ctx: CanvasRenderingContext2D | null; // canvas context
let dvd: HTMLElement | null;

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
      dvd = document.getElementById('dvd');
    }
 
    if(ctx) {
      let x = canvas?.clientWidth
      let y = canvas?.clientHeight
      effect = new Effect(canvas, dvd);
      effect.update(ctx);
    }
  
    return () => {
      setIsDemo(false);
    }
  }, []);

  return (
    <>
      <canvas className="bg-red-500 w-full h-full absolute -z-10" id='canvas' ref={canvasRef} >
        <svg height="100px" width="100px" version="1.1" id="dvd" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 15.465 15.465" xmlSpace="preserve">
          <g>
            <g>
              <g>
                <path style={{fill:"#030104" }}d="M7.4,8.959c-4.132,0-7.4,0.55-7.4,1.227c0,0.678,3.268,1.227,7.4,1.227s7.543-0.549,7.543-1.227
                  C14.944,9.508,11.533,8.959,7.4,8.959z M7.263,10.51c-0.957,0-1.733-0.237-1.733-0.53s0.776-0.53,1.733-0.53
                  s1.732,0.237,1.732,0.53S8.219,10.51,7.263,10.51z M13.319,4.052H9.701L7.769,6.291l-0.92-2.208H1.145L0.933,5.045h2.269
                  c0,0,1.037-0.136,1.071,0.694c0,1.438-2.376,1.316-2.376,1.316l0.444-1.5H0.869L0.194,7.988h2.668c0,0,2.821-0.25,2.821-2.218
                  c0,0,0.114-0.574,0.066-0.827L7.124,8.62l3.435-3.565h2.606c0,0,0.798,0.068,0.798,0.685c0,1.438-2.359,1.288-2.359,1.288
                  l0.365-1.472h-1.287L9.946,7.989h2.453c0,0,3.066-0.19,3.066-2.279C15.465,5.709,15.404,4.052,13.319,4.052z"/>
              </g>
            </g>
          </g>
        </svg>
      </canvas>

      <div  className=''>
        <h1 className='text-4xl font-bold'>dvd bounce</h1>
      </div>
      <button onClick={() => {console.log(event);}}>click</button>
    </>
  )
}