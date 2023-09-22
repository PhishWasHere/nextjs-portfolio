import { en, jp } from './language'
import Image from 'next/image'

export default function About({langParam}: {langParam: string}) {
    let language = en;
    if (langParam == 'jp') {
        language = jp
    }
    const skills = [
        {
            name: 'html',
            icon: 'html.svg',
        },
        {
            name: 'javascript',
            icon: 'javascript.svg',
        },
        {
            name: 'typescript',
            icon: 'typescript.svg',
        },
        {
            name: 'css',
            icon: 'css.svg',
        },
        {
            name: 'tailwind.css',
            icon: 'tailwindcss.svg',
        },
        {
            name: 'react',
            icon: 'react.svg',
        },
        {
            name: 'next.js',
            icon: 'nextjs.svg',
        },
        {
            name: 'node.js',
            icon: 'nodejs.svg',
        },
        {
            name: 'express.js',
            icon: 'express.svg',
        },
        {
            name: 'mongodb',
            icon: 'mongodb.svg',
        },
        {
            name: 'mysql',
            icon: 'mysql.svg',
        }
    ]
    return(
        <>
            <section className='flex flex-col p-4 md:w-10/12 sm:w-8/12 ml-auto'>
                <article className=''>
                    <h2 className='sm:text-3xl text-2xl'>{language.title}</h2>
                    <p className='text-lg'>{language.description}</p>
                </article>

                <section className="flex flex-col mt-4">
                    <h2 className="sm:text-3xl text-2xl mb-2">{language.skills}</h2>
                    <ul className="flex flex-wrap">
                        {skills.map((i) => (
                            <li key={i.name} className='flex mx-1'>
                                <Image src={`${i.icon}`} className='ml-1.5 relative' alt={i.name} width={30} height={30}/>
                                <p className='my-auto text-2xl'>{i.name}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
            
        </>
    )
}