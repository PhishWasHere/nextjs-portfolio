import Image from 'next/image'
import Link from 'next/link'
import { en, jp } from './language'
import Sidebar from '@/components/sidebar';
import About from '@/components/about';

export default function Home({ searchParams }: {searchParams: {[key: string]: string | string[] | undefined}} ) {
  const langParam = (searchParams.lang || 'en') as string;
  const locationParam = (searchParams.location || 'about') as string;
  
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

  let displayComponent;
  switch (locationParam) {    
    case 'about':
      displayComponent = <About langParam={langParam}/>
    break;
  }

  return (
    <main id='bg' className='h-screen flex shadow font-thin italic'>
      <section id='noise' className='w-full sm:border-[3rem] border-black '>
        <div className='border border-gray-200/60 h-full'>
          <div className='sm:mx-10 sm:my-8 mx-4 my-2'>

            <section className='flex flex-col'>
              {langParam === 'en' ? (
                <>
                <section className='2xl:text-8xl sm:text-7xl text-6xl'>
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
                    <Image src={i.icon} width={32} height={32} alt={i.key} className='rounded-full fill-black'/>
                  </Link>
                ))}

                <div className='flex'>
                  {lang.map((lang, i ) => (
                    <Link key={i} className='m-1 mt-auto' href={`?${new URLSearchParams({lang, location: locationParam})}`}>
                      <p className=''>{lang === 'en' ? 'English' : '日本語'}</p>
                    </Link>
                  ))}
                </div>
              </section>
            </section>
              
            <Sidebar searchParams={searchParams} langParam={langParam}/>
            
            <section className=''>
             {displayComponent}
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
