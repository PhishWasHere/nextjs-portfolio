import { en, jp } from './language'


export default function About({langParam}: {langParam: string}) {
    let language = en;
    if (langParam == 'jp') {
        language = jp
    }

    return(
        <>
            <section className='p-3 border flex flex-col'>
                <h2 className='sm:text-3xl text-2xl'>{language.title}</h2>
                <p className='text-lg'>{language.description}</p>
            </section>
        </>
    )
}