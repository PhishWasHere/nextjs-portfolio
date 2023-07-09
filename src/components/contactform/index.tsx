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
    <div className='lg:order-first lg:row-span-2 mx-auto w-10/12 bg-blue-700 p-2 rounded-md'>
      <h1>Contact Me</h1>
      <form onSubmit={handleSubmit} className=''>
        <div className='grid'> 
          <label htmlFor="name">Name:</label>
          <input
            className='bg-gray-600'
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={placeholder.name}
            required
          />
        </div>
        <div className='grid'>
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
        <div className='grid'>
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
        <div className='grid'>
          <label htmlFor="message">Message:</label>
          <textarea
            className='bg-gray-600'
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={placeholder.message}
            required
          ></textarea>
        </div> 
        <button type="submit" className='flex rounded-full mx-auto mt-2 bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5'>Submit</button>
      </form>
    </div>
  );
}