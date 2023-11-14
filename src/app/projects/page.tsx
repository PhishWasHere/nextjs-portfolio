import { en, jp } from './language'
import Link from 'next/link';
import Image from 'next/image';

import './style.css'

export default function Page({ searchParams }: {searchParams: {[key: string]: string | string[] | undefined}} ) {
    const langParam = (searchParams.lang || 'en') as string;
    
    let language = en;
    if (langParam == 'jp') {
        language = jp
    }
 
    return(
        <section id='proj-container' className='m-4 ml-auto'>
            <div id='proj-wrapper' className=''>
                <div id='proj-content'>

                {language.map((i) => (
                    <article key={i.name} className='sm:m-1 my-5 fade-in-left'>
                        <div className='grid md:flex md:flex-row-reverse'>
                            <h2 className='sm:text-5xl text-4xl text-end '>
                                <Link href={i.link} className=' inline-block hover:text-neon-blue transition duration-100'> 
                                    {i.name}
                                </Link>
                            </h2>
                            <p className='mt-auto mr-2 text-end font-medium'>{i.type}</p>
                        </div>
                        <p className='text-lg flex flex-col justify-end text-end'>{i.description}</p>
                        <span className='flex flex-wrap justify-end'>
                            {i.icon.map((i) =>(
                                <Image key={i.name} src={`${i.name}`} width={32} height={32} alt={i.name} className='ml-2 logo-fade'/>
                            ))}
                        </span>
                    </article>
                ))}
                </div>
            </div>
        </section>
    )
}