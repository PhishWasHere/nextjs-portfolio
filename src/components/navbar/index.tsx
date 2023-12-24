'use client'
import './index.css';
import { use, useEffect, useState } from 'react';
import { Link } from '@/navigation'
import { motion, useAnimation, cubicBezier } from 'framer-motion';
import { useTranslations } from 'next-intl';

let vars = {
  about: {
    hidden: { },
    visible: { }
  },
  projects: {
    hidden: { },
    visible: { }
  },
  contact: {
    hidden: { },
    visible: { }
  }
}

let pointerFollow: any;
export default function Navbar({navHidden}: any) {
  const t = useTranslations('nav');
  const controls = useAnimation();

  useEffect(() => {
    pointerFollow = document.getElementById('pointer-follow');
    if (window.innerWidth < 1024) {
      vars.about = {
        hidden: { opacity: 0, y: '50vh' , transition: { duration: 1.25 } },
        visible: { opacity: 1, y: '5vh', transition: { duration: 1.25 } }
      }
      vars.projects = {
        hidden: { opacity: 0, y: '50vh', transition: { duration: 1.25 } },
        visible: { opacity: 1, y:'5vh', transition: { duration: 1.25 } }
      }
      vars.contact = {
        hidden: { opacity: 0, y: '50vh' , transition: { duration: 1.25 } },
        visible: { opacity: 1, y: '5vh', transition: { duration: 1.25 } }
      }
    } else {
      // vars position for larger screens
    }

    controls.start('visible')
  }, [navHidden]);

  const onHover = () => {
    if (!pointerFollow) return;
    pointerFollow.style.height = `40px`;
    pointerFollow.style.width = `40px`;
    pointerFollow.style.margin = '-18px 0 0 -18px'
    pointerFollow.style.transition = `0.1s cubic-bezier(1,1.13,.01,1.24)`;
  }

  const onLeave = () => {
    if (!pointerFollow) return;
    pointerFollow.style.height = `17px`;
    pointerFollow.style.width = `17px`;
    pointerFollow.style.margin = '-6px 0 0 -6px'
    pointerFollow.style.transition = `0.1s cubic-bezier(1,1.13,.01,1.24)`;
  }

  return (
    <>
    {navHidden ? (null) : (
      <motion.nav variants={vars.about} animate={controls} initial={'hidden'} className="link flex text-xl justify-center -mt-6 italic font-extralight">

        <div>
          <Link href='/about' id='a' onMouseEnter={() => onHover()} onMouseLeave={() => onLeave()} className='link mx-1'>
            {t('about')}
          </Link>
        </div>


        <div>
          <Link href='/projects' id='b' onMouseEnter={() => onHover()} onMouseLeave={() => onLeave()} className='link mx-1'>
            {t('projects')}
          </Link>
        </div>

        <div>
          <Link href='/contact' id='c' onMouseEnter={() => onHover()} onMouseLeave={() => onLeave()} className='link mx-1'>
            {t('contact')}
          </Link>
        </div>
      </motion.nav>
    )}
    </>
  )
}