import './index.css';
import { use, useEffect, useState } from 'react';
import { Link, usePathname } from '@/navigation'
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
  const path = usePathname();

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
      vars.about = {
        hidden: { opacity: 0, y: '50vh' , transition: { duration: 1.25 } },
        visible: { opacity: 1, y: '1.5vh', transition: { duration: 1.25 } }
      }
      vars.projects = {
        hidden: { opacity: 0, y: '50vh', transition: { duration: 1.25 } },
        visible: { opacity: 1, y:'1.5vh', transition: { duration: 1.25 } }
      }
      vars.contact = {
        hidden: { opacity: 0, y: '50vh' , transition: { duration: 1.25 } },
        visible: { opacity: 1, y: '1.5vh', transition: { duration: 1.25 } }
      }
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
      <motion.nav 
        variants={vars.about} 
        animate={controls} 
        initial={'hidden'} 
        className="link flex text-xl justify-center xl:mt-2 lg:mt-2 -mt-6 italic font-extralight lg:mr-5"
      >

        <div>
          <Link href='/about' id='a' onMouseEnter={() => onHover()} onMouseLeave={() => onLeave()} className={`mx-1.5 link  ${path ==='/about' ? 'line' : 'remove-line' }`}>
            {t('about')}
          </Link>
        </div>


        <div>
          <Link href='/projects' id='b' onMouseEnter={() => onHover()} onMouseLeave={() => onLeave()} className={`mx-1.5 link ${path ==='/projects' ? 'line' : 'remove-line' }`}>
            {t('projects')}
          </Link>
        </div>

        <div>
          <Link href='/contact' id='c' onMouseEnter={() => onHover()} onMouseLeave={() => onLeave()} className={`mx-1.5 link ${path ==='/contact' ? 'line' : 'remove-line' }`}>
            {t('contact')}
          </Link>
        </div>
      </motion.nav>
    )}
    </>
  )
}