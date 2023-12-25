'use client'

import './index.css';
import { createContext, useContext, useState, useEffect, Suspense, lazy, useRef } from 'react';
import { usePathname } from '@/navigation';

import ParticleCanvas from '@/components/canvas/three.js/particleBG';
import ContextComponent from '@/components/contextComonent';

// kinda need lazy loading to work, but it breaks the cursor aaaaaaa
// const ParticleCanvas = lazy(() => import("@/components/canvas/three.js/particleBG"));

import Loading from '../../app/[locale]/loading';

export const Context = createContext<any>(null); 

let pointer: any;
let pointerFollow: any;
let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

export const ContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [isLoading, setIsloading] = useState(true);
  const [onHome, setOnHome] = useState(true);
  const path = usePathname();
  useEffect(() => {
    // need to set isLoading to false here too
    pointer = document.getElementById('pointer');
    pointerFollow = document.getElementById('pointer-follow');    
    setIsloading(false);
  }, [isLoading]);

  useEffect(() => {
    if (path === '/') {
      setOnHome(true);
    } else {
      setOnHome(false);
    }    
  }, [path]);
  
  useEffect(() => {
    if (!pointer) return; 
    
    // not sure why, but i need to use the mouseMove function to get the pointer to follow the cursor
      // if i use something like a cb func on the eventListener that calls animate(e), the thing breaks and idk why
    const mouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // if mobile/tablet, hide pointer
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
      })
    }
  },[pointer])

  return(
    <>
    <Suspense fallback={<Loading />}>
    {isLoading ? (null) : (
      <Context.Provider value={[]}>
        <main>
          <span id='pointer' style={{}} aria-description='custom cursor'></span>
          <span id='pointer-follow' style={{}} aria-description='sphere graphic following cursor'></span>

          <ContextComponent />

          <section className='margin-t'>
            <div id={``} className={`italic font-light text-lg ${onHome? 'home' : 'child'}`}>
              {children}
            </div>
          </section>

          <ParticleCanvas onLoad={(isLoading) => setIsloading(isLoading)}/>
        </main>
      </Context.Provider>
      )}
    </Suspense>
    </>
  )
}   
