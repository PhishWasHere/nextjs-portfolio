'use client'
import { useEffect, useState } from 'react';
import {useTranslations} from 'next-intl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from "@/components/canvas/three.js/particleBG"

export default function Home() {
  const t = useTranslations('home');
  const [scrollY, setScrollY] = useState(0);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const handleScroll = () => {
      gsap.to('#h1-name',
        { y: '-40', duration: 1, ease: 'power2.out' }
      )
    };
    window.addEventListener('wheel', handleScroll);
  }, [scrollY]);
  
  return (
    <main className="shadow font-extralight italic ">
      <div className='flex'>
        <h1 id='h1-name' className='mx-auto my-auto mt-[50vh] text-3xl '>
          {t('first')} {t('last')}
        </h1>
      </div>

      <ParticleCanvas />
    </main>
  )
}
// import HomeCanvas from "@/components/canvas/home"
// import ThreeCanvas from "@/components/canvas/three.js/noise"
// import PlaneCanvas from "@/components/canvas/three.js/plane"