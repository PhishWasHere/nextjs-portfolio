'use client'
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/navigation';

import { useRef, useEffect } from "react";
import { PageWrapper } from '@/utils/wrapper';

import { english, japanese } from './languages';

export default function ProjectPage() {
  const t = useTranslations('projects');
  const locale = useLocale();
  let projects = ( locale ) === 'jp' ? japanese : english;


  return (
    <PageWrapper>
      <article className='h-[70vh] flex'>
        <section className='overflow-auto'>
          {projects.map((i) => (
            <article key={i.title} className='my-3'>
              <h3 className=''>
                {i.title}
              </h3>
              <h4 className='not-italic text-base'>
                {i.type}
              </h4>
              <p className='not-italic text-base'>
                {i.desc}
              </p>
              <div className='flex'>
                {i.tech.map((j) => (
                  <Image width={35} height={35} src={`/${j}`} key={`${j}`} alt={`${j}`} className='mx-1'/>
                ))}
              </div>
              <Link href={i.link}>
                link
              </Link>
            </article>
          ))}
        </section>
      </article>
    </PageWrapper>
  )
}
