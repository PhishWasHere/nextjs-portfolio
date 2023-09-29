import Link from 'next/link';
import { en, jp } from './language';

export default function Sidebar({ searchParams, langParam }: {searchParams: {[key: string]: string | string[] | undefined}, langParam: string } ) {
    const locationParam = (searchParams.location || 'home') as string;
    
    let language = en;
    if (langParam == 'jp') {
      language = jp
    }
    
    return (
        <>
            <aside className='sm:fixed flex sm:flex-col'>
                {language.map((i) => (
                    <div key={i.key} className='mb-3'>
                    <Link
                    className={`mr-3 m-1 sm:text-3xl hover:text-neon-blue transition duration-100 ${langParam === 'en'?  'text-2xl' : 'text-sm'} ${
                    locationParam === i.key ? "text-neon-blue" : ""
                    }`}
                        href={
                            i.key === 'source' ? 'https://github.com/PhishWasHere/nextjs-portfolio' 
                        : 
                        `?${new URLSearchParams({ ...searchParams, location: i.key }).toString()}`
                        }
                    >
                        {i.value}
                    </Link>
                    </div>
                ))}
            </aside>
        </>
    )
}