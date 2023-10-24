import { en, jp } from './language'
import Image from 'next/image'
import './style.css'

export default function Page({ searchParams }: {searchParams: {[key: string]: string | string[] | undefined}} ) {
    const langParam = (searchParams.lang || 'en') as string;  
    let language = en;
    if (langParam == 'jp') {
        language = jp
    }
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
            name: 'tailwind',
            icon: 'tailwindcss.svg',
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
    return(
        <>
            <section className='fade-in-left flex flex-col p-4 md:w-10/12 sm:w-8/12 ml-auto'>
                <article className=''>
                    <h2 className='sm:text-3xl text-2xl'>{language.title}</h2>
                    <p className='text-lg fade-delay'>{language.description}</p>
                </article>

                <section className="flex flex-col mt-4">
                    <h2 className="sm:text-3xl text-2xl mb-2">{language.skills}</h2>
                    <ul className="flex flex-wrap fade-delay">
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