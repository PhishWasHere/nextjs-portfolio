'use client'

import React, { useState } from 'react';

import Mailer from '../../utils/mailer';
import Validator from '../../utils/validator';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  }); //form data

  const [placeholder, setPlaceholder] = useState({
    name: 'Name',
    email: 'Email',
    phoneNumber: 'Contact Number',
    message: 'Message',
  }); //placeholder data will try to make this a useful function for validation if i have time

  const handleChange = (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);


    if (Validator(formData.name, formData.email, formData.phoneNumber, formData.message) === true) {
        Mailer(formData.name, formData.email, formData.phoneNumber, formData.message);
        setFormData({ //reset form if valid
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
        });
    } console.log('error in form'); //if err run a component (todo later)
    

  };

  return (
    <div className='lg:order-first lg:row-span-2 mx-auto w-10/12 p-2 bg-white '>
      <h1 className='text-3xl font-bold'></h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className='grid mt-2 text-lg'> 
          <label htmlFor="name">Name:</label>
          <input
            className='bg-gray-600 text-lg'
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
          <label htmlFor="email">Email:</label>
          <input
            className='bg-gray-600'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={placeholder.email}
            required
          />
        </div>
        <div className='grid mt-2'>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            className='bg-gray-600'
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder={placeholder.phoneNumber}
            required
          />
        </div>
        <div className='grid mt-2'>
          <label htmlFor="message">Message:</label>
          <textarea
            className='bg-gray-600'
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={placeholder.message}
            rows={5}
            required
          ></textarea>
        </div> 
        <button type="submit" className='flex mx-auto mt-2 px-4 py-1 mb-2 transition shadow-lg hover:text-teal-500 hover:bg-zinc-950/90 hover:border-teal-500 border backdrop-blur text-black bg-teal-500 '>Submit</button>
      </form>
    </div>
  );
}