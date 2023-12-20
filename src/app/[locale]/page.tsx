'use client'
import './style.css'
// need to double check language messages

import React, { useEffect, useState, useRef } from 'react';
import {useTranslations} from 'next-intl';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from "@/components/canvas/three.js/particleBG"
gsap.registerPlugin(ScrollTrigger, Observer);

import Loading from './loading';

import Navbar from '@/components/navbar';
import About from '@/components/about';
import Projects from '@/components/projects';
import Contact from '@/components/contact';

let sections: any[];
let wrap: (index: number) => number;
let currentIndex = -1;
let onHome = true; // using useState for this causes an infinite loop (even if you set it to false)

export default function Home() {
  const [isLoading, setIsloading] = useState(true);
  const t = useTranslations('home');
  const [isHidden, setIsHidden] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // need to set isLoading to false here too
    setIsloading(false);
    sections = gsap.utils.toArray('.section');
    wrap = gsap.utils.wrap(0, sections.length);
  }, [isLoading]);

  const clear = (tl: gsap.core.Timeline, i: number) => {
    sections.forEach((section: gsap.TweenTarget, index: number) => {
      if (index !== i) {
        tl.to(section, { zIndex: -10, autoAlpha: 0, opacity: 0, pointerEvents: 'none'  }, 0);
      }
    });
  }
  
  const resetState = () => {
    const tl = gsap.timeline({
      defaults: {
        duration: 1.0,
        ease: 'power2.out',
      },
      onComplete: () => {
        onHome = true,
        setIsHidden(true),
        setIsDisabled(true)
      }
    });

    clear(tl, 3);

    tl.fromTo('#h1-name', { y: '-45vh', fontSize: '2.75rem', ease: 'power2.out' }, { y: '0vh', fontSize: '3.25rem' },  '+=0.01');
    tl.fromTo('#nav', { y: '-45vh', fontSize: '1rem', opacity: 1 }, { fontSize: '1.0rem', opacity: 0 }, 0).then(() => {tl.set('#nav', { y: '0vh', zIndex: -1 }, 0)});
    if (!document.getElementById('h2-alt')) return;
    tl.fromTo('#h2-alt', { y: '-50vh', fontSize: '1rem', opacity: 0, ease: 'power2.out' }, { y: '0vh', fontSize: '1.25rem', opacity: 1 }, 0);
  }

  const gotoSection = (i: number) => {
    if (onHome === true) {
      const tl = gsap.timeline({
        defaults: {
          duration: 1.0,
          ease: 'power2.out',
        },
        onComplete: () => {
          onHome = false,
          setIsHidden(false),
          gotoSection(i),
          setIsDisabled(false)
        }
      });
 
      tl.fromTo('#h1-name', { y: '0vh', fontSize: '3.25rem' }, { y: '-45vh', fontSize: '2.75rem', ease: 'power2.out' }, 0);
      tl.fromTo('#nav', { y: '0vh', fontSize: '1.25rem', opacity: 0 }, { y: '-45vh', fontSize: '1rem', opacity: 1, ease: 'power2.out', zIndex: 10 }, 0);
      if (!document.getElementById('h2-alt')) return;
      tl.fromTo('#h2-alt', { y: '0vh', fontSize: '1.25rem', opacity: 1 }, { y: '-50vh', fontSize: '1rem', opacity: 0, ease: 'power2.out' }, 0);
    }

    i = wrap(i);
    const tl = gsap.timeline({
      defaults: {
        duration: 0.75,
        ease: 'power2.out'
      },
      onComplete: () => {
        currentIndex = i;
      }
    });

    clear(tl, i);
    tl.to(sections[i], { zIndex: 2, autoAlpha: 1, opacity: 1, pointerEvents: 'auto' }, 0);
  }  
  
  return (
    <>
    {isLoading ? (
      <Loading />
    ) : (
      <main className="shadow font-extralight italic ">
        <section className='grid grid-rows-1 justify-center mt-[50vh]'>
          { isDisabled ? (<h3 className='mb-[-1rem] text-[1.5rem] not-italic'>{t('title')}</h3>) : ( null )}

          <h1 id='h1-name' className='text-[3.25rem]'>
            <button className='font-extralight italic' onClick={() => resetState()} disabled={isDisabled}>
              {t('first')} {t('last')}
            </button>
          </h1>

          { t('first_alt') && t('last_alt') ? (
            <h2 id='h2-alt' className='text-[1.25rem] '>
              {t('first_alt')} {t('last_alt')}
            </h2>
            ) : (
              null
            )
          }

          { isDisabled ? (<h3 className='mb-[-1rem] text-[1.5rem] not-italic'>{t('subtitle')}</h3>) : ( null )}
        </section>

        <Navbar gotoSection={gotoSection} isHidden={isHidden} />

        <section id='wrapper' className='overflow-auto' >
          <div className='relative'>
            <div className='absolute flex mr-2 right-0 ' style={{direction: "rtl"}}>
              <section className='section opacity-0 fixed top-[35vh] text-end w-3/6 -z-10'>
                <About />
              </section>

              <section className='section opacity-0 fixed top-[35vh] w-3/6 -z-10'>
                <Projects />
              </section>  

              <section className='section opacity-0 fixed top-[35vh] text-end w-3/6 -z-10'>
                <Contact />
              </section>
            </div>
          </div>
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
