'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {useTranslations } from 'next-intl';

import { useRef, useEffect } from "react";
import { PageWrapper } from '@/utils/pageWrapper';

import { motion } from 'framer-motion';


export default function AboutPage() {
  const t = useTranslations('about');

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
      name: 'Framer-Motion',
      icon: 'framer.svg'
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
      name: 'Next',
      icon: 'nextjs.svg',
    },
    {
      name: 'next-intl',
      icon: 'next-intl.svg'
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
      <article className=' max-h-[70vh] overflow-scroll'>
        <section>
          <h3 className=''>
            {t('title')}
          </h3>
          <p className='not-italic text-base'>
            {t('desc-line1')} <br />
            {t('desc-line2')} <br />
            {t('desc-line3')} <br />
            {t('desc-line4')} <br />
            {t('desc-line5')} <br />
          </p>
        </section>

        <section className='mt-3'>
          <h3 className=''>
            {t('skills')}
          </h3>
          <ul className="not-italic font-light flex flex-wrap mt-2 text-base">
            {skills.map((i) => (
              <li key={i.name} className='flex mx-1'>
                <Image src={`/${i.icon}`} className='m-1 relative' alt={i.name} width={30} height={30}/>
                <p className='my-auto'>{i.name}</p>
              </li>
            ))}
          </ul>
        </section>

      </article>
    </PageWrapper>
  )
}
