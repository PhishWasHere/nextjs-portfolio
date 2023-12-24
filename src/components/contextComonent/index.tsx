'use client'
// if this component content is in the context folder, it breaks the css styles
  // trying to find the cause of half the tailwind styles not working made me go mad

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion, useAnimation, cubicBezier } from 'framer-motion';
import Navbar from '@/components/navbar';

export default function ContextComponent() {
  const t = useTranslations('home');
  const [navHidden, setNavHidden] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const controls = useAnimation();
  
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {    
    if (path !== '/en' && path !== '/jp') {
      animate();
    }
  }, []);

  const vars = {
    h1: {
      hidden: { opacity: 1, y: '45vh', fontSize: '3.25rem', fontStyle: 'italic', fontWeight: '200', style:{marinLeft: 'auto', marginRight: 'auto'}, transition: { duration: 0.75 }, ease: cubicBezier },
      visible: { opacity: 1, y: '5vh', fontSize: '2.75rem', fontStyle: 'italic', fontWeight: '200', style:{marinLeft: 'auto', marginRight: 'auto'}, transition: { duration: 1 }, ease: cubicBezier },
    },
    h2: {
      hidden: { opacity: 1, y: '45vh', fontSize: '1rem', fontStyle: 'italic', fontWeight: '200', transition: { duration: 0.75 }, ease: cubicBezier },
      visible: { opacity: 0, y: '5vh', fontSize: '0.5rem', fontStyle: 'italic', fontWeight: '200', transition: { duration: 1 }, ease: cubicBezier },
    },
    h3: {
      hidden: {  opacity: 1, y: '45vh', fontSize: '1.25rem', transition: { duration: 0.75 } },
      visible: { opacity: 0, transition: { duration: 1 } }
    }
  }; 
 
  const animate = () => {
    controls.start("visible");
    setIsDisabled(false);
    setNavHidden(false);
    // console.log('navHidden', navHidden);
  }

  const revert = () => {
    router.push('/');
    controls.start("hidden");
    setIsDisabled(true);
    setNavHidden(true);
    // console.log('navHidden', navHidden);
  }

  return (
    <>
      <section className='font-extralight flex flex-col'> 
        <motion.h3 variants={vars.h3} initial={'hidden'} animate={controls} className='justify-center ml-4 -mb-3'>
          {t('title')}
        </motion.h3>

        <motion.h1 variants={vars.h1} initial={'hidden'} animate={controls} className='mx-auto' >
          <button onClick={() => revert()} disabled={isDisabled} className='italic'>
            {t('first')} {t('last')}
          </button>
        </motion.h1>

        { t('first_alt') && t('last_alt') ? (
          <motion.h2 variants={vars.h2} initial={'hidden'} animate={controls} className='mx-auto'>
            {t('first_alt')} {t('last_alt')}
          </motion.h2>
          ) : (
            null
          )
        }

        <motion.h3 variants={vars.h3} initial={'hidden'} animate={controls} className='not-italic ml-auto mr-4 '>
          {t('subtitle')}
        </motion.h3>

        <button className='absolute top-0 left-0 text-red-300' onClick={() => animate()}>
          button
        </button>

      </section>

      <Navbar navHidden={navHidden} />

    </>
  )
}