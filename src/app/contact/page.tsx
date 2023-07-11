'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ContactForm from '@/components/contactform';

export default function Contact() {

    const socials = [
        { name: 'Twitter', href: 'https://twitter.com/', icon: '/twitter.svg', key: '1' },
        { name: 'GitHub', href: 'https://github.com/PhishWasHere', icon: '/github.svg', key: '2' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/miran-yasunori-880207265/', icon: '/linkedin.svg', key: '3' },
        // {name: 'Threads', href: 'https://threads.com/', icon: '/threads.svg', key: '4'} not a web app apparently
    ]

  return (
   <>
    <div className='mx-auto max-w-2xl lg:max-w-5xl mt-8 '>
        <div className='grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-y-12'>
            <article className='flex flex-col justify-between space-y-4 mx-auto'>
            <div className='max-w-md px-2.5 lg:max-w-none bg-white p-2 py-4'>
                <h2 className='text-3xl font-bold'>Contact Me</h2>
                <p className='text-lg'>If you have any inquiries or would like to get in touch, feel free to reach out to me using the contact form.</p>
                <p className='text-lg'>I look forward to hearing from you!</p>
            </div>

            <div className='max-w-md px-2.5 lg:max-w-none bg-white'>
                <h2 className='text-3xl font-bold mt-3'>
                    Check me out on social media!
                </h2>
                <div className='flex flex-row space-x-4 justify-around py-4'>
                    {socials.map((social) => (
                        <Link key={social.key} href={social.href} className='p-3 border-4 border-black transition rounded-xl hover:border-4 hover:border-teal-500'>
                            <Image
                                src={social.icon}
                                alt={social.name}
                                width={50}
                                height={50}
                                
                            />
                        </Link>
                    ))}
                </div>
            </div>
            </article>

            <ContactForm />
        </div>
    </div>
   </>
  );
}
