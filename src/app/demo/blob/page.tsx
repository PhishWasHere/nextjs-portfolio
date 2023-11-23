'use client'
import { useDemo } from '@/utils/context';
import { useEffect } from 'react';

export default function Page () {
  const { isDemo, setIsDemo } = useDemo();

  useEffect(() => {
    setIsDemo(true);
    return () => {
      setIsDemo(false);
    }
  }, []);

  return (
    <main className="">
      <div  className=''>
        <h1 className='text-4xl font-bold'>Blob</h1>
        <p className='text-lg'>This is a blob page</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <path id="blob" />  
      </svg>
    </main>
  )
}