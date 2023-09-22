
import { en, jp } from './language'
import Link from 'next/link';
import Image from 'next/image';

import './style.css'

export default function Projects({langParam}: {langParam: string}) {
    let language = en;
    if (langParam == 'jp') {
        language = jp
    }
    const projects = [
        {
            name: 'ikHoneybee',
            description: 'Website for NDIS startup',
            type: 'Freelance (full-stack)',
            icon: [
                {
                    name: 'typescript.svg'
                },
                {
                    name: 'next.svg', 
                },
                {
                    name: 'bootstrap.svg', 
                }
            ],
            link: '',
        },
        {
            name: 'Portfolio',
            description: 'Portfolio website',
            type: 'Personal project (full-stack)',
            icon: [
                {
                    name: 'typescript.svg'
                },
                {
                    name: 'next.svg', 
                },
                {
                    name: 'tailwindcss.svg', 
                }
            ],
            link: 'https://github.com/PhishWasHere/nextjs-portfolio',
        },
        {
            name: 'The Hostile Bot',
            description: 'Discord bot partially powered by GPT-3 (currently in development).', 
            type: 'Personal project (full-stack)',
            icon:[
                {
                    name: 'typescript.svg'
                },
                {
                    name: 'nodejs.svg'
                },
                {
                    name: 'express.svg'
                },
                {
                    name: 'mongodb.svg'
                },
                {
                    name: 'next.svg'
                }
            ],
            link: 'https://github.com/PhishWasHere/The-Hostile-Bot',
        },
        {
            name: 'BetterReads',
            description: 'Book review app, that lets users search for books and leave reviews.',
            type: 'Group project (backend)',
            icon:[
                {
                    name: 'javascript.svg'
                },
                {
                    name: 'nodejs.svg'
                },
                {
                    name: 'express.svg'
                },
                {
                    name: 'mysql.svg'
                }
            ],
            link: 'https://github.com/TamaraDawg/BookReviewApp',
        },
    ]
    return(
        <section id='proj-container' className='p-4 ml-auto'>
            <div id='proj-wrapper' className=''>
                <div id='proj-content'>

                {projects.map((i) => (
                    <article key={i.name} className='sm:m-1 my-5'>
                        <div className='grid md:flex md:flex-row-reverse'>
                            <h2 className='sm:text-5xl text-4xl text-end hover:text-neon-blue transition duration-100'>
                                <Link href={i.link} className=''> 
                                    {i.name}
                                </Link>
                            </h2>
                            <p className='mt-auto mr-2 text-end font-medium'>{i.type}</p>
                        </div>
                        <p className='text-lg flex flex-col justify-end text-end'>{i.description}
                            <span className='flex flex-wrap justify-end'>
                                {i.icon.map((i) =>(
                                    <Image key={i.name} src={`${i.name}`} width={32} height={32} alt={i.name} className='ml-2'/>
                                ))}
                            </span>
                        </p>
                    </article>
                ))}
                </div>
            </div>
        </section>
    )
}