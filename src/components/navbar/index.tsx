import './index.css';
import { useEffect } from 'react';
import { Link, usePathname } from '@/navigation'
import { useAnimation } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { enter, leave } from '@/utils/pointerStyles';

let pointerFollow:  HTMLElement | null;
let pointer:  HTMLElement | null;
export default function Navbar({navHidden}: any) {
  const t = useTranslations('nav');
  const controls = useAnimation();
  const path = usePathname();

  useEffect(() => {
    pointerFollow = document.getElementById('pointer-follow');
    pointer = document.getElementById('pointer');
    controls.start('visible')
  }, [navHidden]);

  const onEnter = () => {
    if (!pointerFollow || !pointer) return;
    enter({pointerFollow, pointer});
  }

  const onLeave = () => {
    if (!pointerFollow || !pointer) return;
    leave({pointerFollow, pointer});
  }

  return (
    <>
    {navHidden ? (null) : (
      <nav className="link flex text-xl justify-center-mt-6 italic font-extralight lg:mr-5">

        <div>
          <Link href='/about' onMouseEnter={() => onEnter()} onMouseLeave={() => onLeave()} className={`mx-1.5 link under-line  ${path ==='/about' ? 'line' : 'remove-line' }`}>
            {t('about')}
          </Link>
        </div>


        <div>
          <Link href='/projects'  onMouseEnter={() => onEnter()} onMouseLeave={() => onLeave()} className={`mx-1.5 link under-line ${path ==='/projects' ? 'line' : 'remove-line' }`}>
            {t('projects')}
          </Link>
        </div>

        <div>
          <Link href='/contact' onMouseEnter={() => onEnter()} onMouseLeave={() => onLeave()} className={`mx-1.5 link under-line ${path ==='/contact' ? 'line' : 'remove-line' }`}>
            {t('contact')}
          </Link>
        </div>
      </nav>
    )}
    </>
  )
}