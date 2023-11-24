'use client'
import Status from '@/components/common/status-modal';
import HelloWorld from '@/components/hello-world';
import Socials from '@/components/home/socials';
import Sidebar from '@/components/sidebar';
import { createContext, useContext, useState } from 'react';

import './style.css';

// Context for demo
export const Context = createContext<any>(null); 

// Custom hook to get the demo context
export const useDemo = () => {
  return useContext(Context);
};

// Provider for demo
export const DemoProvider = ({ children }: any) => {
  const [isDemo, setIsDemo] = useState< boolean >(false); // Default value is false

  return (
    <Context.Provider value={{ isDemo, setIsDemo }}>
      { isDemo ? <>{children}</> : 
      <main id='bg' className='h-screen text-gray flex shadow font-extralight italic'>
        {/* <HelloWorld/> */}
        <section id='noise' className='w-full custom-border flex flex-col relative '>
          <div className='border p-3 border-gray-200/60 h-full'>
            <Status/>
            <div className='sm:mx-10 sm:my-8 mx-4 my-2'>
              <section className='flex flex-col font-thin'>
                <Socials/>
              </section>
              <div className='sm:flex'>
                <Sidebar/>
                <section className='ml-auto transition sm:order-2'>
                  <div className=''>
                    {children}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      }
    </Context.Provider>
  );
};