'use client'
// add aws api calls
  // add error and success callbacks
import './index.css'
import { useState, useEffect } from 'react'
import { PageWrapper } from '@/utils/pageWrapper'
import { useTranslations } from "next-intl"
import { nameVali, emailVali, msgVali } from '@/utils/formVali'

export default function Page() {
  const t = useTranslations('contact')

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
    // aws api call
    try {
      console.log('click');
      
    } catch (err) {
      
    }
  }

  return (
    <PageWrapper>
      <section className='max-h-[70vh]'>
        <h3>{t('title')}</h3>
        <p className='text-base not-italic'>{t('desc')}</p>

        <section className='my-1'>
          <h4>{t('connect')}</h4>
        </section>

        <form className='grid formInput'>
          <label className='flex' htmlFor="name">{t('form.name')}{isDisabled.name ? (<p className='text-red-600 font-semibold text-2xl'>*</p>) : null}</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder={t('form.name')}
            value={formData.name}
            onChange={handleChange}
          />
          <label className='flex' htmlFor="email">{t('form.email')}{isDisabled.email ? (<p className='text-red-600 font-semibold text-2xl'>*</p>) : null}</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={t('form.email')}
            value={formData.email}
            onChange={handleChange}
          />
          <label className='flex' htmlFor="message">{t('form.message')}{isDisabled.message ? (<p className='text-red-600 font-semibold text-2xl'>*</p>) : null}</label>
          <textarea
            name="message"
            id="message"
            placeholder={t('form.message')}
            value={formData.message}
            onChange={handleChange}
          />
          <div className='flex'>
            <button type="button" disabled={isSubmitDisabled} onClick={handleSend} 
              className={`rounded border py-0.5 px-1 text-base mx-auto mt-3 transition duration-300 ${isSubmitDisabled ? 'hover:border-red-600 hover:text-red-600' : 'hover:border-blue-500 hover:text-blue-500'}`}
            >
              {t('form.send')}
            </button>
          </div>
        </form>

      </section>
    </PageWrapper>
  )
}