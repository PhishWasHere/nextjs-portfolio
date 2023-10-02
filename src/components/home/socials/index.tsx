'use client'
import Link from 'next/link';
import Image from 'next/image';
import { en, jp } from './language'
import { useSearchParams } from 'next/navigation';

export default function Socials () {
    const langParam = useSearchParams().get('lang') || 'en';
    
    const lang = [
      'en', 'jp'
    ]
  
    const socials = [
      {
        key: 'github',
        link: 'https://github.com/PhishWasHere',
        icon: 'github.svg'
      },
      {
        key: 'linkedin',
        link: 'https://www.linkedin.com/in/miran-yasunori-880207265/',
        icon: 'linkedin.svg'
      }
    ]

    let language = en;
    if (langParam == 'jp') {
      language = jp
    }

    return (
        <>
            {langParam === 'en' ? (
                <>
                    <section id='name-size' className='2xl:text-8xl sm:text-7xl text-6xl'>
                        <h1 className=''>
                        {language.first}
                        </h1>
                        <h1 className=''>
                        {language.last}
                        </h1>
                    </section>
                </>
            ) : (
                <>
                    <section className='flex'>
                        <div className='mr-2'>
                        <h1 className='2xl:text-8xl sm:text-7xl text-6xl'>
                            {language.first}
                        </h1>
                        <p>{language.first_alt}</p>
                        </div>

                        <div className=''>
                        <h1 className='2xl:text-8xl sm:text-7xl text-6xl'>
                            {language.last}
                        </h1>
                        <p>{language.last_alt}</p>
                        </div>
                    </section>
                </>
            )}

            <section className='flex '>
                {socials.map((i) => (
                    <Link key={i.key} className='m-1' href={i.link}>
                        <Image src={i.icon} width={32} height={32} alt={i.key} className='rounded-full fill-black hover:border hover:border-neon-blue transition duration-100'/>
                    </Link>
                ))}

                <div className='flex'>
                    {lang.map((lang, i ) => (
                    <Link key={i} className='m-1 mt-auto' href={`?${new URLSearchParams({lang})}`}>
                        <p className=''>{lang === 'en' ? 'English' : '日本語'}</p>
                    </Link>
                    ))}
                </div>
            </section>
        </>
    )
}