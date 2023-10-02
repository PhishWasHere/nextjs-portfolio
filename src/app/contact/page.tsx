'use client'
import { use, useEffect, useState } from 'react'
import Link from 'next/link';
import { en, jp } from './language'
import axios from 'axios';
import getError from '@/utils/get_error';
import Loading from '@/components/common/loading'
import { useRouter, useSearchParams } from 'next/navigation';
import {nameVali, emailVali, msgVali} from '@/utils/form_validator';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.toString();
    const langParam = useSearchParams().get('lang') || 'en';
    
    let language = en;
    if (langParam == 'jp') {
        language = jp
    }
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [placeholder, setPlaceholder] = useState({
        name: 'Name',
        email: 'Email',
        message: 'Message',
    });
    const [isDisabled, setIsDisabled] = useState({
        name: true,
        email: true,
        message: true,
    });

    useEffect(() => { 
        setIsDisabled({
            name: !nameVali(formData.name),
            email: !emailVali(formData.email),
            message: !msgVali(formData.message),
        });

        return () => { // cleanup function, resets form data and placeholder when component unmounts
            setIsDisabled({
                name: true,
                email: true,
                message: true,
            });
        }
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };
    
    const isSubmitDisabled = isDisabled.email || isDisabled.name || isDisabled.message;

    const handleSend = (async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            setLoading(true); // set loading to true to render loading component
            const res = await axios.post('/api/send', { ...formData});
            
            if (!res.data.body.id) {
                setLoading(false);
                router.push(`?${search}&error=true`, {scroll: false}); // if error search param is true, display error component from app/page.tsx
                return;
            }

            setLoading(false);
            router.replace(`?lang=${langParam}&success=true`, undefined)// if success search param is true, render error component from app/page.tsx

            setFormData({
                name: '',
                email: '',
                message: '',
            });

        } catch (err) {
            const errMsg = getError(err);
            console.error(errMsg, err);
            setLoading(false);
            router.replace(`?lang=${langParam}&error=true`, undefined)
        }
    });

    return(
        <>
            <section className='sm:flex p-4 ml-auto fade-in-left'>
                <section className='flex flex-col sm:mr-3 sm:mb-0 mb-2 sm:w-3/6'>
                    <h2 className='sm:text-3xl text-2xl'>
                        {language.title}
                    </h2>
                    <p className='mt-2 text-lg'>
                        {language.description}
                    </p>

                    <section className='mt-auto'>
                        <p className='mt-auto flex items-center'>
                        {langParam === 'en' ? (
                            <>
                            {language.subtitle}
                            <Link href='https://www.linkedin.com/in/miran-yasunori-880207265/' className='border ml-1.5 transition duration-100 px-2 py-1 border-gray-200/60 hover:border-neon-blue hover:text-neon-blue'>
                                LinkedIn
                            </Link>
                            </>
                        ) : (
                            <>
                            <Link href='https://www.linkedin.com/in/miran-yasunori-880207265/' className='border ml-1.5 transition duration-100 px-2 py-1 border-gray-200/60 hover:border-neon-blue hover:text-neon-blue'>
                                LinkedIn
                            </Link>
                            {language.subtitle}
                            </>
                        )}
                        </p>
                    </section>
                </section>

                <form className='sm:w-4/6 border border-gray-200/60 p-3'>
                    <div className='grid text-lg'> 
                        <label htmlFor="name" className='flex'>{language.name} {isDisabled.name ? (<p className='text-error font-semibold text-2xl'>*</p>) : null}</label>
                        <input
                            className='bg-transparent border border-gray-200/60 text-lg text-white'
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={placeholder.name}
                            required
                        />
                    </div>
                    <div className='grid mt-2'>
                        <label htmlFor="email" className='flex'>{language.email}{isDisabled.email ? (<p className='text-error font-semibold text-2xl'>*</p>) : null}</label>
                        <input
                            className='bg-transparent border border-gray-200/60 text-lg text-white'
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={placeholder.email}
                            required
                        />
                    </div>
                    <div className='grid mt-2 '>
                        <label htmlFor="message" className='flex'>{language.message}{isDisabled.message ? (<p className='text-error font-semibold text-2xl'>*</p>) : null}</label>
                        <textarea
                            className='bg-transparent border border-gray-200/60 text-lg text-white'
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder={placeholder.message}
                            rows={5}
                            required
                        ></textarea>
                    </div> 
                    {loading ? (
                        <div className='flex mx-auto justify-center mt-3'>
                            <Loading langParam={langParam}/>
                        </div>
                    ) : ( 
                        <button type="submit" 
                            disabled={isSubmitDisabled} 
                            onClick={(e) => handleSend(e)} 
                            className={`flex mx-auto mt-3 px-2 py-1 transition duration-100 border border-gray-200/60 ${isSubmitDisabled? 'hover:border-error hover:text-red-400' : 'hover:border-neon-blue hover:text-neon-blue'} `}
                            >
                            {language.send}
                        </button>
                        )
                    }
                </form>
            </section>
        </>
    )
}