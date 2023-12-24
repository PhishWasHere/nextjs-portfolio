'use client'
import './index.css';
import { useEffect, useState } from 'react';
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

export default function Navbar({navHidden}: any) {
  const t = useTranslations('nav');
  const controls = useAnimation();

  useEffect(() => {
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

  const transitions = {
    duration: 1,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    repeatDelay: 1.5,
  }

  const about:string = t('about');
  const aboutArr = [...about];
  const projects:string = t('projects');
  const projectsArr = [...projects];
  const contact:string = t('contact');
  const contactArr = [...contact];
    

  return (
    <>
    {navHidden ? (null) : (
      <nav className="flex text-xl justify-center -mt-6 italic font-extralight">
        <motion.div variants={vars.about} animate={controls} initial={'hidden'}>
          <Link href='/about' className="mx-1">
            {aboutArr.map((char, index) => (
              <motion.span 
                key={index} 
                animate={{ rotateX: [0, 180, 0] }}
                transition={{...transitions, delay: index * 0.3}}
                >
                {char}
              </motion.span>
            ))}
          </Link>
        </motion.div>

        <motion.div variants={vars.projects} animate={controls} initial={'hidden'}>
          <Link href='/projects' className="mx-1">
            {t('projects')}
          </Link>
        </motion.div>

        <motion.div variants={vars.contact} animate={controls} initial={'hidden'}>
          <Link href='/contact' className="mx-1">
            {t('contact')}
          </Link>
        </motion.div>
      </nav>
    )}
    </>
  )
}