'use client'
import { en, jp } from './language'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react'

import './style.css'

export default function Status({langParam, statusParam}: {langParam: string, statusParam: boolean | undefined}) {
    const [status, setStatus] = useState<{ error: boolean }>({ // Specify the type for status
        error: statusParam ?? true, // Use nullish coalescing to set to true if statusParam is undefined
    });
    console.log('asdasd', statusParam);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const locationParam = searchParams.get('location');

    let language = en;
    if (langParam == 'jp') {
        language = jp
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        router.replace(`?lang=${langParam}&location=${locationParam}`)
    }
return(
    <div className='float relative'>
        <div className={`${status.error ? 'bg-red-100 border-red-400 text-red-700' : 'bg-blue-100 border-blue-500 text-blue-700'} border rounded flex max-w-[18rem]`}>
            <p className='font-semibold my-auto mx-auto px-2'>{status.error? language.error : language.success}</p>
            <button className={`${status.error? 'bg-red-400' : 'bg-blue-500'}`} onClick={(e) => handleClick(e)}>
                <svg width="30px" height="30px" className='ml-auto' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <title>{language.close}</title>
                    <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    </div>
    )
}
