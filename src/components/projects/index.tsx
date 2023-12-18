'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { english, japanese } from './translations';

type Project = {
  title: string;
  desc: string;
  type: string;
  tech: string[];
  link: string;
}

let defaultLanguage: Project[] = english;
export default function Projects() {
  const path = usePathname();
  const [language, setLanguage] = useState(defaultLanguage);
  
  useEffect(() => {
    if (path.startsWith('/jp')) {
      setLanguage(japanese);
    } else {
      setLanguage(english);
    }
  }, [path]);

  return (
    <article className=' m-2 p-2 rounded bg-red-800'>
     {language.map((i) => (
        <div key={i.title}>
          <h1>{i.title}</h1>
          <p>{i.desc}</p>
          <p>{i.type}</p>
          <p>{i.tech}</p>
          <p>{i.link}</p>
        </div>
      ))}
    </article>
  )
}