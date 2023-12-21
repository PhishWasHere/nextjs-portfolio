'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useAnimation, cubicBezier } from 'framer-motion';

import ParticleCanvas from "@/components/canvas/three.js/particleBG"

import Loading from '@/app/[locale]/loading';

import Navbar from '@/components/navbar';

export const Context = createContext<any>(null); 

export const usePathState = () => {
  return useContext(Context);
}

export const ContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [pathChange, setPathChange] = useState(false);

  const [isLoading, setIsloading] = useState(true);
  const t = useTranslations('home');
  const [navHidden, setNavHidden] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    // need to set isLoading to false here too
    setIsloading(false);
  }, [isLoading]);

  const vars = {
    h1: {
      hidden: { opacity: 1, y: '50vh', fontSize: '3.25rem', transition: { duration: 1 }, ease: cubicBezier },
      visible: { opacity: 1, y: '5vh', fontSize: '2.75rem', transition: { duration: 1 }, ease: cubicBezier },
    },
    h2: {
      hidden: { opacity: 1, y: '50vh', fontSize: '1.25rem', transition: { duration: 1 }, ease: cubicBezier },
      visible: { opacity: 0, y: '0vh', fontSize: '1rem', transition: { duration: 1 }, ease: cubicBezier },
    },
    h3: {
      hidden: {  opacity: 1, y: '50vh', fontSize: '1.25rem', transition: { duration: 1 } },
      visible: { opacity: 0, transition: { duration: 1 } },
    }
  }; 
  
  const animate = () => {
    controls.start("visible");
    setIsDisabled(false);
    setNavHidden(false)
    console.log('navHidden', navHidden);
    
  }

  const revert = () => {
    controls.start("hidden");
    setIsDisabled(true);
    setNavHidden(true)
    console.log('navHidden', navHidden);
  }

  return(
    <Context.Provider value={[pathChange, setPathChange]}>
    {isLoading ? (
      <Loading />
    ) : (
      <main className="font-extralight italic">
        <section className='font-extralight italic'> 
          <motion.h3 variants={vars.h3} initial={'hidden'} animate={controls} className=' not-italic '>
            {t('title')}
          </motion.h3>

          <motion.h1 variants={vars.h1} initial={'hidden'} animate={controls} className=''>
            <button onClick={() => revert()} className='' disabled={isDisabled}>
              {t('first')} {t('last')}
            </button>
          </motion.h1>

          { t('first_alt') && t('last_alt') ? (
            <motion.h2 variants={vars.h2} initial={'hidden'} animate={controls}  className=''>
              {t('first_alt')} {t('last_alt')}
            </motion.h2>
            ) : (
              null
            )
          }

          <motion.h3 variants={vars.h3} initial={'hidden'} animate={controls} className='not-italic'>
            {t('subtitle')}
          </motion.h3>

          <button onClick={() => animate()}>
            button
          </button>

        </section>

        <Navbar navHidden={navHidden} />

        <motion.section initial={{opacity:0}} animate={{opacity:1, transition:{duration:1}}} exit={{opacity:0, transition:{duration:1}}} className='overflow-auto' >
          {children}
        </motion.section>
        
        <ParticleCanvas onLoad={(isLoading) => setIsloading(isLoading)}/>
      </main>
    )}
    </Context.Provider>
  )
}