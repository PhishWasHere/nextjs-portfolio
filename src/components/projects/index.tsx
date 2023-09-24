
import { en, jp } from './language'
import Link from 'next/link';
import Image from 'next/image';

import './style.css'

export default function Projects({langParam}: {langParam: string}) {
    let language = en;
    if (langParam == 'jp') {
        language = jp
    }
 
    return(
        <section id='proj-container' className='p-4 ml-auto'>
            <div id='proj-wrapper' className=''>
                <div id='proj-content'>

                {language.map((i) => (
                    <article key={i.name} className='sm:m-1 my-5 fade-in'>
                        <div className='grid md:flex md:flex-row-reverse'>
                            <h2 className='sm:text-5xl text-4xl text-end hover:text-neon-blue transition duration-100'>
                                <Link href={i.link} className=''> 
                                    {i.name}
                                </Link>
                            </h2>
                            <p className='mt-auto mr-2 text-end font-medium'>{i.type}</p>
                        </div>
                        <p className='text-lg flex flex-col justify-end text-end'>{i.description}</p>
                        <span className='flex flex-wrap justify-end logo'>
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