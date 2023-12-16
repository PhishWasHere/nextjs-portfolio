'use client'
// add bg to the "components" with a opacity that increases with scroll
// add animation triggers, so all animations dont play at once

import { useEffect, useState, useRef } from 'react';
import {useTranslations} from 'next-intl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from "@/components/canvas/three.js/particleBG"

import Loading from './loading';

import About from '@/components/about';
import Projects from '@/components/projects';

export default function Home() {
  const [isLoading, setIsloading] = useState(true);
  const t = useTranslations('home');
  const scroll = useRef(0);

  useEffect(() => {
    // need to set isLoading to false here too
    setIsloading(false);
  }, [isLoading]);

  useGSAP(() => {
    // need to move into utils so i can support touch and wheel events
    gsap.registerPlugin(ScrollTrigger);

    const handleScroll = (e: WheelEvent) => {
      // Update scroll value
      if (e.deltaY < 0 && scroll.current < 0) {
        scroll.current += 1;
      } else if (e.deltaY > 0 && scroll.current > -40) {
        scroll.current -= 1;
      }

      // Request animation frame for smooth animation
      requestAnimationFrame(() => {
        if (scroll.current > -40 && scroll.current < 0) {
          const fontSize = gsap.utils.mapRange(-40, 0, 2.75, 3.25, scroll.current);
          const opacity = gsap.utils.mapRange(-40, 0, 0, 1, scroll.current); 

          gsap.to('#h1-name', { y: `${scroll.current}vh`, fontSize: `${gsap.utils.clamp(2.75, 3.25, fontSize)}rem`, ease: 'power2.out' });
          gsap.to('#h2-alt', { y: `${scroll.current}vh`, fontSize: `${gsap.utils.clamp(0.75, 1.25, fontSize)}rem`, opacity: opacity, ease: 'power2.out' });
          // console.log(scroll.current);
        }
      });
    };
    
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <>
    {isLoading ? (
      <Loading />
      ) : (
        <main className="shadow font-extralight italic ">
        <section className='grid grid-rows-1 justify-center mt-[50vh]'>
          <h1 id='h1-name' className='text-[3.25rem] '>
            {/* {t('first')} {t('last')} */}
          </h1>

          { t('first_alt') && t('last_alt') ? (
            <h2 id='h2-alt' className='text-[1.25rem] '>
              {/* {t('first_alt')} {t('last_alt')} */}
            </h2>
            ) : (
              null
            )
          }
        </section>

        {/* <About /> */}
        <Projects />

        <ParticleCanvas onLoad={(isLoading) => setIsloading(isLoading)}/>
      </main>
    )}
    </>
  )
}
// import HomeCanvas from "@/components/canvas/home"
// import ThreeCanvas from "@/components/canvas/three.js/noise"
// import PlaneCanvas from "@/components/canvas/three.js/plane"