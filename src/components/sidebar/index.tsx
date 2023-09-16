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
            <aside className='flex sm:flex-col'>
                {language.map((i) => (
                    <Link key={i.key} className={`m-1 mt-3 sm:text-3xl text-2xl ${locationParam === i.key? "text-cyan-300" : ''}`} href={`?${new URLSearchParams({...searchParams, location: i.key})}`}>
                        <p className=''>{i.value}</p>
                    </Link>
                ))}
            </aside>
        </>
    )
}