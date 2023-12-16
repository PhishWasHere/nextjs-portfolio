'use client'

import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function Projects() {
  const t = useTranslations('projects');
  const projects = Array.from(t('projects', { returnObjects: true }));
  const projArr = Object.values(projects);
  console.log(projArr);
  
  return (
    <article>

    </article>
  )
}