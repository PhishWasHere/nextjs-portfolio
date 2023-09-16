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
                    <div key={i.key} className='mb-3'>
                    <Link
                        className={`sm:mr-0 mr-3 m-1 sm:text-3xl text-2xl ${
                        locationParam === i.key ? "text-cyan-300" : ""
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