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
let pointer: any;
export default function Navbar({navHidden}: any) {
  const t = useTranslations('nav');
  const controls = useAnimation();
  const path = usePathname();

  useEffect(() => {
    pointerFollow = document.getElementById('pointer-follow');
    pointer = document.getElementById('pointer');
    controls.start('visible')
  }, [navHidden]);

  const onHover = () => {
    if (!pointerFollow) return;
    pointerFollow.style.height = `40px`;
    pointerFollow.style.width = `40px`;
    pointerFollow.style.margin = '-18px 0 0 -18px'
    pointerFollow.style.transition = `0.1s cubic-bezier(1,1.13,.01,1.24)`;

    pointer.style.opacity = `0`;
    pointer.style.transition = `0.1s cubic-bezier(1,1.13,.01,1.24)`;
  }

  const onLeave = () => {
    if (!pointerFollow) return;
    pointerFollow.style.height = `17px`;
    pointerFollow.style.width = `17px`;
    pointerFollow.style.margin = '-6px 0 0 -6px'
    pointerFollow.style.transition = `0.1s cubic-bezier(1,1.13,.01,1.24)`;

    pointer.style.opacity = `1`;
    pointer.style.transition = `0.0s`;
  }

  return (
    <>
    {navHidden ? (null) : (
      <motion.nav 
        variants={vars.about} 
        animate={controls} 
        initial={'hidden'} 
        className="link flex text-xl justify-center-mt-6 italic font-extralight lg:mr-5"
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