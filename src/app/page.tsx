import Image from 'next/image'
import Link from 'next/link'
import { en, jp } from './language'
import Sidebar from '@/components/sidebar';
import About from '@/components/about';
import Contact from '@/components/contact';
import Projects from '@/components/projects';

import Status from '@/components/common/status-modal';
// using query params to keep track of language and location so i can keep as server component and use SSR
export default function Home({ searchParams }: {searchParams: {[key: string]: string | string[] | undefined}} ) {
  const langParam = (searchParams.lang || 'en') as string;
  const locationParam = (searchParams.location || 'home') as string;
  
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
    case 'home':
      displayComponent = null
    break;
    case 'about':
      displayComponent = <About langParam={langParam}/>
    break;
    case 'projects':
      displayComponent = <Projects langParam={langParam}/>
    break;
    case 'contact':
      displayComponent = <Contact langParam={langParam}/>
    break;
  }

  let showStatus = false;
  let statusParam;
  if (searchParams.error === 'true') { // if statememt to determine whether to display error or success message. error message is displayed if error param is true
    showStatus = true;
    statusParam = true;
  } else if (searchParams.success === 'true') {    
    showStatus = true;
    statusParam = false;
  }

  return (
    <main id='bg' className='h-screen flex shadow font-extralight italic '>
      <span id='fade-in' className='flex justify-center items-center h-screen font-medium font-sans not-italic text-2xl'>hello world<span id='blink' className='ml-1'>.</span></span>
      <section id='noise' className='w-full sm:border-[3rem] border-black flex flex-col relative'>
        <div className='border border-gray-200/60 h-full'>

          {showStatus ? (
            <section className='flex absolute top-[1rem] left-1/2 transform -translate-x-1/2'>
              <Status langParam={langParam} statusParam={statusParam} />
            </section>
          ) : null}

          <div className='sm:mx-10 sm:my-8 mx-4 my-2'>

            <section className='flex flex-col font-thin'>
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
                    <Image src={i.icon} width={32} height={32} alt={i.key} className='rounded-full fill-black hover:border hover:border-neon-blue transition duration-100'/>
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

            <div className='sm:flex'>
              <Sidebar searchParams={searchParams} langParam={langParam}/>

              <section className='ml-auto transition sm:order-2'>
                <div className=''>
                  {displayComponent}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
