
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from '@/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useAnimation, cubicBezier } from 'framer-motion';
import Navbar from '@/components/navbar';
import { enter, leave } from '@/utils/pointerStyles';
import Link from 'next/link';

let pointerFollow: HTMLElement | null;
let pointer:  HTMLElement | null;
export default function ContextComponent() {
  const t = useTranslations('home');
  const [navHidden, setNavHidden] = useState(true);
  const [onHome, setOnHome] = useState(true);
  const controls = useAnimation();
  const [locale] = useLocale(); 
  
  const path = usePathname();
  const router = useRouter();

  let vars = {
    h1: {
      hidden: { opacity: 1, y: '45svh', fontSize: '3.25rem', fontStyle: 'italic', fontWeight: '200', style:{marinLeft: 'auto', marginRight: 'auto'}, transition: { duration: 0.75 }, ease: cubicBezier },
      visible: { opacity: 1, y: '5vh', fontSize: '2.75rem', fontStyle: 'italic', fontWeight: '200', style:{marinLeft: 'auto', marginRight: 'auto'}, transition: { duration: 1 }, ease: cubicBezier },
    },
    h2: {
      hidden: { opacity: 1, y: '45svh', fontSize: '1rem', fontStyle: 'italic', fontWeight: '200', transition: { duration: 0.75 }, ease: cubicBezier },
      visible: { opacity: 0, y: '5vh', fontSize: '0.5rem', fontStyle: 'italic', fontWeight: '200', transition: { duration: 1 }, ease: cubicBezier },
    },
    h3: {
      hidden: {  opacity: 1, y: '45svh', fontSize: '1.25rem', transition: { duration: 0.75 } },
      visible: { opacity: 0, transition: { duration: 1 } }
    },
    nav: {
      hidden: { opacity: 0, y: '45svh' , transition: { duration: 1.25 } },
      visible: { opacity: 1, y: '5svh', transition: { duration: 1.25 } }
    },
    p: {
      hidden: { opacity: 1, y: '45svh', fontStyle: 'italic', style:{marinLeft: 'auto', marginRight: 'auto'}, transition: { duration: 0.75 }, ease: cubicBezier },
      visible: { opacity: 1, y: '5svh', fontStyle: 'italic', style:{marinLeft: 'auto', marginRight: 'auto'}, transition: { duration: 1 }, ease: cubicBezier },
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
      if (path === '/') {
        return router.push(`/about`)
      }
      router.push(`/${path}`);
    }, 1000);
  }

  const revert = () => {
    router.push('/');
    setTimeout(() => {
      controls.start("hidden");
      setOnHome(true);
      setNavHidden(true);
    }, 300);    

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
      <div className='lg:flex lg:justify-start lg:w-[50svw]'>
        <section className='font-extralight flex flex-col '> 
          <motion.h3 variants={vars.h3} initial={'hidden'} animate={controls} className='justify-center ml-4 -mb-3 lg:ml-0 md:text-center lg:text-start'>
            {t('title')}
          </motion.h3>

          <motion.h1 variants={vars.h1} initial={'hidden'} animate={controls} className='mx-auto lg:mx-0 xl:mx-0' >
            <button onMouseEnter={() => onEnter('big')} onMouseLeave={() => onLeave()} onClick={() => revert()} disabled={onHome} className={`italic cursor-none ${onHome? '' : 'under-line'}`}>
              {t('first')} {t('last')}
            </button>
          </motion.h1>
          
          <div className={`md:ml-[37vw] lg:ml-0 ${locale == 'j' ? 'ml-[20vw]' : 'ml-[10vw]'}`}>
            <motion.div variants={vars.p} initial={'hidden'} animate={controls} className='text-sm flex fixed z-50'>
              <Link href={`/en/${path}`} onMouseEnter={() => onEnter('small')} onMouseLeave={() => onLeave()} className='mx-1 link under-line'>
                EN
              </Link>
              <Link href={`/jp/${path}`} onMouseEnter={() => onEnter('small')} onMouseLeave={() => onLeave()} className='mx-1 link under-line'>
                JP
              </Link>
            </motion.div>
          </div>

          { t('first_alt') && t('last_alt') ? (
            <motion.h2 variants={vars.h2} initial={'hidden'} animate={controls} className='mx-auto'>
              {t('first_alt')} {t('last_alt')}
            </motion.h2>
            ) : (
              null
            )
          }

          <motion.h3 variants={vars.h3} initial={'hidden'} animate={controls} className='not-italic ml-auto mr-4 lg:mr-0 flex flex-col md:mx-auto lg:mx-0 text-end'>
            {t('subtitle')}
            <motion.button 
              disabled={!onHome} 
              variants={vars.btn} initial={'hidden'} 
              animate={controls} 
              className='ml-auto text-base cursor-none about animate-line'
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