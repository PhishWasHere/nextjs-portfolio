'use client'

import './index.css'
import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from "next-intl"
import { nameVali, emailVali, msgVali } from '@/utils/formVali'
import { enter, leave } from '@/utils/pointerStyles'
import axios, {AxiosResponse} from 'axios'

import { Link } from '@/navigation'

let pointer: HTMLElement | null;
let pointerFollow: HTMLElement | null;

export default function Page() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isDisabled, setIsDisabled] = useState({
    name: true,
    email: true,
    message: true,
  });

  useEffect(() => {
    pointer = document.getElementById('pointer');
    pointerFollow = document.getElementById('pointer-follow');    
  }, []);

  useEffect(() => { 
    setIsDisabled({
        name: !nameVali(formData.name),
        email: !emailVali(formData.email),
        message: !msgVali(formData.message),
    });
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

  const handleSend = async () => {
    try {
      setStatus({loading:true, success:false, error:false});

      const res = await axios.post('/api/contact', formData);
      
      if (res.data.body.error === true) {
        return setStatus({loading:false, success:false, error:true});
      } 

      setStatus({loading:false, success:true, error:false});

      setFormData({
        name: '',
        email: '',
        message: '',
      });
      
    } catch (err) {
      setStatus({loading:false, success:false, error:true});
      console.error(err);
    }
  }

  const onEnter = () => {
    if (!pointer || !pointerFollow) return;
    enter({pointer, pointerFollow, size:'small'})
  }

  const onLeave = () => {
    if (!pointer || !pointerFollow) return;
    leave({pointer, pointerFollow})
  }

  return (
    <section className='max-h-[70svh]'>
      <h3>{t('title')}</h3>
      <p className='text-base not-italic'>{t('desc')}</p>

      <section className='my-1 flex'>
      {locale === 'jp' ?         
        <h4>
          <Link href={'https://www.linkedin.com/in/miran-yasunori/'} className='cursor-none hover:text-[#71B7FB] transition duration-300' onMouseEnter={() => onEnter()} onMouseLeave={() => onLeave()}>
            {t('link')} 
          </Link>
          {t('connect')}
        </h4> 
        :
        <h4>
          {t('connect')}
          <Link href={'https://www.linkedin.com/in/miran-yasunori/'} className='cursor-none hover:text-[#71B7FB] transition duration-300 animate-line' onMouseEnter={() => onEnter()} onMouseLeave={() => onLeave()}>
            {t('link')} 
          </Link>
        </h4>
      }
      </section>

      <form className='grid formInput text-base'>
        <label className='flex' htmlFor="name">{t('form.name')}{isDisabled.name ? (<p className='text-red-600 font-semibold text-2xl'>*</p>) : null}</label>
        <input
          className='cursor-none'
          type="text"
          name="name"
          id="name"
          placeholder={t('form.name')}
          value={formData.name}
          onChange={handleChange}
        />
        <label className='flex' htmlFor="email">{t('form.email')}{isDisabled.email ? (<p className='text-red-600 font-semibold text-2xl'>*</p>) : null}</label>
        <input
          className='cursor-none'
          type="email"
          name="email"
          id="email"
          placeholder={t('form.email')}
          value={formData.email}
          onChange={handleChange}
        />
        <label className='flex' htmlFor="message">{t('form.message')}{isDisabled.message ? (<p className='text-red-600 font-semibold text-2xl'>*</p>) : null}</label>
        <textarea
          className='cursor-none'
          name="message"
          id="message"
          placeholder={t('form.message')}
          value={formData.message}
          onChange={handleChange}
        />
        <div className='flex'>
          <button type="button" disabled={isSubmitDisabled} onClick={handleSend} onMouseEnter={() => onEnter()} onMouseLeave={() => onLeave()}
            className={`cursor-none rounded border py-0.5 px-1 text-base mx-auto mt-3 transition duration-300 ${isSubmitDisabled ? '' : 'hover:border-blue-500 hover:text-blue-500'}`}
          >
            {status.loading ? 
              <span id='loader'></span>
            : status.success ? <p>{t('success')}</p>
            : status.error ? <p>{t('error')}</p>
            :
              <p>{t('form.send')}</p>
            }
          </button>
            
        </div>
      </form>

    </section>
  )
}
