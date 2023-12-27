// if this component content is in the context folder, it breaks the css styles
  // trying to find the cause of half the tailwind styles not working made me go mad
import './index.css';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { motion, useAnimation, cubicBezier } from 'framer-motion';
import Navbar from '@/components/navbar';
import { enter, leave } from '@/utils/pointerStyles';

let pointerFollow: HTMLElement | null;
let pointer:  HTMLElement | null;
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
    },
    btn: {
      hidden: {  opacity: 1, y: '', fontSize: '1rem', transition: { duration: 0.75 } },
      visible: { opacity: 0, y:'-40', transition: { duration: 1 } }
    }
  }; 

  useEffect(() => {
    pointerFollow = document.getElementById('pointer-follow');
    pointer = document.getElementById('pointer');
    if (path !== '/') {
      animate();
    }
  }, []);
 
  const animate = () => {
    
    controls.start("visible");
    setOnHome(false);
    setNavHidden(false);
    setTimeout(() => {
      router.push('/about');
    }, 1000);
  }

  const revert = () => {
    router.push('/');
    setTimeout(() => {
      controls.start("hidden");
      setOnHome(true);
      setNavHidden(true);
    }, 30);    
  }

  const onEnter = (size?:string) => {
    if (!pointerFollow || !pointer) return;
    enter({pointerFollow, pointer, size: size || ''});
  }

  const onLeave = () => {
    if (!pointerFollow || !pointer) return;
    leave({pointerFollow, pointer});
  }

  return (
    <>
    <div className='lg:grid lg:justify-end'>
      <div className='lg:flex lg:justify-start lg:w-[50vw]'>
        <section className='font-extralight flex flex-col '> 
          <motion.h3 variants={vars.h3} initial={'hidden'} animate={controls} className='justify-center ml-4 -mb-3 lg:ml-0 md:text-center lg:text-start'>
            {t('title')}
          </motion.h3>

          <motion.h1 variants={vars.h1} initial={'hidden'} animate={controls} className='mx-auto lg:mx-0 xl:mx-0' >
            <button id={`${onHome? '' : 'line'}`} onMouseEnter={() => onEnter('big')} onMouseLeave={() => onLeave()} onClick={() => revert()} disabled={onHome} className={`italic cursor-none`}>
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

          <motion.h3 variants={vars.h3} initial={'hidden'} animate={controls} className='not-italic ml-auto mr-4 lg:mr-0 flex flex-col md:mx-auto lg:mx-0'>
            {t('subtitle')}
            <motion.button 
              id='about'
              disabled={!onHome} 
              variants={vars.btn} initial={'hidden'} 
              animate={controls} 
              className='ml-auto text-base cursor-none' 
              onClick={() => animate()}
              onMouseEnter={() => onEnter()}
              onMouseLeave={() => onLeave()}
            >
              {t('button')}
            </motion.button>
          </motion.h3>

        </section>
          <motion.div variants={vars.nav} initial={'hidden'} animate={controls} className='lg:my-auto mx-auto lg:align-middle flex justify-center -mt-5'>
            <Navbar navHidden={navHidden} />
          </motion.div>
      </div>
    </div>
    </>
  )
}