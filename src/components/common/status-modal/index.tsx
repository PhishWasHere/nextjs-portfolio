'use client'
import { en, jp } from './language'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react'

import './style.css'

export default function Status() {
    const [status, setStatus] = useState({error: false, success: false});
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const langParam = searchParams.get('lang') || 'en';
    const error = searchParams.get('error');
    const success = searchParams.get('success');

    let language = en;
    if (langParam == 'jp') {
        language = jp
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        router.replace(`?lang=${langParam}`, undefined)
    }

    useEffect(() => {
        if (error === 'true') {
            setStatus({ error: true, success: false });
        } else if (success === 'true') {
            setStatus({ error: false, success: true });
        }
    }, [error, success]);

    let showStatus = false;
    if (error === 'true' || success === 'true') {
        showStatus = true;
    }
    
return(
    <>
        {showStatus ? (
            <section className='float relative'>
                <div className={`mx-auto  ${status.error ? 'bg-red-100 border-red-400 text-red-700' : 'bg-blue-100 border-blue-500 text-blue-700'} border rounded flex max-w-[18rem]`}>
                    <p className='font-semibold my-auto mx-auto px-2'>{status.error? language.error : language.success}</p>
                    <button className={`transition duration-100 ${status.error? 'bg-red-400 hover:bg-error' : 'bg-blue-500 hover:bg-blue-700'}`} onClick={(e) => handleClick(e)}>
                        <svg width="30px" height="30px" className='ml-auto' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <title>{language.close}</title>
                            <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </section>
        ) : null
        }
    </>
    )
}
