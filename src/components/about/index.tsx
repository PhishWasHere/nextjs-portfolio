'use client'
import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function About() {
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
    <article className=' m-2 p-2 rounded bg-red-800'>
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

      <section className='nt-1'>
        <h3 id='' className=''>
          {t('skills')}
        </h3>
        <ul className="flex flex-wrap">
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