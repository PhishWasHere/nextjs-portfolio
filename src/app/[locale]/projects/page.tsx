'use client'
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/navigation';
import { enter, leave } from '@/utils/pointerStyles';
import { useEffect } from 'react';

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
    <article className='max-h-[70svh] flex justify-end text-right'>
      <section className=''>
        {projects.map((i) => (
          <article key={i.title} className='lg:my-5 my-3 mr-3'>
            <Link href={i.link} className='link under-line' onMouseEnter={() => onEnter()} onMouseLeave={() => onLeave()}>
              {i.title}
            </Link>
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
          </article>
        ))}
      </section>
    </article>
  )
}
