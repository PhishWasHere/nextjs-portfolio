'use client'
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
let animating = false; // useing useState for this breaks things for some reason
let currentIndex = -1;
export default function Home() {
  const [isLoading, setIsloading] = useState(true);
  const t = useTranslations('home');
  const scroll = useRef(0);

  useEffect(() => {
    // need to set isLoading to false here too
    setIsloading(false);
    sections = gsap.utils.toArray('.section');
    wrap = gsap.utils.wrap(0, sections.length);

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
      tl.fromTo(sections[i], {}, { zIndex: 2, autoAlpha: 1, opacity: 1, position: 'fixed', marginLeft: 'auto' }, 0);
    }

    const observer = Observer.create({
      type: 'wheel, touch',
      preventDefault: true,
      onUp: () => {        
        if (animating || currentIndex === 0 ) {
          document.addEventListener('wheel', handleScroll);
          sections.forEach((section) => {
            gsap.to(section, { zIndex: -1, autoAlpha: 0, opacity: 0 });
          })
          // observer.disable();
          return;
        }

        goPrev(currentIndex - 1);
      },
      onDown: () => {
        if (animating || currentIndex >= 2 ) return;
        goNext(currentIndex + 1);
      }
    })
    observer.disable();

    const handleScroll = (e: WheelEvent) => {
      animating = true;
      if (e.deltaY < 0 && scroll.current < 0) {
        scroll.current += 1;
      } else if (e.deltaY > 0 && scroll.current > -40) {
        scroll.current -= 1;
      } else {
        document.removeEventListener('wheel', handleScroll);
        observer.enable();
      }

      requestAnimationFrame(() => {
        if (scroll.current > -40 && scroll.current < 0) {
          const fontSize = gsap.utils.mapRange(-40, 0, 2.75, 3.25, scroll.current);
          const opacity = gsap.utils.mapRange(-40, 0, -0.5, 1, scroll.current); 
          
          gsap.to('#h1-name', { y: `${scroll.current}vh`, fontSize: `${gsap.utils.clamp(2.75, 3.25, fontSize)}rem`, ease: 'power2.out' }).then(() => {animating = false;});
          if (!document.getElementById('h2-alt')) return;
          gsap.to('#h2-alt', { y: `${scroll.current}vh`, fontSize: `${gsap.utils.clamp(0.75, 1.25, fontSize)}rem`, opacity: opacity, ease: 'power2.out' }).then(() => {animating = false;});
        }
      });
    };

    document.addEventListener('wheel', handleScroll);

    return () => {
      document.removeEventListener('wheel', handleScroll);
      observer.kill();
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
        
        <section id='wrapper' className='overflow-auto' >
          <div className='relative'>
            <div className='absolute flex mr-2 right-0 ' style={{direction: "rtl"}}>
              <section className='section opacity-0 fixed top-[35vh] text-end'>
                <About />
              </section>

              <section className='section opacity-0 fixed top-[35vh] '>
                <Projects />
              </section>  

              <section className='section opacity-0 fixed top-[35vh] text-end'>
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
