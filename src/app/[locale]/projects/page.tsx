'use client'
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/navigation';
import { enter, leave } from '@/utils/pointerStyles';
import { useEffect } from 'react';

import { PageWrapper } from '@/utils/pageWrapper';

import { english, japanese } from './languages';

let pointer: HTMLElement | null;
let pointerFollow: HTMLElement | null;
export default function ProjectPage() {
  const t = useTranslations('projects');
  const locale = useLocale();
  let projects = ( locale ) === 'jp' ? japanese : english;

  useEffect(() => {
    pointer = document.getElementById('pointer');
    pointerFollow = document.getElementById('pointer-follow');    
  }, []);

  const onEnter = () => {
    if (!pointer || !pointerFollow) return;
    enter({pointer, pointerFollow, size:'small'})
  }
  
  const onLeave = () => {
    if (!pointer || !pointerFollow) return;
    leave({pointer, pointerFollow})
  }

  return (
    <PageWrapper>
      <article className='max-h-[70vh] flex justify-end text-right'>
        <section className=''>
          {projects.map((i) => (
            <article key={i.title} className='my-3 mr-3'>
              <h3 className=''>
                {i.title}
              </h3>
              <h4 className='not-italic text-base'>
                {i.type}
              </h4>
              <p className='not-italic text-base'>
                {i.desc}
              </p>
              <div className='flex justify-end text-base'>
                {i.tech.map((j) => (
                  <Image width={35} height={35} src={`/${j}`} key={`${j}`} alt={`${j}`} className='mx-1'/>
                ))}
              </div>
              <Link href={i.link} className='text-base cursor-none' onMouseEnter={() => onEnter()} onMouseLeave={() => onLeave()}>
                link
              </Link>
            </article>
          ))}
        </section>
      </article>
    </PageWrapper>
  )
}
