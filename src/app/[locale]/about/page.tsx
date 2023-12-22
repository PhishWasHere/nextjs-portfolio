'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {useTranslations } from 'next-intl';

import { useRef, useEffect } from "react";
import { PageWrapper } from '@/utils/wrapper';

import { motion } from 'framer-motion';

import { usePathState } from '@/utils/context';

export default function AboutPage() {
  const t = useTranslations('about');

  useEffect(() => {    
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
    <PageWrapper>
      <article className='m-2 p-2 rounded mt-[10vh] italic font-extralight bg-black bg-opacity-50 '>
        <section>
          <h3 className='text-lg font-light'>
            {t('title')}
          </h3>
          <p className='not-italic'>
            {t('desc-line1')} <br />
            {t('desc-line2')} <br />
            {t('desc-line3')} <br />
            {t('desc-line4')} <br />
            {t('desc-line5')} <br />
          </p>
        </section>

        <section className='mt-3'>
          <h3 className='text-lg'>
            {t('skills')}
          </h3>
          <ul className="not-italic font-light">
            {skills.map((i) => (
              <li key={i.name} className='flex mx-1'>
                {/* <Image src={`${i.icon}`} className='ml-1.5 relative' alt={i.name} width={30} height={30}/>
                <p className='my-auto'>{i.name}</p> */}
              </li>
            ))}
          </ul>
        </section>

      </article>
    </PageWrapper>
  )
}
