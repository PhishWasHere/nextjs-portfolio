'use client'
// add bg to the "components" with a opacity that increases with scroll
// add animation triggers, so all animations dont play at once
import './style.css'

import { useEffect, useState, useRef } from 'react';
import {useTranslations} from 'next-intl';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from "@/components/canvas/three.js/particleBG"
gsap.registerPlugin(ScrollTrigger, Observer);

import Loading from './loading';

import About from '@/components/about';
import Projects from '@/components/projects';
import Contact from '@/components/contact';


let sections: any[];
let wrap: (index: number) => number;
let animating = false;
let currentIndex = -1;
export default function Home() {
  const [isLoading, setIsloading] = useState(true);
  const t = useTranslations('home');

  useEffect(() => {
    // need to set isLoading to false here too
    // console.clear();
    setIsloading(false);
    sections = gsap.utils.toArray('.section');
    wrap = gsap.utils.wrap(0, sections.length);

    () => {
      sections.forEach((section: any, index: number) => {
        gsap.set(section, { zIndex: 0, autoAlpha: 0, opacity: 0 });
      });
    }
  }, [isLoading]);

  useGSAP(() => {

    const clear = (tl: gsap.core.Timeline, i: number) => {
      sections.forEach((section: gsap.TweenTarget, index: number) => {
        if (index !== i) {
          tl.to(section, { zIndex: -1, autoAlpha: 0, opacity: 0 }, 0);
        }
      });
    }
    
    const goNext = (i: number) => {
      animating = true;
      i = wrap(i)

      const tl = gsap.timeline({
        defaults: {
          duration: 0.5,
          ease: 'power2.out'
        },
        onComplete: () => {
          animating = false;
          currentIndex = i;
        }
      });

      clear(tl, i);
      tl.to(sections[i], { zIndex: 2, autoAlpha: 1, opacity: 1 }, 0);
    }

    const goPrev = (i: number) => {
      animating = true;
      i = wrap(i)
    
      const tl = gsap.timeline({
        defaults: {
          duration: 0.5,
          ease: 'power2.out'
        },
        onComplete: () => {
          animating = false;
          currentIndex = i;
        }
      });

      clear(tl, i);
      tl.fromTo(sections[i], {}, { zIndex: 2, autoAlpha: 1, opacity: 1 }, 0);
    }

    Observer.create({
      type: 'wheel, touch',
      preventDefault: true,
      onUp: () => {
        console.log('down');
        if (animating) return;
        goPrev(currentIndex - 1);
      },
      onDown: () => {
        if (animating) return;
        goNext(currentIndex + 1);
        console.log(currentIndex);
      }
    })

    return () => {
      // remove stuff later
    }
  }, []);
  
  
  return (
    <>
    {isLoading ? (
      <Loading />
      ) : (
        <main className="shadow font-extralight italic ">
        <section className='grid grid-rows-1 justify-center mt-[50vh]'>
          <h1 id='h1-name' className='text-[3.25rem] '>
            {t('first')} {t('last')}
          </h1>
          { t('first_alt') && t('last_alt') ? (
            <h2 id='h2-alt' className='text-[1.25rem] '>
              {t('first_alt')} {t('last_alt')}
            </h2>
            ) : (
              null
            )
          }
        </section>
        
        <section id='wrapper'>

          <section className='section opacity-0'>
            <About />
          </section>

          <section className='section opacity-0'>
            <Projects />
          </section>  

          <section className='section opacity-0'>
            <Contact />
          </section>

        </section>

        <ParticleCanvas onLoad={(isLoading) => setIsloading(isLoading)}/>
      </main>
    )}
    </>
  )
}
// import HomeCanvas from "@/components/canvas/home"
// import ThreeCanvas from "@/components/canvas/three.js/noise"
// import PlaneCanvas from "@/components/canvas/three.js/plane"
