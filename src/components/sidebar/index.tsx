'use client'
import Link from 'next/link';
import { en, jp } from './language';

import { usePathname, useSearchParams } from 'next/navigation';
export default function Sidebar() {
    const path = usePathname();        
    const langParam = useSearchParams().get('lang') || 'en';

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
                        path === i.key ? "text-neon-blue" : ""
                        }`}
                            href={
                                i.key === 'source' ? 'https://github.com/PhishWasHere/nextjs-portfolio' 
                            : 
                            `${i.key}?${new URLSearchParams({lang: langParam }).toString()}`
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