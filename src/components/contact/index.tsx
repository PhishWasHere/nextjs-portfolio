'use client'
import { useState } from 'react'
import Link from 'next/link';
import { en, jp } from './language'
import axios from 'axios';
import getError from '@/utils/get_error';
import Loading from '@/components/common/loading'

export default function Contact({langParam}: {langParam: string}) {
    const regex = /^^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

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
    const [mailerRes, setMailerRes] = useState({
        error: false,
        success: false,
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));        
    };

    const handleSend = (async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await axios.post('/api/send', { ...formData});
            
            if (!res.data.body.id) {
                setLoading(false);
                setMailerRes({
                    error: true,
                    success: false,
                });
                return; //error component
            }

            setMailerRes({
                error: false,
                success: true,
            });

            setLoading(false);

            setFormData({
                name: '',
                email: '',
                message: '',
            });

        } catch (err) {
            const errMsg = getError(err);
            console.error(errMsg);
        }
    });

    return(
        <>
            <section className='sm:flex p-4 border border-gray-200/60 ml-auto'>
                <section className='flex flex-col sm:mr-3 sm:mb-0 mb-2 sm:w-3/6'>
                    <h2 className='sm:text-3xl text-2xl'>
                        {language.title}
                    </h2>
                    <p className='mt-2 text-lg'>
                        {language.description}
                    </p>

                    <section className='mt-auto'>
                        <p className='mt-auto flex items-center'>
                            {language.subtitle}
                            <Link href='https://www.linkedin.com/in/miran-yasunori-880207265/' className='border ml-1.5 transition duration-100 px-2 py-1 border-gray-200/60 hover:border-neon-blue hover:text-neon-blue'>
                                LinkedIn
                            </Link>
                        </p>
                    </section>
                </section>

                <form className='sm:w-4/6'>
                    <div className='grid text-lg'> 
                        <label htmlFor="name" className='flex'>{language.name} {!formData.name? (<p className='text-error font-semibold text-2xl'>*</p>) : null}</label>
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
                        <label htmlFor="email" className='flex'>{language.email}{!formData.email || regex.test(formData.email) ? (<p className='text-error font-semibold text-2xl'>*</p>) : null}</label>
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
                        <label htmlFor="message" className='flex'>{language.message}{!formData.message ? (<p className='text-error font-semibold text-2xl'>*</p>) : null}</label>
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
                            disabled={!regex.test(formData.email) || !formData.email || !formData.name || !formData.message} 
                            onClick={(e) => handleSend(e)} 
                            className={`flex mx-auto mt-3 px-2 py-1 transition duration-100 ${!loading? 'border border-gray-200/60 hover:border-neon-blue hover:text-neon-blue' : ''} ${(!formData.email || !formData.name || !formData.message) ? 'border-gray-200/40 text-gray-200/40' : ''}`}
                            >
                            {
                            mailerRes.error
                                ? ( <div className='border-error font-light text-error drop-shadow-outline'>{language.error}</div>)
                                : mailerRes.success
                                ? (<div className='text-neon-blue font-light drop-shadow-outline'>{language.success}</div>)
                                : (`${language.send}`)
                            }
                        </button>
                        )
                    }
                </form>
            </section>
        </>
    )
}