import { en, jp } from './language'


export default function About({langParam}: {langParam: string}) {
    let language = en;
    if (langParam == 'jp') {
        language = jp
    }

    return(
        <>
            <article className='flex flex-col p-4 border border-gray-200/60 md:w-10/12 sm:w-8/12 ml-auto'>
                <h2 className='sm:text-3xl text-2xl'>{language.title}</h2>
                <p className='text-lg'>{language.description}</p>
            </article>
        </>
    )
}