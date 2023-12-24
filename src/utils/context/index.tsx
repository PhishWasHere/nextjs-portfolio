'use client'

// might make everything into a component since css styles are breaking if applied to this component directly
import { createContext, useContext, useState, useEffect } from 'react';
import ParticleCanvas from "@/components/canvas/three.js/particleBG"
import Loading from '../../app/[locale]/loading';
import ContextComponent from '@/components/contextComonent';

export const Context = createContext<any>(null); 

let pointer: any;
let pointerFollow: any;
let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

export const ContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    // need to set isLoading to false here too
    pointer = document.getElementById('pointer');
    pointerFollow = document.getElementById('pointer-follow');
    setIsloading(false);
  }, [isLoading]);
  
  useEffect(() => {
    if (!pointer) return; 
    // not sure why, but i need to use the mouseMove function to get the pointer to follow the cursor
      // if i use something like a cb func on the eventListener that calls animate(e), the thing breaks and idk why
    const mouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    if (window.matchMedia("(pointer: coarse)").matches) {
      pointer.style.display = 'none';
      pointerFollow.style.display = 'none';
    } else {
      const animate = () => {
        posX += (mouseX - posX); 
        posY += (mouseY - posY);
        pointer.style.left = `${mouseX}px`;
        pointer.style.top = `${mouseY}px`;
        pointerFollow.style.left = `${posX}px`;
        pointerFollow.style.top = `${posY}px`;
        requestAnimationFrame(animate);
      }
 
      document.addEventListener('mousemove', mouseMove)
      animate();
    }

    return () => {
      document.removeEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        pointer.style.left = `${x}px`;
        pointer.style.top = `${y}px`;
        pointerFollow.style.left = `${x}px`;
        pointerFollow.style.top = `${y}px`;
      })
    }
  },[pointer])

  return(
    <Context.Provider value={[]}>
    {isLoading ? (
      <Loading />
    ) : (
      <main className="">
        <span id='pointer' style={{}} aria-description='custom cursor'></span>
        <span id='pointer-follow' style={{}} aria-description='sphere graphic following cursor'></span>

        <ContextComponent />

        <section className='overflow-auto m-2 p-2 rounded mt-[10vh] italic font-light bg-black bg-opacity-50 text-lg' >
          {children}
        </section>
        
        <ParticleCanvas onLoad={(isLoading) => setIsloading(isLoading)}/>
      </main>
    )}
    </Context.Provider>
  )
}