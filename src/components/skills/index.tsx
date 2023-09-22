import { en, jp } from './language'
import Image from 'next/image'

export default function Skills({ langParam }: {langParam: string}) {
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
            name: 'tailwind',
            icon: 'tailwindcss.svg',
        },
        {
            name: 'react',
            icon: 'react.svg',
        },
        {
            name: 'next',
            icon: 'nextjs.svg',
        },
        {
            name: 'node',
            icon: 'nodejs.svg',
        },
        {
            name: 'express',
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
        <section className="border flex flex-col p-5">
            <h2 className="sm:text-3xl text-2xl mb-2">{language.title}</h2>
            <ul className="flex max-w-xl flex-wrap">
                {skills.map((i) => (
                    <li key={i.name} className='flex mx-1'>
                        <Image src={`${i.icon}`} className='ml-1.5 relative' alt={i.name} width={30} height={30}/>
                        <p className='my-auto text-lg'>{i.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}