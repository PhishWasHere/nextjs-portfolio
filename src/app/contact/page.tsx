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
            <article className='flex flex-col justify-between space-y-8 mx-auto '>
            <div className='max-w-md px-2.5 lg:max-w-none'>
                <h2 className='text-3xl font-bold'>Contact Me</h2>
                <p className='text-lg'>If you have any inquiries or would like to get in touch, feel free to reach out to me using the contact form.</p>
                <p className='text-lg'>I look forward to hearing from you!</p>
            </div>

            <div className='max-w-md px-2.5 lg:max-w-none'>
                <h2 className='text-3xl font-bold'>
                    Check me out on social media!
                </h2>
                <div className='flex flex-row space-x-4 justify-center'>
                    {socials.map((social) => (
                        <Link key={social.key} href={social.href}>
                            <Image
                                src={social.icon}
                                alt={social.name}
                                width={50}
                                height={50}
                                className='rounded-full'
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
