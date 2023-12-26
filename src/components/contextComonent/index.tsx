// if this component content is in the context folder, it breaks the css styles
  // trying to find the cause of half the tailwind styles not working made me go mad
import './index.css';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion, useAnimation, cubicBezier } from 'framer-motion';
import Navbar from '@/components/navbar';

let pointerFollow: any;
let pointer: any;
export default function ContextComponent() {
  const t = useTranslations('home');
  const [navHidden, setNavHidden] = useState(true);
  const [onHome, setOnHome] = useState(true);
  const controls = useAnimation();
  
  const path = usePathname();
  const router = useRouter();

  let vars = {
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
    },
    nav: {
      hidden: { opacity: 0, y: '45vh' , transition: { duration: 1.25 } },
      visible: { opacity: 1, y: '5vh', transition: { duration: 1.25 } }
    }
  }; 

  useEffect(() => {
    pointerFollow = document.getElementById('pointer-follow');
    pointer = document.getElementById('pointer');
    if (path !== '/en' && path !== '/jp') {
      animate();
    }
  }, []);
 
  const animate = () => {
    controls.start("visible");
    setOnHome(false);
    setNavHidden(false);
    // console.log('navHidden', navHidden);
  }

  const revert = () => {
    router.push('/');
    controls.start("hidden");
    setOnHome(true);
    setNavHidden(true);
    // console.log('navHidden', navHidden);
  }

  const onHover = () => {
    if (!pointerFollow || !pointer) return;
    pointerFollow.style.height = `60px`;
    pointerFollow.style.width = `60px`;
    pointerFollow.style.margin = '-27px 0 0 -27px'
    pointerFollow.style.transition = `0.1s cubic-bezier(1,1.13,.01,1.24)`;

    pointer.style.opacity = `0`;
    pointer.style.transition = `0.1s cubic-bezier(1,1.13,.01,1.24)`;
  }

  const onLeave = () => {
    if (!pointerFollow || !pointer) return;
    pointerFollow.style.height = `17px`;
    pointerFollow.style.width = `17px`;
    pointerFollow.style.margin = '-6px 0 0 -6px'
    pointerFollow.style.transition = `0.3s cubic-bezier(1,1.13,.01,1.24)`;

    pointer.style.opacity = `1`;
    pointer.style.transition = `0.0s`;
  }

  return (
    <>
    <div className='lg:grid lg:justify-end'>
      <div className='lg:flex lg:justify-start lg:w-[50vw]'>
        <section className='font-extralight flex flex-col '> 
          <motion.h3 variants={vars.h3} initial={'hidden'} animate={controls} className='justify-center ml-4 -mb-3 lg:ml-0'>
            {t('title')}
          </motion.h3>

          <motion.h1 variants={vars.h1} initial={'hidden'} animate={controls} className='mx-auto lg:mx-0 xl:mx-0' >
            <button id={`${onHome? '' : 'line'}`} onMouseEnter={() => onHover()} onMouseLeave={() => onLeave()} onClick={() => revert()} disabled={onHome} className='italic cursor-none'>
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

          <motion.h3 variants={vars.h3} initial={'hidden'} animate={controls} className='not-italic ml-auto mr-4 lg:mr-0'>
            {t('subtitle')}
          </motion.h3>


          <button className='absolute top-0 left-0 text-red-300' onClick={() => animate()}>
            button
          </button>

        </section>
          <motion.div variants={vars.nav} initial={'hidden'} animate={controls} className='lg:my-auto mx-auto lg:align-middle flex justify-center -mt-5'>
            <Navbar navHidden={navHidden} />
          </motion.div>
      </div>
    </div>
    </>
  )
}