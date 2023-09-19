import Link from 'next/link';
import { en, jp } from './language';

export default function Sidebar({ searchParams, langParam }: {searchParams: {[key: string]: string | string[] | undefined}, langParam: string } ) {
    const locationParam = (searchParams.location || 'about') as string;
    
    let language = en;
    if (langParam == 'jp') {
      language = jp
    }
    
    return (
        <>
            <aside className='flex sm:flex-col'>
                {language.map((i) => (
                    <div key={i.key} className='mb-3'>
                    <Link
                        className={`mr-3 m-1 sm:text-3xl hover:text-neon-blue transition duration-100 ${langParam === 'en'?  'text-2xl' : 'text-sm'} ${
                        locationParam === i.key ? "text-neon-blue" : ""
                        }`}
                        href={`?${new URLSearchParams({ ...searchParams, location: i.key })}`}
                    >
                        {i.value}
                    </Link>
                    </div>
                ))}
            </aside>
        </>
    )
}