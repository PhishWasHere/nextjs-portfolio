'use client'
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import {useTranslations} from 'next-intl';

import { useRef, useLayoutEffect } from "react";

import { usePathState } from '@/utils/context';

export default function AboutPage() {
  // const [ pathChange, setPathChange ] = usePathState();
  const t = useTranslations('about');
  // const router = useRouter();
  // const path = usePathname();
  
  const ref = useRef(null);

  useLayoutEffect(() => {
    console.log('layouteffect');
    // const ctx = gsap.context(() => {
    //   gsap.fromTo('#about', { opacity: 0 }, { opacity: 1, duration: 1 });
    // })

    // return () => {
    //   gsap.fromTo('#about', { opacity: 1 }, { opacity: 0, duration: 1 });
    //   ctx.kill();
    // }
  }, [])


  const skills = [
    {
      name: 'HTML',
      icon: 'html.svg',
    },
    {
      name: 'JavaScript',
      icon: 'javascript.svg',
    },
    {
      name: 'TypeScript',
      icon: 'typescript.svg',
    },
    {
      name: 'CSS',
      icon: 'css.svg',
    },
    {
      name: 'Tailwind',
      icon: 'tailwindcss.svg',
    },
    {
      name: 'THREE',
      icon: 'threejs.svg',
    },
    {
      name: 'React',
      icon: 'react.svg',
    },
    {
      name: 'NEXT',
      icon: 'nextjs.svg',
    },
    {
      name: 'Node',
      icon: 'nodejs.svg',
    },
    {
      name: 'Express',
      icon: 'express.svg',
    },
    {
      name: 'MongoDB',
      icon: 'mongodb.svg',
    },
    {
      name: 'MySQL',
      icon: 'mysql.svg',
    },
    {
      name: 'JWT',
      icon: 'jwt.svg',
    },
    {
      name: 'AWS',
      icon: 'aws.svg',
    }
  ]
  return (
    <article ref={ref} id='about' className=' m-2 p-2 rounded bg-red-800'>
      <section>
        <h3 id='' className=''>
          {t('title')}
        </h3>
        <p>
          {t('desc-line1')} <br />
          {t('desc-line2')} <br />
          {t('desc-line3')} <br />
          {t('desc-line4')} <br />
          {t('desc-line5')} <br />
        </p>
      </section>

      <section className='mt-1'>
        <h3 id='' className=''>
          {t('skills')}
        </h3>
        <ul className="">
          {skills.map((i) => (
            <li key={i.name} className='flex mx-1'>
              {/* <Image src={`${i.icon}`} className='ml-1.5 relative' alt={i.name} width={30} height={30}/>
              <p className='my-auto'>{i.name}</p> */}
            </li>
          ))}
        </ul>
      </section>

    </article>
  )
}

  // useGSAP(() => {
  //   console.log('pathChange detected in about page');
  //   const tl = gsap.timeline({
  //     defaults: {
  //       duration: 1.0,
  //       ease: 'power2.out',
  //     }
  //   });

  //   tl.to('#about', { opacity: 0 }, 0);


  //   return () => {
  //     tl.kill();
  //   }
  // }, [pathChange, path])

  // useGSAP(() => {
  //   const tl = gsap.timeline({
  //     defaults: {
  //       duration: 1.0,
  //       ease: 'power2.out',
  //     }
  //   });

  //   tl.fromTo('#about', { opacity: 0 }, { opacity: 1 }, 0);

  //   return () => {
  //     tl.kill();
  //   }
  // }, []);
